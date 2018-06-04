import os
import uuid

from flask import Blueprint, jsonify, request, current_app, url_for
from werkzeug.utils import secure_filename

from backend import db
from backend.auth import token_required
from backend.models import Project, User
from backend.schemas import project_schema

projects_api = Blueprint('ProjectsApi', __name__, url_prefix='/projects')


####################
#
#   PROJECTS API
#
####################

def allowed_file(filename):
    ALLOWED_EXTS = {'jpg', 'png', 'jpeg', 'gif'}
    return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTS


@projects_api.route('/', methods=['GET'])
def get_all_projects():
    # retrieve the models
    projects = Project.query.all()
    # parse them through a schema which converts is to a dict
    result = project_schema.dump(projects, many=True)
    return jsonify({'projects': result.data})  # convert dict to json and return that to client


@projects_api.route('/<int:project_id>', methods=['GET'])
def get_one_project(project_id):
    project = Project.query.filter_by(id=project_id).first()

    if not project:
        return jsonify({'message': 'No project found!'}), 404

    return jsonify({"project": project_schema.dump(project).data})


@projects_api.route('/', methods=['POST'])
@token_required
def create_project(current_user: User):
    data = request.form.to_dict()  # form data is used instead request.json so files can be uploaded

    if not data:  # no data given
        return jsonify({'message': 'Missing data to create project'}), 400

    data['user_id'] = current_user.id

    if 'cover' in request.files and request.files['cover'] != '':
        # a file is uploaded
        file = request.files['cover']
        if allowed_file(file.filename):
            filename = secure_filename('{0}.{1}'.format(uuid.uuid4().hex, file.filename.split('.', 1)[1]))
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            data['cover'] = url_for('serve_file', filename=filename, _external=True)

    # load and validate
    result = project_schema.load(data)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    new_project = result.data

    db.session.add(new_project)
    db.session.commit()
    db.session.refresh(new_project)

    return jsonify({
        'message': "Project created!",
        'project': project_schema.dump(new_project).data
    })


@projects_api.route('/<int:project_id>', methods=['DELETE'])
@token_required
def delete_project(current_user: User, project_id):
    criteria = {'id': project_id}

    # check if user is an admin
    if not current_user.admin:
        # if not filter by the projects only from this user
        criteria['user_id'] = current_user.id

    project = Project.query.filter_by(**criteria).first()

    if project is None:
        return jsonify({'message': 'No project found!'}), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({'message': 'Project deleted!'})
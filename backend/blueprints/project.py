import os
import uuid
from datetime import datetime

from flask import Blueprint, jsonify, request, current_app, url_for
from werkzeug.utils import secure_filename

from backend import db
from backend.auth import token_required
from backend.models import Project
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
    projects = Project.query.all()
    return jsonify({'projects': project_schema.dump(projects, many=True).data})


@projects_api.route('/<int:project_id>', methods=['GET'])
def get_one_project(project_id):
    project = Project.query.filter_by(id=project_id).first()

    if not project:
        return jsonify({'message': 'No project found!'}), 404

    return jsonify({"project": project_schema.dump(project).data})


@projects_api.route('/', methods=['POST'])
@token_required
def create_project(current_user):
    required_fields = [
        'title',
        'short_description',
        'project_plan',
        'target_budget',
        'start_date',
        'end_date',
        # 'collaborators[]',
    ]

    data = request.form  # form data is used instead request.json so files can be uploaded

    if data is not None:
        for field in required_fields:
            if field not in data:
                return jsonify({'message': 'Missing \'{0}\' field data to create project'.format(field)}), 400
    else:
        return jsonify({'message': 'Missing data to create project'}), 400

    new_project = Project(
        title=data['title'],
        short_description=data['short_description'],
        project_plan=data['project_plan'],
        target_budget=data['target_budget'],
        start_date=datetime.strptime(data['start_date'], "%d-%m-%Y"),
        end_date=datetime.strptime(data['end_date'], "%d-%m-%Y"),
        latitude=data['latitude'],
        longitude=data['longitude'],
        owner=current_user
    )

    if 'cover' in request.files and request.files['cover'] != '':
        # a file is uploaded
        file = request.files['cover']
        if allowed_file(file.filename):
            filename = secure_filename('{0}.{1}'.format(uuid.uuid4().hex, file.filename.split('.', 1)[1]))
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            new_project.cover = url_for('serve_file', filename=filename, _external=True)

    db.session.add(new_project)
    db.session.commit()

    return jsonify({
        'message': "Project created!",
        'project': project_schema.dump(new_project).data
    })


@projects_api.route('/<int:project_id>', methods=['DELETE'])
@token_required
def delete_project(current_user, project_id):
    project = Project.query.filter_by(id=project_id, user_id=current_user.id).first()

    # proji = None
    # for i, p in enumerate(projects):
    #     # check if this project belongs to the user or if user is an admin
    #     if p['id'] == project_id and (p['owner'] == current_user['id'] or current_user['admin']):
    #         proji = i

    if project is None:
        return jsonify({'message': 'No project found!'}), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({'message': 'Project deleted!'})

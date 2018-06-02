import os
import uuid

from flask import Blueprint, jsonify, request, current_app, url_for
from werkzeug.utils import secure_filename

from backend.auth import token_required, admin_required
from backend.data import projects

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
    # projects = Project.query.filter_by(user_id=current_user.id).all()

    # output = []

    # for project in projects:
    #     project_data = {
    #         'id': project.id,
    #         'text': project.text,
    #         'complete': project.complete
    #     }
    #     output.append(project_data)

    return jsonify({'projects': projects})


@projects_api.route('/<int:project_id>', methods=['GET'])
def get_one_project(project_id):
    # project = Project.query.filter_by(id=project_id, user_id=current_user.id).first()

    project = None
    for p in projects:
        if p['id'] == project_id:
            project = p

    if not project:
        return jsonify({'message': 'No project found!'}), 404

    # project_data = {
    #     'id': project.id,
    #     'text': project.text,
    #     'complete': project.complete
    # }

    return jsonify(project)


@projects_api.route('/', methods=['POST'])
@token_required
def create_project(current_user):
    required_fields = [
        'title',
        'short_description',
        'project_plan',
        'date_begin',
        'date_end',
        'target',
        # 'collaborators[]',
    ]

    data = request.form  # form data is used instead request.json so files can be uploaded

    if data is not None:
        for field in required_fields:
            if field not in data:
                return jsonify({'message': 'Missing \'{0}\' field data to create project'.format(field)}), 400
    else:
        return jsonify({'message': 'Missing data to create project'}), 400

    # new_project = Project(text=data['text'], complete=False, user_id=current_user.id)
    new_id = len(projects) + 1
    collabs = [int(x) for x in data.getlist('collaborators[]')]
    cover = None

    if 'cover' in request.files and request.files['cover'] != '':
        # a file is uploaded
        file = request.files['cover']
        if allowed_file(file.filename):
            filename = secure_filename('{0}.{1}'.format(uuid.uuid4().hex, file.filename.split('.', 1)[1]))
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            cover = url_for('serve_file', filename=filename, _external=True)

    project = {
        'id': new_id,
        'title': data['title'],
        'description': data['short_description'],
        'owner': current_user['id'],
        'target': data['target'],
        'donators': 0,
        'achieved': 0,
        'plan': data['project_plan'],
        # 'collaborators': collabs,
        'cover': cover
    }

    projects.append(project)
    # db.session.add(new_project)
    # db.session.commit()

    return jsonify({'message': "Project created!", 'project': project})


# @projects_api.route('/project/<project_id>', methods=['PUT'])
# @token_required
# def complete_project(current_user, project_id):
#     project = Project.query.filter_by(id=project_id, user_id=current_user.id).first()
#
#     if not project:
#         return jsonify({'message': 'No project found!'})
#
#     project.complete = True
#     db.session.commit()
#
#     return jsonify({'message': 'Project has been completed!'})


@projects_api.route('/<int:project_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_project(current_user, project_id):
    # project = Project.query.filter_by(id=project_id, user_id=current_user.id).first()

    proji = None
    for i, p in enumerate(projects):
        # check if this project belongs to the user or if user is an admin
        if p['id'] == project_id and (p['owner'] == current_user['id'] or current_user['admin']):
            proji = i

    if proji is None:
        return jsonify({'message': 'No project found!'}), 404

    # db.session.delete(project)
    # db.session.commit()

    del projects[proji]

    return jsonify({'message': 'Project deleted!'})

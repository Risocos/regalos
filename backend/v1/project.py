from flask import Blueprint, jsonify, request

from backend.auth import token_required
from backend.data import projects

projects_api = Blueprint('ProjectsApi', __name__, url_prefix='/project')


####################
#
#   PROJECTS API
#
####################

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
    data = request.get_json()

    if data is None or 'title' not in data:
        return jsonify({'message': 'Missing data to create project'}), 400

    # new_project = Project(text=data['text'], complete=False, user_id=current_user.id)
    new_id = len(projects) + 1

    project = {
        'id': new_id,
        'title': data['title'],
        'owner': current_user['id']
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

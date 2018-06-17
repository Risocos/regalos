import os
import uuid

from flask import Blueprint, jsonify, request, current_app, abort
from mongoengine import DoesNotExist
from pymongo.errors import DuplicateKeyError
from werkzeug.utils import secure_filename

from backend.auth import token_required
from backend.models import Project, User, Donation
from backend.schemas import project_schema, donation_schema, user_schema

projects_api = Blueprint('ProjectsApi', __name__, url_prefix='/projects')


####################
#
#   PROJECTS API
#
####################

def find_project_or_404(project_id):
    project = None
    try:
        project = Project.objects.get(id=project_id)
    except DoesNotExist:
        pass

    if project is None:
        response = jsonify({'message': 'No project found!'})
        response.status_code = 404
        abort(response)

    return project


def find_user_or_404(user_id):
    """
    Finds a user or aborts with a 404 not found
    :param user_id:
    :return:
    """
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        response = jsonify({'message': 'No user found!'})
        response.status_code = 404
        abort(response)

    return user


def find_donators(project_id):
    donations = Donation.objects(project=project_id).all()
    if donations is None:
        response = jsonify({'message': 'No donators found!'})
        abort(response)

    return donations


def find_contributors(project_id):
    project = find_project_or_404(project_id)  # type: Project

    return project.collaborators


def allowed_file(filename):
    ALLOWED_EXTS = {'jpg', 'png', 'jpeg', 'gif'}
    return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTS


@projects_api.route('/', methods=['GET'])
def get_all_projects():
    # TODO: find out how to filter and sort with mongoengine
    q = Project.objects()
    if 'country_id' in request.args:
        q.filter(country__country_code=request.args['country_id'])

    if 'sort' in request.args:
        q.order_by(request.args['sort'])

    # parse them through a schema which converts is to a dict
    result = project_schema.dump(q.all(), many=True)
    return jsonify({'projects': result.data})  # convert dict to json and return that to client


@projects_api.route('/<string:project_id>', methods=['GET'])
def get_one_project(project_id):
    project = find_project_or_404(project_id)
    donations = find_donators(project_id)
    contributors = find_contributors(project_id)

    donations_as_objects = []
    for donation in donations:
        result = donation_schema.dump(donation).data
        donations_as_objects.append(result)

    contributors_as_objects = []
    for contributor in contributors:
        result = user_schema.dump(contributor).data
        contributors_as_objects.append(result)

    return jsonify({"project": project_schema.dump(project).data,
                    "donators": donations_as_objects,
                    "contributors": contributors_as_objects})


def save_file(file):
    filename = secure_filename('{0}.{1}'.format(uuid.uuid4().hex, file.filename.split('.', 1)[1]))
    file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], 'projects', filename))
    return filename


@projects_api.route('/', methods=['POST'])
@token_required
def create_project(current_user: User):
    # fix to retrieve collaborators
    collabs = request.form.getlist('collaborators[]')
    data = request.form.to_dict()  # form data is used instead request.json so files can be uploaded

    if not data:  # no data given
        return jsonify({'message': 'Missing data to create project'}), 400

    data['collaborator_ids'] = collabs

    # check if file is uploaded
    if 'cover' in request.files and request.files['cover'] != '':
        file = request.files['cover']
        if allowed_file(file.filename):
            data['filename'] = save_file(file)

    if current_user is not None:
        data['owner_id'] = str(current_user.id)

    # load and validate
    result = project_schema.load(data)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    new_project = Project(**result.data)
    new_project.save()

    return jsonify({
        'message': "Project created!",
        'project': project_schema.dump(new_project).data
    })


@projects_api.route('/edit/<string:project_id>', methods=['PATCH'])
@token_required
def update_project(current_user: User, project_id):
    q = Project.objects(pk=project_id)

    # check if user is an admin
    if not current_user.admin:
        # if not filter by the projects only from this user
        q = q.filter(owner=current_user.id)

    project = q.first()

    if project is None:
        return jsonify({'message': 'No project found!'}), 404

    data = request.form.to_dict()  # form data is used instead request.json so files can be uploaded
    if not data:  # no data given
        return jsonify({'message': 'Missing data to update project'}), 400

    if 'cover' in request.files and request.files['cover'] != '':
        # TODO: cleanup old file first
        # project.delete_cover()
        # a file is uploaded
        file = request.files['cover']
        if allowed_file(file.filename):
            data['filename'] = save_file(file)

    # load and validate
    result = project_schema.load(data, partial=True)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    for attr, value in result.data.items():
        setattr(project, attr, value)

    project.save()

    return jsonify({
        'message': "Project updated!",
        'project': project_schema.dump(project).data
    })


@projects_api.route('/<string:project_id>', methods=['DELETE'])
@token_required
def delete_project(current_user: User, project_id):
    project = Project.objects(pk=project_id)

    # check if user is an admin
    if not current_user.admin:
        # if not filter by the projects only from this user
        project = project.filter(owner=current_user.id)

    project = project.first()

    if project is None:
        return jsonify({'message': 'No project found!'}), 404

    project.delete()

    return jsonify({'message': 'Project deleted!'})


@projects_api.route('/report/<string:project_id>', methods=['PUT'])
@token_required
def report_project(current_user: User, project_id):
    project = find_project_or_404(project_id)  # type: Project
    try:
        project.update(add_to_set__reportings=current_user)
    except DuplicateKeyError:
        return jsonify({'message': 'You have reported this project already'})
    return jsonify({'message': 'Project reported!'})

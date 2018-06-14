import os
import uuid

from flask import Blueprint, jsonify, request, current_app, url_for, abort
from werkzeug.utils import secure_filename

from backend import db
from backend.auth import token_required
from backend.models import Project, User, Donation, Contributor
from backend.schemas import project_schema, donation_schema, contributor_schema

projects_api = Blueprint('ProjectsApi', __name__, url_prefix='/projects')


####################
#
#   PROJECTS API
#
####################

def find_project_or_404(project_id):
    project = Project.query.filter_by(id=project_id).first()

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
    donations = Donation.query.filter_by(project_id=project_id).all()
    if donations is None:
        response = jsonify({'message': 'No donators found!'})
        abort(response)

    return donations


def find_contributors(project_id):
    contributors = Contributor.query.filter_by(project_id=project_id).all()
    if contributors is None:
        response = jsonify({'message': 'No contributors found!'})
        abort(response)

    return contributors


def allowed_file(filename):
    ALLOWED_EXTS = {'jpg', 'png', 'jpeg', 'gif'}
    return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTS


@projects_api.route('/', methods=['GET'])
def get_all_projects():
    # retrieve the models
    q = Project.query
    if 'country_id' in request.args:
        q = q.filter(Project.country_id == request.args['country_id'])

    attr = Project.start_date
    if 'sort' in request.args:
        # where to filter on
        attr = getattr(Project, request.args['sort'], None) or attr

    q = q.order_by(attr.desc())
    # parse them through a schema which converts is to a dict
    result = project_schema.dump(q.all(), many=True)
    return jsonify({'projects': result.data})  # convert dict to json and return that to client


@projects_api.route('/<int:project_id>', methods=['GET'])
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
        result = contributor_schema.dump(contributor).data
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
    data = request.form.to_dict()  # form data is used instead request.json so files can be uploaded

    if not data:  # no data given
        return jsonify({'message': 'Missing data to create project'}), 400

    # check if file is uploaded
    if 'cover' in request.files and request.files['cover'] != '':
        file = request.files['cover']
        if allowed_file(file.filename):
            data['filename'] = save_file(file)

    data['user_id'] = current_user.id

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


@projects_api.route('/edit/<int:project_id>', methods=['PATCH'])
@token_required
def update_project(current_user: User, project_id: int):
    criteria = {'id': project_id}

    # check if user is an admin
    if not current_user.admin:
        # if not filter by the projects only from this user
        criteria['user_id'] = current_user.id

    project = Project.query.filter_by(**criteria).first()

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
    result = project_schema.load(data, instance=project, partial=True)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    new_project = result.data
    db.session.commit()

    return jsonify({
        'message': "Project updated!",
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


@projects_api.route('/report/<int:project_id>', methods=['PUT'])
@token_required
def report_project(current_user: User, project_id):
    project = find_project_or_404(project_id)

    project.flag_count += 1
    db.session.commit()

    return jsonify({'message': 'Project reported!'})

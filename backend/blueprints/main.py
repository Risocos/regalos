from flask import Blueprint, jsonify, request

from backend.models import User, Project
from backend.schemas import user_schema, project_schema

main_api = Blueprint('MainApi', __name__, url_prefix='/')


@main_api.route('/search')
def search():
    user_query = User.query
    project_query = Project.query

    if 'q' in request.args:
        q = request.args['q']
        user_query = user_query.filter(User.username.like('%{q}%'.format(q=q)))
        project_query = project_query.filter(Project.title.like('%{q}%'.format(q=q)))

    return jsonify({
        'projects': project_schema.dump(project_query.all(), many=True).data,
        'users': user_schema.dump(user_query.all(), many=True).data
    })

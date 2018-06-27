from flask import Blueprint, jsonify, request

from backend.models import User, Project
from backend.schemas import user_schema, project_schema

main_api = Blueprint('MainApi', __name__, url_prefix='/')


@main_api.route('/search')
def search():
    user_query = User.objects.all()
    project_query = Project.objects.all()

    if 'q' in request.args:
        q = request.args['q']
        user_query = User.objects(username__icontains=q).all()
        project_query = Project.objects(title__icontains=q).all()

    return jsonify({
        'projects': project_schema.dump(project_query.all(), many=True).data,
        'users': user_schema.dump(user_query, many=True).data
    })

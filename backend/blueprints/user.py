import uuid

from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

from backend import db
from backend.auth import token_required, admin_required
from backend.models import User
from backend.schemas import user_schema

users_api = Blueprint('UsersApi', __name__, url_prefix='/users')


##############
#
#   USER API
#
##############


@users_api.route('/', methods=['GET'])
@token_required
@admin_required
def get_all_users(current_user: User):
    users = User.query.all()
    return jsonify({
        'users': user_schema.dump(users, many=True).data
    })


@users_api.route('/<int:user_id>', methods=['GET'])
def get_user_profile(user_id: int):
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'message': 'No user found!'}), 404

    return jsonify({
        'user': user_schema.dump(user).data
    })


@users_api.route('/register', methods=['POST'])
def create_user():
    data = request.json

    if data is None:
        return jsonify({'message': 'Missing data to create project'}), 400

    result = user_schema.load(data)

    if len(result.errors) > 0:
        return jsonify(result.errors), 422

    new_user = result.data

    # save user to storage
    db.session.add(new_user)
    db.session.commit()
    db.session.refresh(new_user)

    return jsonify({
        'message': 'New user created!',
        'user': user_schema.dump(new_user).data
    })


@users_api.route('/<int:user_id>', methods=['PUT'])
@token_required
@admin_required
def promote_user(current_user: User, user_id):
    # find the user
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({'message': 'No user found!'}), 404

    user.admin = True
    db.session.commit()

    return jsonify({
        'message': 'The user has been promoted!'
    })


@users_api.route('/<int:user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user: User, user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({'message': 'No user found!'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        'message': 'The user has been deleted!'
    })

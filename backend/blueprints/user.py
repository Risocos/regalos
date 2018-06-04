from flask import Blueprint, jsonify, request, abort

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
    user = find_user_or_404(user_id)

    return jsonify({
        'user': user_schema.dump(user).data
    })


@users_api.route('/register', methods=['POST'])
def create_user():
    data = request.json

    if not data:
        return jsonify({'message': 'Missing data to create project'}), 400

    result = user_schema.load(data)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    new_user = result.data

    # save user to storage
    db.session.add(new_user)
    db.session.commit()
    db.session.refresh(new_user)

    return jsonify({
        'message': 'New user created!',
        'user': user_schema.dump(new_user).data
    })


@users_api.route('/<int:user_id>', methods=['PATCH'])
@token_required
def update_user(current_user: User, user_id):
    user = find_user_or_404(user_id)

    data = request.json

    if not data:
        return jsonify({'message': 'Missing data to create project'}), 400

    # pass in the user which is being edited and set partial=True so required fields are ignored
    result = user_schema.load(data, instance=user, partial=True)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    # the updated user
    new_user = result.data
    db.session.commit()

    return jsonify({
        'message': 'User updated successfully!',
        'user': user_schema.dump(new_user).data
    })


@users_api.route('/<int:user_id>', methods=['PUT'])
@token_required
@admin_required
def promote_user(current_user: User, user_id):
    # find the user
    user = find_user_or_404(user_id)

    user.admin = True
    db.session.commit()

    return jsonify({
        'message': 'The user has been promoted!'
    })


@users_api.route('/<int:user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user: User, user_id):
    user = find_user_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        'message': 'The user has been deleted!'
    })

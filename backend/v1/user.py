import uuid

from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

from backend.auth import token_required, admin_required
from backend.data import users, projects

users_api = Blueprint('UsersApi', __name__, url_prefix='/users')


##############
#
#   USER API
#
##############


def find_user_projects(uid: int) -> list:
    uprojects = []
    for project in projects:
        if project['owner'] == uid:
            uprojects.append(project)
    return uprojects


def find_user(uid: int) -> dict:
    user = None

    for u in users:
        if u['id'] == uid:
            user = u.copy()
            del user['password']
            user['projects'] = find_user_projects(uid)

    return user


@users_api.route('/', methods=['GET'])
@token_required
@admin_required
def get_all_users(current_user):
    output = []

    for u in users:
        u = u.copy()
        del u['password']
        output.append(u)

    # output = []
    #
    # for user in users:
    #     user_data = {
    #         'username': user.public_id,
    #         'name': user.name,
    #         'password': user.password,
    #         'admin': user.admin
    #     }
    #     output.append(user_data)

    # return jsonify({'users': output})
    return jsonify({'users': output})


@users_api.route('/profile', methods=['POST'])
def get_user_profile():
    # user = User.query.filter_by(public_id=public_id).first()
    user_id = int(request.json['id'])

    user = find_user(user_id)

    if not user:
        return jsonify({'message': 'No user found!'}), 404

    # user_data = {
    #     'public_id': user.public_id,
    #     'name': user.name,
    #     'password': user.password,
    #     'admin': user.admin
    # }

    # return jsonify({'user': user_data})
    return jsonify({'user': user})


@users_api.route('/<int:user_id>', methods=['GET'])
@token_required
@admin_required
def get_one_user(current_user, user_id):
    # user = User.query.filter_by(public_id=public_id).first()
    user = None

    user = find_user(user_id)

    if not user:
        return jsonify({'message': 'No user found!'}), 404

    # user_data = {
    #     'public_id': user.public_id,
    #     'name': user.name,
    #     'password': user.password,
    #     'admin': user.admin
    # }

    # return jsonify({'user': user_data})
    return jsonify({'user': user})


@users_api.route('/', methods=['POST'])
@token_required
@admin_required
def create_user(current_user):
    data = request.get_json()

    if data is None or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing data to create user'}), 400

    hashed_password = generate_password_hash(data['password'], method='sha256')

    # create new user
    new_id = len(users) + 1
    u = {
        'id': new_id,
        'admin': False,
        'public_id': str(uuid.uuid4()),
        'username': data['username'],
        'password': hashed_password,
    }
    # new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False)

    # save user to storage
    users.append(u)
    # db.session.add(new_user)
    # db.session.commit()

    u = u.copy()
    del u['password']
    return jsonify({'message': 'New user created!', 'user': u})


@users_api.route('/<int:user_id>', methods=['PUT'])
@token_required
@admin_required
def promote_user(current_user, user_id):
    # find the user
    useri = None
    for i, u in enumerate(users):
        print(u['id'], user_id, u['id'] == user_id)
        if u['id'] == user_id:
            useri = i

    # user = User.query.filter_by(public_id=public_id).first()

    if useri is None:
        return jsonify({'message': 'No user found!'}), 404

    users[useri]['admin'] = True
    # user.admin = True
    # db.session.commit()

    return jsonify({'message': 'The user has been promoted!'})


@users_api.route('/<int:user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user, user_id):
    # user = User.query.filter_by(public_id=public_id).first()

    useri = None
    for i, u in enumerate(users):
        if u['id'] == user_id:
            useri = i

    if useri is None:
        return jsonify({'message': 'No user found!'}), 404

    del users[useri]
    # db.session.delete(user)
    # db.session.commit()

    return jsonify({'message': 'The user has been deleted!'})

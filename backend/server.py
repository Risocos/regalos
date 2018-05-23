from flask import Flask, request, jsonify, make_response
# from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from jose import jwt
import datetime
from functools import wraps

app = Flask(__name__)

app.config['SECRET_KEY'] = '}Zz_n2=.B<yRp|KpK>,T:?KmS8a6?G0XES,kW0SIF=e}T)YEGh9k&&Xyni(~<5E'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mnt/c/Users/antho/Documents/api_example/project.db'

# db = SQLAlchemy(app)
#
#
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     public_id = db.Column(db.String(50), unique=True)
#     name = db.Column(db.String(50))
#     password = db.Column(db.String(80))
#     admin = db.Column(db.Boolean)
#
#
# class Project(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     text = db.Column(db.String(50))
#     complete = db.Column(db.Boolean)
#     user_id = db.Column(db.Integer)

# >>> from werkzeug.security import generate_password_hash
# >>> generate_password_hash('123456', method='sha256')
# 'sha256$xjKXjf0B$3efddd4395a0320e0ba6b6fddf14f793fe9dbe0170a7cdc657addda822dd65fd'
users = [
    {
        'id': 1,
        'public_id': '705897b6-5478-4ba2-822a-c5e5833d4124',
        'username': 'admin',
        'admin': True,
        # password: OneTwoThree123
        'password': 'sha256$N34hfMMN$a6bec8f319443512b9c0cf5a400c66933ab563a5d2ff5d34fd87dbc19f27d3f7',
    },
    {
        'id': 2,
        'public_id': 'b9229d9b-cb28-4e12-baea-ead89ef0a494',
        'username': 'melle',
        'admin': False,
        # password: 123456
        'password': 'sha256$xjKXjf0B$3efddd4395a0320e0ba6b6fddf14f793fe9dbe0170a7cdc657addda822dd65fd',
    },
]

projects = [
    {
        'id': 1,
        'title': 'Building House in Uganda',
        'owner': 1,
    },
    {
        'id': 2,
        'title': 'Collecting money',
        'owner': 1,
    },
    {
        'id': 3,
        'title': 'Recycle clothing',
        'owner': 2,
    },
]


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
            if 'Bearer' in token:
                token = token.replace('Bearer', '').strip()

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = None
            for u in users:
                if u['public_id'] == data['public_id']:
                    current_user = u
            # current_user = User.query.filter_by(public_id=data['public_id']).first()
            if current_user is None:
                raise jwt.JWTError()
        except jwt.JWTError:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    error_msg = {'message': 'Could not verify'}

    if not auth or not auth.username or not auth.password:
        return jsonify(error_msg, 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    # user = User.query.filter_by(name=auth.username).first()
    user = None
    for u in users:
        if u['username'] == auth.username:
            user = u.copy()

    if not user:
        return jsonify(error_msg), 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}

    if check_password_hash(user['password'], auth.password):
        token = jwt.encode(
            # the payload which will be encoded
            {'public_id': user['public_id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
            # key to use for encoding, which is needed when decoding. This is application specific
            app.config['SECRET_KEY']
        )

        del user['password']
        return jsonify({'token': token, 'user': user})

    return jsonify(error_msg), 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}


##############
#
#   USER API
#
##############

@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    if not current_user['admin']:
        return jsonify({'message': 'You do not have the privileges to do this!'}), 403

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


@app.route('/user/<int:user_id>', methods=['GET'])
@token_required
def get_one_user(current_user, user_id):
    if not current_user['admin']:
        return jsonify({'message': 'You do not have the privileges to do this!'}), 403

    # user = User.query.filter_by(public_id=public_id).first()
    user = None

    for u in users:
        if u['id'] == user_id:
            user = u

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


@app.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
    if not current_user['admin']:
        return jsonify({'message': 'You do not have the privileges to do this!'}), 403

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


@app.route('/user/<int:user_id>', methods=['PUT'])
@token_required
def promote_user(current_user, user_id):
    if not current_user['admin']:
        return jsonify({'message': 'Cannot perform that function!'})

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


@app.route('/user/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, user_id):
    if not current_user['admin']:
        return jsonify({'message': 'You do not have the privileges to do this!'}), 403

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


####################
#
#   PROJECTS API
#
####################


@app.route('/project', methods=['GET'])
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


@app.route('/project/<int:project_id>', methods=['GET'])
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


@app.route('/project', methods=['POST'])
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


# @app.route('/project/<project_id>', methods=['PUT'])
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


@app.route('/project/<int:project_id>', methods=['DELETE'])
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


if __name__ == '__main__':
    app.run(debug=True)

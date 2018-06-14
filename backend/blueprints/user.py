import uuid
import os

from flask import Blueprint, jsonify, request, abort, url_for, current_app
from flask_mail import Message

from werkzeug.utils import secure_filename

from backend import db, mail
from backend.auth import token_required, admin_required
from backend.models import User
from backend.schemas import UserSchema

users_api = Blueprint('UsersApi', __name__, url_prefix='/users')

user_schema = UserSchema()


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


def save_file(file):
    filename = secure_filename('{0}.{1}'.format(uuid.uuid4().hex, file.filename.split('.', 1)[1]))
    file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], 'users', filename))
    return filename


def allowed_file(filename):
    ALLOWED_EXTS = {'jpg', 'png', 'jpeg', 'gif'}
    return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTS


@users_api.route('/', methods=['GET'])
@token_required
@admin_required
def get_all_users(current_user: User):
    users = User.query.all()
    user_schema = UserSchema(exclude=['projects'])
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
        return jsonify({'message': 'Missing data to create user'}), 400

    # check if file is uploaded
    if 'profilepicture' in request.files and request.files['profilepicture'] != '':
        file = request.files['profilepicture']
        if allowed_file(file.filename):
            data['filename'] = save_file(file)

    result = user_schema.load(data)

    if len(result.errors) > 0:
        return jsonify({'errors': result.errors}), 422

    new_user = result.data

    # TODO: generate token to verify
    # verify_token = uuid.uuid4()

    # save user to storage
    db.session.add(new_user)
    db.session.commit()
    db.session.refresh(new_user)

    # send verify mail to user
    msg = Message('Verify your Account',
                  sender='Regalos Team',
                  recipients=[new_user.email])

    verify_url = url_for('.verify', _external=True)  # , {'vertkn': verify_token})
    msg.html = "Thank you for signing up. please verify here: <a href='{url}'>{url}</a>".format(
        url=verify_url)

    mail.send(msg)

    return jsonify({
        'message': 'New user created!',
        'user': user_schema.dump(new_user).data
    })


@users_api.route('/verify')
def verify():
    # TODO: verify the user
    # verify_token = request.args['vertkn']
    return jsonify({'message': 'endpoint in construction'})


@users_api.route('/<int:user_id>', methods=['PATCH'])
@token_required
def update_user(current_user: User, user_id):
    user = find_user_or_404(user_id)

    data = request.form.to_dict()

    if not data:
        return jsonify({'message': 'Missing data to change user'}), 400

    if 'profilepicture' in request.files and request.files['profilepicture'] != '':
        file = request.files['profilepicture']
        if allowed_file(file.filename):
            data['filename'] = save_file(file)

    user_schema.partial = True
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


@users_api.route('/report/<int:user_id>', methods=['PUT'])
@token_required
def report_user(current_user: User, user_id):
    # the user being reported
    user = find_user_or_404(user_id)  # type: User
    user.received_reports.append(user)
    db.session.commit()

    return jsonify({'message': 'User reported!'})


@users_api.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    data = request.json

    if 'tkn' in request.args:
        # TODO: check the token and set new password
        return jsonify({'tkn': request.args['tkn']})
    else:
        if not data or 'email' not in data:
            return jsonify({'message': 'Missing email field in data'}), 400

        user = User.query.filter_by(email=data['email']).first()

        if user is None:
            return jsonify({'message': 'User not found'}), 404

        tkn = uuid.uuid4().hex

        msg = Message('Forgot password',
                      recipients=[user.email])

        new_pass_url = url_for('.forgot_password', tkn=tkn, _external=True)

        msg.html = 'A password change for your account has been requested. ' \
                   'Click here to reset your password: <a href="{url}">{url}</a>'.format(url=new_pass_url)

        mail.send(msg)

        return jsonify({
            'message': 'Email sent to user with further instructions'
        })

from functools import wraps

from flask import current_app, request, jsonify
from jose import jwt

from backend.models import User


# TODO: check if decorators can be decorated to make code smaller and minify code

def get_bearer_token():
    if 'Authorization' in request.headers:
        token = request.headers['Authorization']
        if 'Bearer' in token:
            return token.replace('Bearer', '').strip()
    return None


def token_required(f):
    """
    Decorate routes with this function to check if the user specified a valid token
    to make this request
    :param f:
    :return:
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_bearer_token()

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = User.query.filter(User.public_id == data['public_id']).first()
            if current_user is None:
                raise jwt.JWTError()
        except jwt.JWTError as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def admin_required(f):
    """
    Decorate routes with this function to check if the user is an admin
    otherwise returns a 403 Forbidden.
    Use this after authenticating with @token_required
    :param f:
    :return:
    """

    @wraps(f)
    def decorated(current_user: User = None, *args, **kwargs):
        if current_user is None or not current_user.admin:
            return jsonify({'message': 'You do not have the privileges to do this!'}), 403
        return f(current_user, *args, **kwargs)

    return decorated


def with_user(f):
    """
    Decorate routes with this function to get the current_user information passed to the function
    :param f:
    :return:
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_bearer_token()

        current_user = None

        if token is not None:
            try:
                data = jwt.decode(token, current_app.config['SECRET_KEY'])
                current_user = User.query.filter(User.public_id == data['public_id']).first()
            except jwt.JWTError:
                pass

        return f(current_user, *args, **kwargs)

    return decorated

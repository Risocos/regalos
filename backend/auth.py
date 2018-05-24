from functools import wraps

from flask import current_app, request, jsonify
from jose import jwt

from backend.data import users


def token_required(f):
    """
    Decorate routes with this function to check if the user specified a valid token
    to make this request
    :param f:
    :return:
    """

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
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
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


def admin_required(f):
    """
    Decorate routes with this function to check if the user is an admin
    otherwise returns a 403 Forbidden.
    Use this after authenticating with @token_required
    :param f:
    :return:
    """

    @wraps(f)
    def decorated(current_user=None, *args, **kwargs):
        if current_user is None or not current_user['admin']:
            return jsonify({'message': 'You do not have the privileges to do this!'}), 403
        return f(current_user, *args, **kwargs)

    return decorated

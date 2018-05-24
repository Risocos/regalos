import datetime

from flask import Flask, request, jsonify, redirect
from jose import jwt
from werkzeug.security import check_password_hash

from backend.data import users
from backend.v1.project import projects_api
from backend.v1.user import users_api

from flask_cors import CORS

# from flask_sqlalchemy import SQLAlchemy

apis = [
    projects_api,
    users_api,
]

app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

for api in apis:
    app.register_blueprint(api)

app.config['ENV'] = 'development'
app.config['SECRET_KEY'] = '}Zz_n2=.B<yRp|KpK>,T:?KmS8a6?G0XES,kW0SIF=e}T)YEGh9k&&Xyni(~<5E'


# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////project.db'


@app.before_request
def clear_trailing():
    rp = request.path
    if rp != '/' and rp.endswith('/'):
        return redirect(rp[:-1], 307)  # 307 so the client knows to preserve the request method


@app.errorhandler(404)
def page_not_found(e):
    return jsonify({'message': 'Not found!'}), 404


# db = SQLAlchemy(app)

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


if __name__ == '__main__':
    app.run(debug=True)

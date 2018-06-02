import datetime

from flask import request, redirect, send_from_directory, jsonify
from flask_cors import CORS
from jose import jwt
from werkzeug.security import check_password_hash

from backend import app
from backend.models import User

from backend.schemas import user_schema

# enable CORS all over the app
CORS(app)


@app.before_request
def clear_trailing():
    rp = request.path
    if rp != '/' and rp.endswith('/'):
        return redirect(rp[:-1], 307)  # 307 so the client knows to preserve the request method


@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    error_msg = {'message': 'Could not verify'}

    if not auth or not auth.username or not auth.password:
        return jsonify(error_msg, 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=auth.username).first()

    if not user:
        return jsonify(error_msg), 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}

    if check_password_hash(user.password_hash, auth.password):
        token = jwt.encode(
            # the payload which will be encoded
            {'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
            # key to use for encoding, which is needed when decoding. This is application specific
            app.config['SECRET_KEY']
        )

        return jsonify({'token': token, 'user': user_schema.dump(user).data})

    return jsonify(error_msg), 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}


@app.route('/uploads/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True, host='localhost')

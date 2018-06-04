from flask import jsonify

from . import app


@app.errorhandler(400)
def bad_request(e):
    response = jsonify({
        'error': 'bad request',
        'message': str(e)
    })
    response.status_code = 400
    return response


@app.errorhandler(404)
def page_not_found(e):
    response = jsonify({
        'error': 'page not found',
        'message': str(e)
    })
    response.status_code = 404
    return response


@app.errorhandler(500)
def internal_server_error(e):
    response = jsonify({
        'error': 'internal server error',
        'message': str(e)
    })
    response.status_code = 500
    return response

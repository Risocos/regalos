from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

from backend.config import Config

app = Flask(__name__)
# load configuration for the Flask application
app.config.from_object(Config())
db = SQLAlchemy(app)
# !!Should be after SQLAlchemy(app)!!
ma = Marshmallow(app)

app.url_map.strict_slashes = False

# import here so there is circular dependency hell
from .blueprints.project import projects_api
from .blueprints.user import users_api

for api in [projects_api, users_api]:
    app.register_blueprint(api)

from . import errors

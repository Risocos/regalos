import uuid
from datetime import datetime

from marshmallow import fields, pre_load
from werkzeug.security import generate_password_hash

from backend import ma
from backend.models import User, Project


# These schemas are used to specify the output and input of models living in the API

class ProjectSchema(ma.ModelSchema):
    # title = fields.String(required=True)
    start_date = fields.Date()
    end_date = fields.Date()
    # 'as_string' needed, otherwise serialization crashes because of Decimal conversion to JSON
    latitude = fields.Decimal(8, as_string=True)
    longitude = fields.Decimal(8, as_string=True)
    user_id = fields.Integer(required=True)

    @pre_load
    def fix_dates(self, data):
        data['start_date'] = str(datetime.fromtimestamp(int(data['start_date'])))
        data['end_date'] = str(datetime.fromtimestamp(int(data['end_date'])))
        return data

    def validate_file(self):
        pass

    class Meta:
        model = Project
        ordered = True


class UserSchema(ma.ModelSchema):
    public_id = fields.String(required=True)
    email = fields.Email(required=True)
    password_hash = fields.String(required=True, load_only=True)
    username = fields.String(required=True)

    @pre_load
    def setup_user(self, data):
        data['public_id'] = str(uuid.uuid4())
        data['password_hash'] = generate_password_hash(data['password'], method='sha256')
        return data

    class Meta:
        model = User
        exclude = ['projects']
        ordered = True


user_schema = UserSchema()
project_schema = ProjectSchema()

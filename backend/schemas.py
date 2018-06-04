import uuid
from datetime import datetime

from marshmallow import fields, pre_load, ValidationError, validates
from werkzeug.security import generate_password_hash

from backend import ma
from backend.models import User, Project


# These schemas are used to specify the output and input of models living in the API

def not_empty(value):
    if not value:
        raise ValidationError('Should not be empty.')


class ProjectSchema(ma.ModelSchema):
    # title = fields.String(required=True)
    start_date = fields.Date()
    end_date = fields.Date()
    # 'as_string' needed, otherwise serialization crashes because of Decimal conversion to JSON
    latitude = fields.Decimal(8, as_string=True, validate=not_empty)
    longitude = fields.Decimal(8, as_string=True, validate=not_empty)
    user_id = fields.Integer(required=True)

    @pre_load
    def fix_dates(self, data):
        data['start_date'] = str(datetime.fromtimestamp(int(data['start_date'])))
        data['end_date'] = str(datetime.fromtimestamp(int(data['end_date'])))
        return data

    # TODO: validate incoming file with schema
    def validate_file(self):
        pass

    class Meta:
        model = Project
        ordered = True


class UserSchema(ma.ModelSchema):
    # FIELDS
    public_id = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    username = fields.String(required=True, validate=not_empty)
    biography = fields.String(validate=not_empty, allow_none=True)

    min_pass_length = 8

    @pre_load
    def setup_user(self, data):
        # TODO: find better way to check if its create or update of user
        if 'password_hash' in data:  # password_hash should not directly be set through API
            del data['password_hash']
        if 'password' in data:
            data['public_id'] = str(uuid.uuid4())
            data['password_hash'] = generate_password_hash(data['password'], method='sha256')
        return data

    @validates('password')
    def validate_pass(self, value):
        not_empty(value)
        if len(value) < self.min_pass_length:
            raise ValidationError('Password should not be less than {len} characters'.format(len=self.min_pass_length))

    class Meta:
        model = User
        load_only = ['password_hash']
        dump_only = ['admin', 'date_created', 'verified', 'public_id', 'projects']
        ordered = True


user_schema = UserSchema()
project_schema = ProjectSchema()

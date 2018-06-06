import uuid
from datetime import datetime

from flask import url_for
from marshmallow import fields, pre_load, ValidationError, validates
from werkzeug.security import generate_password_hash

from backend import ma
from backend.models import User, Project, Country, Donation


# These schemas are used to specify the output and input of models living in the API

def not_empty(value):
    if not value:
        raise ValidationError('Should not be empty.')


class ProjectSchema(ma.ModelSchema):
    # FIELDS
    title = fields.String(required=True, validate=not_empty)
    short_description = fields.String(required=True, validate=not_empty)
    project_plan = fields.String(required=True, validate=not_empty)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    # 'as_string' needed, otherwise serialization crashes because of Decimal conversion to JSON
    latitude = fields.Decimal(8, as_string=True, validate=not_empty)
    longitude = fields.Decimal(8, as_string=True, validate=not_empty)
    user_id = fields.Integer(required=True, load_only=True)
    country_id = fields.String(allow_none=False)
    cover = fields.Method(method_name='generate_url')

    def generate_url(self, project):
        if project.filename:
            return url_for('serve_project_file', filename=project.filename, _external=True)

    @pre_load
    def fix_dates(self, data):
        if 'start_date' in data:
            data['start_date'] = str(datetime.fromtimestamp(int(data['start_date'])))
        if 'end_date' in data:
            data['end_date'] = str(datetime.fromtimestamp(int(data['end_date'])))
        return data

    @validates('country_id')
    def check_country(self, country_id):
        if not country_id or Country.query.filter_by(id=country_id).first() is None:
            raise ValidationError('This country does not exist')

    # TODO: validate incoming file with schema
    def validate_file(self):
        pass

    class Meta:
        model = Project
        ordered = True
        exclude = ['country']
        dump_only = ['id', 'flag_count', 'verified', 'donators', 'current_budget', 'owner']


class UserSchema(ma.ModelSchema):
    # FIELDS
    public_id = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    username = fields.String(required=True, validate=not_empty)
    biography = fields.String(validate=not_empty, allow_none=True)
    projects = fields.Nested(ProjectSchema, many=True)
    avatar = fields.Method(method_name='generate_url')

    def generate_url(self, user):
        if user.filename:
            return url_for('serve_user_file', filename=user.filename, _external=True)

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
        dump_only = ['id', 'admin', 'date_created', 'verified', 'projects', 'flag_count']
        ordered = True


class DonationSchema(ma.ModelSchema):
    return_url = fields.Url(required=True)
    cancel_url = fields.Url(required=True)
    amount = fields.Decimal(places=2, required=True)
    project_id = fields.Integer(required=True)

    @validates('project_id')
    def project_exists(self, project_id):
        if Project.query.filter_by(id=project_id).first() is None:
            raise ValidationError('No project found for given project identifier')

    class Meta:
        model = Donation


user_schema = UserSchema()
project_schema = ProjectSchema()
donation_schema = DonationSchema()

import uuid
from datetime import datetime

from flask import url_for
from marshmallow import fields, pre_load, ValidationError, validates, post_load
from werkzeug.security import generate_password_hash

from backend import ma
from backend.models import User, Project, Country


# These schemas are used to specify the output and input of models living in the API

def not_empty(value):
    if not value:
        raise ValidationError('Should not be empty.')


class ProjectSchema(ma.Schema):
    # FIELDS
    id = fields.String(required=False, dump_only=True, attribute='mongo_id')
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
        ordered = True
        exclude = ['country']
        dump_only = ['id', 'flag_count', 'verified', 'donators', 'current_budget', 'owner']


class UserSchema(ma.Schema):
    # FIELDS
    id = fields.String(required=False, dump_only=True, attribute='mongo_id')
    public_id = fields.String(required=True)
    email = fields.Email(required=True)
    admin = fields.Boolean()
    password = fields.String(required=True, load_only=True)
    username = fields.String(required=True, validate=not_empty)
    biography = fields.String(validate=not_empty, allow_none=True)
    projects = fields.Nested(ProjectSchema, many=True)
    avatar = fields.Method(method_name='generate_url')

    def generate_url(self, user):
        if user.filename:
            return url_for('serve_user_file', filename=user.filename, _external=True)

    min_pass_length = 8

    @pre_load
    def pre_load(self, data):
        # TODO: find better way to check if its create or update of user
        if 'password_hash' in data:  # password_hash should not directly be set through API
            del data['password_hash']
        if 'password' in data:
            data['public_id'] = str(uuid.uuid4())

    @post_load
    def post_load(self, data):
        # TODO: find better way to check if its create or update of user
        if 'password' in data:
            data['password_hash'] = generate_password_hash(data['password'], method='sha256')
            del data['password']
        return data

    @validates('password')
    def validate_pass(self, value):
        not_empty(value)
        if len(value) < self.min_pass_length:
            raise ValidationError('Password should not be less than {len} characters'.format(len=self.min_pass_length))

    @validates('email')
    def unique_email(self, email):
        if not self.partial and User.objects(email=email).count() > 0:
            raise ValidationError('User with this email already exists')

    class Meta:
        load_only = ['password_hash']
        dump_only = ['id', 'admin', 'date_created', 'verified', 'projects', 'flag_count']
        ordered = True


def project_exists(project_id):
    if Project.query.filter_by(id=project_id).first() is None:
        raise ValidationError('No project found for given project identifier')


def validate_amount(amount):
    try:
        amount = float(amount)
        if not (amount > 0.01):
            raise ValidationError('You need to donate more than 0.01')
    except ValueError:
        raise ValidationError('Invalid amount given')


class PaymentSchema(ma.Schema):
    # return_url = fields.Url(required=True)
    # cancel_url = fields.Url(required=True)
    amount = fields.Decimal(places=2, required=True, validate=validate_amount, as_string=True)
    project_id = fields.Integer(required=True, validate=project_exists)
    donator_id = fields.Integer(required=False)  # can be anonymous

    @validates('donator_id')
    def user_exists(self, user_id):
        if user_id is not None:
            if User.query.filter_by(id=user_id).first() is None:
                raise ValidationError('This user does not exists')


class DonationSchema(ma.Schema):
    amount = fields.Decimal(places=2, required=True, validate=validate_amount, as_string=True)
    project_id = fields.Integer(required=True, validate=project_exists)
    paypal_payment_id = fields.String(required=True)
    status = fields.String()
    donator_id = fields.Integer()


user_schema = UserSchema()
project_schema = ProjectSchema()
payment_schema = PaymentSchema()
donation_schema = DonationSchema()

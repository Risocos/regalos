import uuid
from datetime import datetime

from flask import url_for
from marshmallow import fields, pre_load, ValidationError, validates, post_load
from mongoengine import DoesNotExist, ValidationError as MValidationError
from werkzeug.security import generate_password_hash

from backend import ma
from backend.models import User, Project, Country


# These schemas are used to specify the output and input of models living in the API

def not_empty(value):
    if not value:
        raise ValidationError('Should not be empty.')


class CountrySchema(ma.Schema):
    id = fields.String()
    name = fields.String()
    country_code = fields.String()


class UserSchema(ma.Schema):
    # FIELDS
    id = fields.String(required=False, dump_only=True)
    public_id = fields.String(required=True)
    email = fields.Email(required=True)
    admin = fields.Boolean()
    password = fields.String(required=True, load_only=True)
    username = fields.String(required=True, validate=not_empty)
    biography = fields.String(validate=not_empty, allow_none=True)
    projects = fields.Nested('ProjectSchema', many=True)
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


class ProjectSchema(ma.Schema):
    # FIELDS
    id = fields.String(required=False, dump_only=True)
    title = fields.String(required=True, validate=not_empty)
    short_description = fields.String(required=True, validate=not_empty)
    project_plan = fields.String(required=True, validate=not_empty)
    target_budget = fields.Integer(required=True)
    collaborators = fields.List(fields.Nested(UserSchema))
    collaborator_ids = fields.List(fields.String())
    filename = fields.String()
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    # 'as_string' needed, otherwise serialization crashes because of Decimal conversion to JSON
    latitude = fields.Decimal(8, as_string=True, validate=not_empty)
    longitude = fields.Decimal(8, as_string=True, validate=not_empty)

    # relations
    country = fields.Nested(CountrySchema)
    country_id = fields.String(allow_none=False)
    owner = fields.Nested(UserSchema, required=True)
    owner_id = fields.String()

    # generated
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

    @post_load
    def post_load(self, data):
        if 'country_id' in data:
            data['country'] = Country.objects(country_code=data['country_id']).first()
            del data['country_id']
        if 'owner_id' in data:
            data['owner'] = User.objects(pk=data['owner_id']).first()
            del data['owner_id']
        if 'collaborator_ids' in data:
            collabs = []
            for collab_id in data['collaborator_ids']:
                collabs.append(User.objects(pk=collab_id).first())
            data['collaborators'] = collabs
            del data['collaborator_ids']
        if 'latitude' in data:
            data['latitude'] = float(data['latitude'])
        if 'longitude' in data:
            data['longitude'] = float(data['longitude'])

    @validates('country_id')
    def check_country(self, country_code):
        if not country_code or Country.objects(country_code=country_code).first() is None:
            raise ValidationError('This country does not exist')

    # TODO: validate incoming file with schema
    def validate_file(self):
        pass

    class Meta:
        ordered = True
        dump_only = ['id', 'flag_count', 'verified', 'donators', 'current_budget', 'owner', 'country']


def project_exists(project_id):
    valid = True
    try:
        if Project.objects.get(id=project_id) is None:
            valid = False
    except (DoesNotExist, MValidationError):
        valid = False
    if not valid:
        raise ValidationError('No project found for given project identifier')


def validate_amount(amount):
    try:
        amount = float(amount)
        if not (amount > 0.01):
            raise ValidationError('You need to donate more than 0.01')
    except ValueError:
        raise ValidationError('Invalid amount given')


class DonationSchema(ma.Schema):
    amount = fields.Decimal(places=2, required=True, validate=validate_amount, as_string=True)
    project_id = fields.String(required=True, validate=project_exists)
    paypal_payment_id = fields.String(required=True)
    status = fields.String()
    donator = fields.String()  # not required because of anonymous donations

    @validates('donator')
    def user_exists(self, user_id):
        if user_id is not None:
            valid = True
            try:
                if User.objects(id=user_id).first() is None:
                    valid = False
            except (DoesNotExist, MValidationError):
                valid = False
            if not valid:
                raise ValidationError('This user does not exists')

    @post_load
    def post_load(self, data):
        if 'project_id' in data:
            data['project'] = data['project_id']


user_schema = UserSchema()
project_schema = ProjectSchema()
donation_schema = DonationSchema()

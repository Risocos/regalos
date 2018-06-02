from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema

from backend.models import User, Project


class ProjectSchema(ModelSchema):
    # 'as_string' needed, otherwise serialization crashes because of Decimal conversion to JSON
    latitude = fields.Decimal(8, as_string=True)
    longitude = fields.Decimal(8, as_string=True)

    class Meta:
        model = Project


class UserSchema(ModelSchema):
    class Meta:
        model = User
        exclude = ['password_hash', 'projects']


user_schema = UserSchema()
project_schema = ProjectSchema()

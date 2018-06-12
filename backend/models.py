import datetime
import enum

from backend import db


class RegalosDocument(db.Document):
    created_at = db.DateTimeField()
    modified_at = db.DateTimeField(default=datetime.datetime.now)

    meta = {'abstract': True}

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.datetime.now()
        self.modified_at = datetime.datetime.now()
        return super(RegalosDocument, self).save(*args, **kwargs)


class User(RegalosDocument):
    public_id = db.StringField()
    email = db.StringField(required=True, unique=True)
    username = db.StringField(required=True)
    password = None
    password_hash = db.StringField(required=True)
    admin = db.BooleanField(default=False)
    biography = db.StringField()
    filename = db.StringField()
    verified = db.BooleanField(default=False)

    twitter = db.URLField()
    linkedin = db.URLField()
    google = db.URLField()

    # foreign keys and relations
    received_reports = db.ListField(db.ReferenceField('User'))


class Country(RegalosDocument):
    country_code = db.StringField(required=True, unique=True, min_length=2, max_length=10)
    name = db.StringField(required=True)


class Donation(RegalosDocument):
    # status of the paypal payment
    class Status(enum.Enum):
        PENDING = 1  # when payment is created
        SUCCESS = 2  # when payment is successful redirected to success
        CANCELLED = 3  # when payment is redirected to cancel url

        def __str__(self):
            return '{0}'.format(self.name)

    amount = db.FloatField(required=True, min_value=0)

    # relations
    # TODO: how to backreference with mongodb ??
    # try to backreference with project id
    project = db.ReferenceField('Project', required=True)
    donator = db.ReferenceField(User, required=False)  # is not required because of anonymous donations
    paypal_payment_id = db.StringField(required=True)
    status = db.StringField(default=Status.PENDING)


class Project(RegalosDocument):
    title = db.StringField(required=True)
    short_description = db.StringField(required=True)
    project_plan = db.StringField(required=True)
    # category = db.Column(db.String(50))
    target_budget = db.IntField(required=True)
    current_budget = db.IntField(default=0)

    start_date = db.DateTimeField(required=True)
    end_date = db.DateTimeField(required=True)
    filename = db.StringField()
    verified = db.BooleanField(default=False)
    # Google Maps
    latitude = db.FloatField()
    longitude = db.FloatField()

    # relations & foreign keys
    collaborators = db.ListField(db.ReferenceField(User))
    owner = db.ReferenceField(User, required=True)
    country = db.ReferenceField(Country)
    reportings = db.ListField(db.ReferenceField(User))

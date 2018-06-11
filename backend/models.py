import enum

from backend import db


class User(db.Document):
    public_id = db.StringField(required=True)
    email = db.StringField(required=True)
    username = db.StringField(required=True)
    password = None
    password_hash = db.StringField(required=True)
    admin = db.BoolField(default=False)
    biography = db.StringField(required=False)
    filename = db.StringField(required=False)
    verified = db.BoolField(default=False, required=False)

    twitter = db.StringField(required=False)
    linkedin = db.StringField(required=False)
    google = db.StringField(required=False)

    date_created = db.CreatedField()
    date_modified = db.ModifiedField()

    # def save(self, safe):
    #     print('user before save')
    #     return super(User, self).save(safe)

    # foreign keys and relations
    # given_reports = db.relation('User', secondary=user_reports,
    #                             # when giving reports, the reporter_id is this users id
    #                             primaryjoin=(user_reports.c.reporter_id == id),
    #                             secondaryjoin=(user_reports.c.user_id == id),
    #                             )
    #
    # received_reports = db.relation('User', secondary=user_reports,
    #                                # when receiving reports the user_id is this users id
    #                                primaryjoin=(user_reports.c.user_id == id),
    #                                secondaryjoin=(user_reports.c.reporter_id == id),
    #                                )

    # project_reportings = db.relationship('Project', secondary=project_reports, backref='reportings')


class Country(db.Document):
    country_code = db.StringField(min_length=2, max_length=10)
    name = db.StringField(required=True)


class Donation(db.Document):
    # status of the paypal payment
    class Status(enum.Enum):
        PENDING = 1  # when payment is created
        SUCCESS = 2  # when payment is successful redirected to success
        CANCELLED = 3  # when payment is redirected to cancel url

        def __str__(self):
            return '{0}'.format(self.name)

    amount = db.FloatField(required=True)

    # relations
    # TODO: how to backreference with mongodb ??
    # project = db.DocumentField(Project)
    donator = db.DocumentField(User, required=False)
    paypal_payment_id = db.StringField()
    status = db.EnumField(db.StringField(), *(e.name for e in Status), default=Status.PENDING)

    date_created = db.CreatedField()
    date_modified = db.ModifiedField()


class Project(db.Document):
    title = db.StringField(required=True)
    short_description = db.StringField(required=True)
    project_plan = db.StringField(required=True)
    # category = db.Column(db.String(50))
    target_budget = db.IntField(required=True)
    current_budget = db.IntField(default=0)
    donations = db.DocumentField(Donation, required=False)
    start_date = db.DateTimeField(required=True)
    end_date = db.DateTimeField(required=True)
    filename = db.StringField(required=False)
    verified = db.BoolField(default=False)
    # Google Maps
    latitude = db.FloatField(required=False)
    longitude = db.FloatField(required=False)

    # relations & foreign keys
    owner = db.DocumentField(User)
    country = db.DocumentField(Country, required=False)

    date_created = db.CreatedField()
    date_modified = db.ModifiedField()


# class Contributor(db.Model):
#     user_id = db.Column(db.Integer, primary_key=True)
#     project_id = db.Column(db.Integer, primary_key=True)
#

import enum

from backend import db

# Many-to-Many tables

user_reports = db.Table('user_report', db.metadata,
                        db.Column('reporter_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                        db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                        # db.Column('reason', db.String(100)),
                        db.Column('report_date', db.TIMESTAMP, server_default=db.func.now()),
                        )

project_reports = db.Table('project_report', db.metadata,
                           db.Column('reporter_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                           db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key=True),
                           # db.Column('reason', db.String(100), nullable=False),
                           db.Column('report_date', db.TIMESTAMP, server_default=db.func.now()),
                           )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = None
    password_hash = db.Column(db.String(80), nullable=False)
    admin = db.Column(db.Boolean, default=False)
    biography = db.Column(db.String(100))
    filename = db.Column(db.String)
    verified = db.Column(db.Boolean, default=False, nullable=False)
    flag_count = db.Column(db.SmallInteger, nullable=False, default=0)

    twitter = db.Column(db.String, nullable=True)
    linkedin = db.Column(db.String, nullable=True)
    google = db.Column(db.String, nullable=True)

    date_created = db.Column(db.TIMESTAMP, server_default=db.func.now(), nullable=False)

    # foreign keys and relations
    given_reports = db.relation('User', secondary=user_reports,
                                # when giving reports, the reporter_id is this users id
                                primaryjoin=(user_reports.c.reporter_id == id),
                                secondaryjoin=(user_reports.c.user_id == id),
                                )

    received_reports = db.relation('User', secondary=user_reports,
                                   # when receiving reports the user_id is this users id
                                   primaryjoin=(user_reports.c.user_id == id),
                                   secondaryjoin=(user_reports.c.reporter_id == id),
                                   )

    project_reportings = db.relationship('Project', secondary=project_reports, backref='reportings')

    def __repr__(self):
        return '<User {email} {username}>'.format(email=self.email, username=self.username)


class Country(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String, nullable=False)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    short_description = db.Column(db.String(500), nullable=False)
    project_plan = db.Column(db.Text, nullable=False)
    # category = db.Column(db.String(50))
    target_budget = db.Column(db.Integer, nullable=False)
    current_budget = db.Column(db.Integer, default=0, nullable=False)
    donators = db.Column(db.Integer, default=0, nullable=False)
    start_date = db.Column(db.TIMESTAMP, nullable=False)
    end_date = db.Column(db.TIMESTAMP, nullable=False)
    filename = db.Column(db.String)
    verified = db.Column(db.Boolean, nullable=False, default=False)
    # Google Maps
    latitude = db.Column(db.Float(10, 6))
    longitude = db.Column(db.Float(10, 6))

    flag_count = db.Column(db.SmallInteger, nullable=False, default=0)

    # relations & foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User',
                            backref=db.backref('projects', lazy=True))  # backref makes it possible to do user.projects
    country_id = db.Column(db.String(10), db.ForeignKey('country.id'), nullable=True)
    country = db.relationship('Country', backref=db.backref('projects', lazy=True))

    date_created = db.Column(db.TIMESTAMP, server_default=db.func.now(), nullable=False)

    # TODO: delete file when model is deleted
    # @listen(Project, 'delete')
    # def before_delete(self):

    def __repr__(self):
        return '<Project {title} - {owner}>'.format(title=self.title, owner=self.owner)


class Donation(db.Model):
    # status of the paypal payment
    class Status(enum.Enum):
        PENDING = 1  # when payment is created
        SUCCESS = 2  # when payment is successful redirected to success
        CANCELLED = 3  # when payment is redirected to cancel url

        def __str__(self):
            return '{0}'.format(self.name)

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)

    # foreign keys
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship('Project')
    donator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # can be null for anonymous payments
    donator = db.relationship('User')
    paypal_payment_id = db.Column(db.String, nullable=False)
    status = db.Column(db.Enum(Status), default=Status.PENDING)

    # TODO: how do we track material for a project?
    # amount_material =
    date_created = db.Column(db.TIMESTAMP, server_default=db.func.now())


class Contributor(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, primary_key=True)


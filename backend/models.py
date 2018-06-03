from backend import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(80), nullable=False)
    admin = db.Column(db.Boolean, default=False)
    biography = db.Column(db.String(100))
    avatar = db.Column(db.String)  # will be a filepath
    verified = db.Column(db.Boolean, default=False, nullable=False)
    flag_count = db.Column(db.SmallInteger, nullable=False, default=0)
    date_created = db.Column(db.TIMESTAMP, server_default=db.func.now(), nullable=False)

    def __repr__(self):
        return '<User {email} {username}>'.format(email=self.email, username=self.username)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    short_description = db.Column(db.String(500))
    project_plan = db.Column(db.Text)
    # category = db.Column(db.String(50))
    # progress can be calculated from the target and current budget
    # progress = db.Column(db.SmallInteger, nullable=False)  # in percentage
    target_budget = db.Column(db.Integer, nullable=False)
    current_budget = db.Column(db.Integer, default=0, nullable=False)
    donators = db.Column(db.Integer)
    start_date = db.Column(db.TIMESTAMP, nullable=False)
    end_date = db.Column(db.TIMESTAMP, nullable=False)
    cover = db.Column(db.String)
    verified = db.Column(db.Boolean, nullable=False, default=False)
    # Google Maps
    latitude = db.Column(db.Float(10, 6))
    longitude = db.Column(db.Float(10, 6))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User', backref=db.backref('projects', lazy=True))

    date_created = db.Column(db.TIMESTAMP, server_default=db.func.now(), nullable=False)

    # TODO: delete file when model is deleted
    # @listen(Project, 'delete')
    # def before_delete(self):

    def __repr__(self):
        return '<Project {title} - {owner}>'.format(title=self.title, owner=self.owner)

# class Contributor(db.Model):
#     user_id = db.Column(db.Integer, primary_key=True)
#     project_id = db.Column(db.Integer, primary_key=True)
#
#
# class ReportLog(db.Model):
#     report_id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer)
#     report_date = db.Column(db.TIMESTAMP)
#     report_reason = db.Column(db.String(100))
#
# class Donator(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     date_created = db.Column(db.TIMESTAMP, server_default=db.func.now())
#
#
# class Donation(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     donator_id = db.Column(db.Integer, db.ForeignKey())
#     payment = db.Column(db.Integer)
#     # TODO: how do we track material for a project?
#     # amount_material =
#     date_created = db.Column(db.TIMESTAMP, server_default=db.func.now())

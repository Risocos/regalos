#
# Dummy Data used for now
#

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     public_id = db.Column(db.String(50), unique=True)
#     name = db.Column(db.String(50))
#     password = db.Column(db.String(80))
#     admin = db.Column(db.Boolean)

users = [
    {
        'id': 1,
        'public_id': '705897b6-5478-4ba2-822a-c5e5833d4124',
        'username': 'admin',
        'admin': True,
        # password: OneTwoThree123
        'password': 'sha256$N34hfMMN$a6bec8f319443512b9c0cf5a400c66933ab563a5d2ff5d34fd87dbc19f27d3f7',
    },
    {
        'id': 2,
        'public_id': 'b9229d9b-cb28-4e12-baea-ead89ef0a494',
        'username': 'melle',
        'admin': False,
        # password: 123456
        'password': 'sha256$xjKXjf0B$3efddd4395a0320e0ba6b6fddf14f793fe9dbe0170a7cdc657addda822dd65fd',
    },
]

# class Project(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     text = db.Column(db.String(50))
#     complete = db.Column(db.Boolean)
#     user_id = db.Column(db.Integer)

projects = [
    {
        'id': 1,
        'title': 'Building House in Uganda',
        'owner': 1,
    },
    {
        'id': 2,
        'title': 'Collecting money',
        'owner': 1,
    },
    {
        'id': 3,
        'title': 'Recycle clothing',
        'owner': 2,
    },
]

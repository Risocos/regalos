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
        'firstname': 'Sander',
        'lastname': 'van Doorn',
        'email': 'sander@vandoorn.nl',
        'admin': True,
        # password: OneTwoThree123
        'password': 'sha256$N34hfMMN$a6bec8f319443512b9c0cf5a400c66933ab563a5d2ff5d34fd87dbc19f27d3f7',
        'bio': 'No bio',
        'flagged': False,
    },
    {
        'id': 2,
        'public_id': 'b9229d9b-cb28-4e12-baea-ead89ef0a494',
        'firstname': 'Melle',
        'lastname': 'Dijkstra',
        'email': 'melle@dijkstra.nl',
        'username': 'melle',
        'admin': False,
        # password: 123456
        'password': 'sha256$xjKXjf0B$3efddd4395a0320e0ba6b6fddf14f793fe9dbe0170a7cdc657addda822dd65fd',
        'bio': 'Ich bin melle, das kleine Krokodil\n' +
               'Komm aus Ägypten, das liegt direkt am Nil\n' +
               'Zuerst lag ich in einem Ei\n' +
               'Dann schni-,schna-,schnappte ich mich frei\n\n' +
               'Mi Ma Melle\n' +
               'Mima Mima Mell\n' +
               'Mi Ma Melle\n' +
               'Mima Mima Mell',
        'flagged': True,
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
        'description': 'We are going to build houses for people in Uganda',
        'owner': 1,
        'startdate': '',
        'enddate': '',
        'target': 10000,
        'donators': 18,
        'achieved': 4576,
        'plan': 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
    },
    {
        'id': 2,
        'title': 'Collecting money',
        'description': 'We want to collect money for others',
        'owner': 1,
        'startdate': '',
        'enddate': '',
        'target': 15000,
        'donators': 77,
        'achieved': 8594,
        'plan': 'We plan to collect money from door to door and use this app as payment method',
    },
    {
        'id': 3,
        'title': 'Recycle clothing',
        'description': 'Donate your clothing, so we can recycle it!',
        'owner': 2,
        'startdate': '',
        'enddate': '',
        'target': 0,
        'donators': 76,
        'achieved': 0,
        'plan': 'We want people to donate their clothing, so that we can send this to poor countries',
    },
    {
        'id': 4,
        'title': 'Project Regalos',
        'description': 'Donate for our project to create this project app',
        'owner': 1,
        'startdate': '',
        'enddate': '',
        'target': 5000,
        'donators': 3,
        'achieved': 30,
        'plan': 'Too bad we cannot afford our own hourly pay and Sander is addicted to coffee. Sad face.',
        'collaborators': 'Melle'
    },
]

from datetime import datetime

from backend import db
from backend.models import User, Project

users = [
    {
        'public_id': '705897b6-5478-4ba2-822a-c5e5833d4124',
        'email': 'sander@vandoorn.nl',
        'username': 'admin',
        'admin': True,
        # password: OneTwoThree123
        'password_hash': 'sha256$N34hfMMN$a6bec8f319443512b9c0cf5a400c66933ab563a5d2ff5d34fd87dbc19f27d3f7',
        'biography': None,
        'flag_count': 0,
    },
    {
        'public_id': 'b9229d9b-cb28-4e12-baea-ead89ef0a494',
        'email': 'melle@dijkstra.nl',
        'username': 'melle',
        'admin': False,
        # password: 123456
        'password_hash': 'sha256$xjKXjf0B$3efddd4395a0320e0ba6b6fddf14f793fe9dbe0170a7cdc657addda822dd65fd',
        'biography': 'Ich bin melle, das kleine Krokodil\n' +
                     'Komm aus Ägypten, das liegt direkt am Nil\n' +
                     'Zuerst lag ich in einem Ei\n' +
                     'Dann schni-,schna-,schnappte ich mich frei\n\n' +
                     'Mi Ma Melle\n' +
                     'Mima Mima Mell\n' +
                     'Mi Ma Melle\n' +
                     'Mima Mima Mell',
        'flag_count': 20,  # bad boy ;)
    },
]

projects = [
    {
        'title': 'Building Houses',
        'short_description': 'We are going to build houses for people in Uganda',
        'project_plan': 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
        'owner': users[0]['public_id'],
        'target_budget': 10000,
        'current_budget': 4576,
        'donators': 18,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.99190516,
        'longitude': -58.86762519,
        # 'collaborators': [
        #     1, 2
        # ],
        'cover': None,
        # 'country': 'Uganda',
    },
    {
        'title': 'Collecting money',
        'short_description': 'We want to collect money for others',
        'owner': users[0]['public_id'],
        'target_budget': 15000,
        'donators': 77,
        'current_budget': 8594,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.61806054,
        'longitude': 62.77961401,
        'project_plan': 'We plan to collect money from door to door and use this app as payment method',
        # 'collaborators': [
        #     1, 2
        # ],
        'cover': 'http://via.placeholder.com/350x150',
        # 'country': 'Other',
    },
    {
        'title': 'Recycle clothing',
        'short_description': 'Donate your clothing, so we can recycle it!',
        'owner': users[1]['public_id'],
        'target_budget': 0,
        'donators': 76,
        'current_budget': 0,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 49.02797017,
        'longitude': -32.40686866,
        'project_plan': 'We want people to donate their clothing, so that we can send this to poor countries',
        # 'collaborators': [
        #     1, 2
        # ],
        'cover': 'http://via.placeholder.com/350x150',
        # 'country': 'Other',
    },
    {
        'title': 'Project Regalos',
        'short_description': 'Donate for our project to create this project app',
        'owner': users[1]['public_id'],
        'target_budget': 5000,
        'donators': 3,
        'current_budget': 30,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 31.80457949,
        'longitude': -10.32726764,
        'project_plan': 'Too bad we cannot afford our own hourly pay and Sander is addicted to coffee. Sad face.',
        # 'collaborators': [
        #     1, 2
        # ],
        'cover': 'http://via.placeholder.com/350x150',
        # 'country': 'Netherlands',
    },
]


# creates all the database and tables
def create_databases():
    print('creating tables...')
    db.create_all()


# populates everything
def populate():
    # populate users
    print('populating users')
    for user in users:
        db.session.add(User(**user))

    # populate projects
    print('populating projects')
    for project in projects:
        owner = User.query.filter_by(public_id=project['owner']).first()
        del project['owner']
        p = Project(**project)
        p.owner = owner
        db.session.add(p)

    db.session.commit()


if __name__ == '__main__':
    create_databases()
    populate()

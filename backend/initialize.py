from datetime import datetime

from backend import db
from backend.models import User, Project, Country

countries = [
    {'name': 'Afghanistan', 'id': 'af'},
    {'name': 'Aland Islands', 'id': 'ax'},
    {'name': 'Albania', 'id': 'al'},
    {'name': 'Algeria', 'id': 'dz'},
    {'name': 'American Samoa', 'id': 'as'},
    {'name': 'Andorra', 'id': 'ad'},
    {'name': 'Angola', 'id': 'ao'},
    {'name': 'Anguilla', 'id': 'ai'},
    {'name': 'Antigua', 'id': 'ag'},
    {'name': 'Argentina', 'id': 'ar'},
    {'name': 'Armenia', 'id': 'am'},
    {'name': 'Aruba', 'id': 'aw'},
    {'name': 'Australia', 'id': 'au'},
    {'name': 'Austria', 'id': 'at'},
    {'name': 'Azerbaijan', 'id': 'az'},
    {'name': 'Bahamas', 'id': 'bs'},
    {'name': 'Bahrain', 'id': 'bh'},
    {'name': 'Bangladesh', 'id': 'bd'},
    {'name': 'Barbados', 'id': 'bb'},
    {'name': 'Belarus', 'id': 'by'},
    {'name': 'Belgium', 'id': 'be'},
    {'name': 'Belize', 'id': 'bz'},
    {'name': 'Benin', 'id': 'bj'},
    {'name': 'Bermuda', 'id': 'bm'},
    {'name': 'Bhutan', 'id': 'bt'},
    {'name': 'Bolivia', 'id': 'bo'},
    {'name': 'Bosnia', 'id': 'ba'},
    {'name': 'Botswana', 'id': 'bw'},
    {'name': 'Bouvet Island', 'id': 'bv'},
    {'name': 'Brazil', 'id': 'br'},
    {'name': 'British Virgin Islands', 'id': 'vg'},
    {'name': 'Brunei', 'id': 'bn'},
    {'name': 'Bulgaria', 'id': 'bg'},
    {'name': 'Burkina Faso', 'id': 'bf'},
    {'name': 'Burma', 'id': 'mm'},
    {'name': 'Burundi', 'id': 'bi'},
    {'name': 'Caicos Islands', 'id': 'tc'},
    {'name': 'Cambodia', 'id': 'kh'},
    {'name': 'Cameroon', 'id': 'cm'},
    {'name': 'Canada', 'id': 'ca'},
    {'name': 'Cape Verde', 'id': 'cv'},
    {'name': 'Cayman Islands', 'id': 'ky'},
    {'name': 'Central African Republic', 'id': 'cf'},
    {'name': 'Chad', 'id': 'td'},
    {'name': 'Chile', 'id': 'cl'},
    {'name': 'China', 'id': 'cn'},
    {'name': 'Christmas Island', 'id': 'cx'},
    {'name': 'Cocos Islands', 'id': 'cc'},
    {'name': 'Colombia', 'id': 'co'},
    {'name': 'Comoros', 'id': 'km'},
    {'name': 'Congo', 'id': 'cd'},
    {'name': 'Congo Brazzaville', 'id': 'cg'},
    {'name': 'Cook Islands', 'id': 'ck'},
    {'name': 'Costa Rica', 'id': 'cr'},
    {'name': 'Cote Divoire', 'id': 'ci'},
    {'name': 'Croatia', 'id': 'hr'},
    {'name': 'Cuba', 'id': 'cu'},
    {'name': 'Cyprus', 'id': 'cy'},
    {'name': 'Czech Republic', 'id': 'cz'},
    {'name': 'Denmark', 'id': 'dk'},
    {'name': 'Djibouti', 'id': 'dj'},
    {'name': 'Dominica', 'id': 'dm'},
    {'name': 'Dominican Republic', 'id': 'do'},
    {'name': 'Ecuador', 'id': 'ec'},
    {'name': 'Egypt', 'id': 'eg'},
    {'name': 'El Salvador', 'id': 'sv'},
    {'name': 'Equatorial Guinea', 'id': 'gq'},
    {'name': 'Eritrea', 'id': 'er'},
    {'name': 'Estonia', 'id': 'ee'},
    {'name': 'Ethiopia', 'id': 'et'},
    {'name': 'Europeanunion', 'id': 'eu'},
    {'name': 'Falkland Islands', 'id': 'fk'},
    {'name': 'Faroe Islands', 'id': 'fo'},
    {'name': 'Fiji', 'id': 'fj'},
    {'name': 'Finland', 'id': 'fi'},
    {'name': 'France', 'id': 'fr'},
    {'name': 'French Guiana', 'id': 'gf'},
    {'name': 'French Polynesia', 'id': 'pf'},
    {'name': 'French Territories', 'id': 'tf'},
    {'name': 'Gabon', 'id': 'ga'},
    {'name': 'Gambia', 'id': 'gm'},
    {'name': 'Georgia', 'id': 'ge'},
    {'name': 'Germany', 'id': 'de'},
    {'name': 'Ghana', 'id': 'gh'},
    {'name': 'Gibraltar', 'id': 'gi'},
    {'name': 'Greece', 'id': 'gr'},
    {'name': 'Greenland', 'id': 'gl'},
    {'name': 'Grenada', 'id': 'gd'},
    {'name': 'Guadeloupe', 'id': 'gp'},
    {'name': 'Guam', 'id': 'gu'},
    {'name': 'Guatemala', 'id': 'gt'},
    {'name': 'Guinea', 'id': 'gn'},
    {'name': 'Guinea-Bissau', 'id': 'gw'},
    {'name': 'Guyana', 'id': 'gy'},
    {'name': 'Haiti', 'id': 'ht'},
    {'name': 'Heard Island', 'id': 'hm'},
    {'name': 'Honduras', 'id': 'hn'},
    {'name': 'Hong Kong', 'id': 'hk'},
    {'name': 'Hungary', 'id': 'hu'},
    {'name': 'Iceland', 'id': 'is'},
    {'name': 'India', 'id': 'in'},
    {'name': 'Indian Ocean Territory', 'id': 'io'},
    {'name': 'Indonesia', 'id': 'id'},
    {'name': 'Iran', 'id': 'ir'},
    {'name': 'Iraq', 'id': 'iq'},
    {'name': 'Ireland', 'id': 'ie'},
    {'name': 'Israel', 'id': 'il'},
    {'name': 'Italy', 'id': 'it'},
    {'name': 'Jamaica', 'id': 'jm'},
    {'name': 'Jan Mayen', 'id': 'sj'},
    {'name': 'Japan', 'id': 'jp'},
    {'name': 'Jordan', 'id': 'jo'},
    {'name': 'Kazakhstan', 'id': 'kz'},
    {'name': 'Kenya', 'id': 'ke'},
    {'name': 'Kiribati', 'id': 'ki'},
    {'name': 'Kuwait', 'id': 'kw'},
    {'name': 'Kyrgyzstan', 'id': 'kg'},
    {'name': 'Laos', 'id': 'la'},
    {'name': 'Latvia', 'id': 'lv'},
    {'name': 'Lebanon', 'id': 'lb'},
    {'name': 'Lesotho', 'id': 'ls'},
    {'name': 'Liberia', 'id': 'lr'},
    {'name': 'Libya', 'id': 'ly'},
    {'name': 'Liechtenstein', 'id': 'li'},
    {'name': 'Lithuania', 'id': 'lt'},
    {'name': 'Luxembourg', 'id': 'lu'},
    {'name': 'Macau', 'id': 'mo'},
    {'name': 'Macedonia', 'id': 'mk'},
    {'name': 'Madagascar', 'id': 'mg'},
    {'name': 'Malawi', 'id': 'mw'},
    {'name': 'Malaysia', 'id': 'my'},
    {'name': 'Maldives', 'id': 'mv'},
    {'name': 'Mali', 'id': 'ml'},
    {'name': 'Malta', 'id': 'mt'},
    {'name': 'Marshall Islands', 'id': 'mh'},
    {'name': 'Martinique', 'id': 'mq'},
    {'name': 'Mauritania', 'id': 'mr'},
    {'name': 'Mauritius', 'id': 'mu'},
    {'name': 'Mayotte', 'id': 'yt'},
    {'name': 'Mexico', 'id': 'mx'},
    {'name': 'Micronesia', 'id': 'fm'},
    {'name': 'Moldova', 'id': 'md'},
    {'name': 'Monaco', 'id': 'mc'},
    {'name': 'Mongolia', 'id': 'mn'},
    {'name': 'Montenegro', 'id': 'me'},
    {'name': 'Montserrat', 'id': 'ms'},
    {'name': 'Morocco', 'id': 'ma'},
    {'name': 'Mozambique', 'id': 'mz'},
    {'name': 'Namibia', 'id': 'na'},
    {'name': 'Nauru', 'id': 'nr'},
    {'name': 'Nepal', 'id': 'np'},
    {'name': 'Netherlands', 'id': 'nl'},
    {'name': 'Netherlandsantilles', 'id': 'an'},
    {'name': 'New Caledonia', 'id': 'nc'},
    {'name': 'New Guinea', 'id': 'pg'},
    {'name': 'New Zealand', 'id': 'nz'},
    {'name': 'Nicaragua', 'id': 'ni'},
    {'name': 'Niger', 'id': 'ne'},
    {'name': 'Nigeria', 'id': 'ng'},
    {'name': 'Niue', 'id': 'nu'},
    {'name': 'Norfolk Island', 'id': 'nf'},
    {'name': 'North Korea', 'id': 'kp'},
    {'name': 'Northern Mariana Islands', 'id': 'mp'},
    {'name': 'Norway', 'id': 'no'},
    {'name': 'Oman', 'id': 'om'},
    {'name': 'Pakistan', 'id': 'pk'},
    {'name': 'Palau', 'id': 'pw'},
    {'name': 'Palestine', 'id': 'ps'},
    {'name': 'Panama', 'id': 'pa'},
    {'name': 'Paraguay', 'id': 'py'},
    {'name': 'Peru', 'id': 'pe'},
    {'name': 'Philippines', 'id': 'ph'},
    {'name': 'Pitcairn Islands', 'id': 'pn'},
    {'name': 'Poland', 'id': 'pl'},
    {'name': 'Portugal', 'id': 'pt'},
    {'name': 'Puerto Rico', 'id': 'pr'},
    {'name': 'Qatar', 'id': 'qa'},
    {'name': 'Reunion', 'id': 're'},
    {'name': 'Romania', 'id': 'ro'},
    {'name': 'Russia', 'id': 'ru'},
    {'name': 'Rwanda', 'id': 'rw'},
    {'name': 'Saint Helena', 'id': 'sh'},
    {'name': 'Saint Kitts and Nevis', 'id': 'kn'},
    {'name': 'Saint Lucia', 'id': 'lc'},
    {'name': 'Saint Pierre', 'id': 'pm'},
    {'name': 'Saint Vincent', 'id': 'vc'},
    {'name': 'Samoa', 'id': 'ws'},
    {'name': 'San Marino', 'id': 'sm'},
    {'name': 'Sandwich Islands', 'id': 'gs'},
    {'name': 'Sao Tome', 'id': 'st'},
    {'name': 'Saudi Arabia', 'id': 'sa'},
    {'name': 'Scotland', 'id': 'gb sct'},
    {'name': 'Senegal', 'id': 'sn'},
    {'name': 'Serbia', 'id': 'cs'},
    {'name': 'Serbia', 'id': 'rs'},
    {'name': 'Seychelles', 'id': 'sc'},
    {'name': 'Sierra Leone', 'id': 'sl'},
    {'name': 'Singapore', 'id': 'sg'},
    {'name': 'Slovakia', 'id': 'sk'},
    {'name': 'Slovenia', 'id': 'si'},
    {'name': 'Solomon Islands', 'id': 'sb'},
    {'name': 'Somalia', 'id': 'so'},
    {'name': 'South Africa', 'id': 'za'},
    {'name': 'South Korea', 'id': 'kr'},
    {'name': 'Spain', 'id': 'es'},
    {'name': 'Sri Lanka', 'id': 'lk'},
    {'name': 'Sudan', 'id': 'sd'},
    {'name': 'Suriname', 'id': 'sr'},
    {'name': 'Swaziland', 'id': 'sz'},
    {'name': 'Sweden', 'id': 'se'},
    {'name': 'Switzerland', 'id': 'ch'},
    {'name': 'Syria', 'id': 'sy'},
    {'name': 'Taiwan', 'id': 'tw'},
    {'name': 'Tajikistan', 'id': 'tj'},
    {'name': 'Tanzania', 'id': 'tz'},
    {'name': 'Thailand', 'id': 'th'},
    {'name': 'Timorleste', 'id': 'tl'},
    {'name': 'Togo', 'id': 'tg'},
    {'name': 'Tokelau', 'id': 'tk'},
    {'name': 'Tonga', 'id': 'to'},
    {'name': 'Trinidad', 'id': 'tt'},
    {'name': 'Tunisia', 'id': 'tn'},
    {'name': 'Turkey', 'id': 'tr'},
    {'name': 'Turkmenistan', 'id': 'tm'},
    {'name': 'Tuvalu', 'id': 'tv'},
    {'name': 'United Arab Emirates (U.A.E.)', 'id': 'ae'},
    {'name': 'Uganda', 'id': 'ug'},
    {'name': 'Ukraine', 'id': 'ua'},
    {'name': 'United Kingdom', 'id': 'gb'},
    {'name': 'United States', 'id': 'us'},
    {'name': 'Uruguay', 'id': 'uy'},
    {'name': 'US Minor Islands', 'id': 'um'},
    {'name': 'US Virgin Islands', 'id': 'vi'},
    {'name': 'Uzbekistan', 'id': 'uz'},
    {'name': 'Vanuatu', 'id': 'vu'},
    {'name': 'Vatican City', 'id': 'va'},
    {'name': 'Venezuela', 'id': 've'},
    {'name': 'Vietnam', 'id': 'vn'},
    {'name': 'Wales', 'id': 'gb wls'},
    {'name': 'Wallis and Futuna', 'id': 'wf'},
    {'name': 'Western Sahara', 'id': 'eh'},
    {'name': 'Yemen', 'id': 'ye'},
    {'name': 'Zambia', 'id': 'zm'},
    {'name': 'Zimbabwe', 'id': 'zw'},
]

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
        'twitter': 'https://twitter.com/DoornSander',
        'linkedin': 'https://www.linkedin.com/in/sander-van-doorn-64b48b112/',
        'google': None
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
        'twitter': None,
        'linkedin': None,
        'google': None
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
        'filename': 'dummy1.jpg',
        'country': 'ug',
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
        'filename': 'dummy2.jpg',
        'country': None,
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
        'filename': 'dummy3.jpg',
        'country': 'us',
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
        'filename': None,
        'country': 'nl',
    },
]

user_reportings = [
    {
        'reporter_id': users[0]['public_id'],
        'user_id': users[1]['public_id'],
        # 'reason': 'This user is not trustworthy, he swears in chats...'
    }
]

project_reportings = [
    {
        'reporter_id': users[0]['public_id'],
        'project_title': projects[2]['title'],
        # 'reason': 'This project is not real, it\'s fake and they are trying to rob money'
    },
    {
        'reporter_id': users[1]['public_id'],
        'project_title': projects[2]['title'],
        # 'reason': 'I don\'t think this project is trustworthy'
    }
]


# creates all the database and tables
def create_databases():
    print('creating tables...')
    db.create_all()


# populates everything
def populate():
    print('populating countries')
    for country in countries:
        db.session.add(Country(**country))

    # populate users
    print('populating users')
    for user in users:
        db.session.add(User(**user))

    # populate projects
    print('populating projects')
    for project in projects:
        owner = User.query.filter_by(public_id=project['owner']).first()
        country = Country.query.filter_by(id=project['country']).first()
        del project['owner']
        del project['country']
        p = Project(**project)
        p.owner = owner
        p.country = country
        db.session.add(p)

    for reporting in user_reportings:
        # the user who is reporting another user
        reporter = User.query.filter_by(public_id=reporting['reporter_id']).first()  # type: User
        # the user being reported
        user = User.query.filter_by(public_id=reporting['user_id']).first()  # type: User
        reporter.given_reports.append(user)

    for reporting in project_reportings:
        # the user who is reporting another user
        reporter = User.query.filter_by(public_id=reporting['reporter_id']).first()  # type: User
        # the project being reported
        project = Project.query.filter_by(title=reporting['project_title']).first()  # type: Project
        reporter.project_reportings.append(project)

    db.session.commit()


if __name__ == '__main__':
    create_databases()
    populate()

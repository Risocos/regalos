from datetime import datetime

from mongoengine import connect

from backend.models import User, Project, Country, Donation

countries = [
    {'name': 'Afghanistan', 'country_code': 'af'},
    {'name': 'Aland Islands', 'country_code': 'ax'},
    {'name': 'Albania', 'country_code': 'al'},
    {'name': 'Algeria', 'country_code': 'dz'},
    {'name': 'American Samoa', 'country_code': 'as'},
    {'name': 'Andorra', 'country_code': 'ad'},
    {'name': 'Angola', 'country_code': 'ao'},
    {'name': 'Anguilla', 'country_code': 'ai'},
    {'name': 'Antigua', 'country_code': 'ag'},
    {'name': 'Argentina', 'country_code': 'ar'},
    {'name': 'Armenia', 'country_code': 'am'},
    {'name': 'Aruba', 'country_code': 'aw'},
    {'name': 'Australia', 'country_code': 'au'},
    {'name': 'Austria', 'country_code': 'at'},
    {'name': 'Azerbaijan', 'country_code': 'az'},
    {'name': 'Bahamas', 'country_code': 'bs'},
    {'name': 'Bahrain', 'country_code': 'bh'},
    {'name': 'Bangladesh', 'country_code': 'bd'},
    {'name': 'Barbados', 'country_code': 'bb'},
    {'name': 'Belarus', 'country_code': 'by'},
    {'name': 'Belgium', 'country_code': 'be'},
    {'name': 'Belize', 'country_code': 'bz'},
    {'name': 'Benin', 'country_code': 'bj'},
    {'name': 'Bermuda', 'country_code': 'bm'},
    {'name': 'Bhutan', 'country_code': 'bt'},
    {'name': 'Bolivia', 'country_code': 'bo'},
    {'name': 'Bosnia', 'country_code': 'ba'},
    {'name': 'Botswana', 'country_code': 'bw'},
    {'name': 'Bouvet Island', 'country_code': 'bv'},
    {'name': 'Brazil', 'country_code': 'br'},
    {'name': 'British Virgin Islands', 'country_code': 'vg'},
    {'name': 'Brunei', 'country_code': 'bn'},
    {'name': 'Bulgaria', 'country_code': 'bg'},
    {'name': 'Burkina Faso', 'country_code': 'bf'},
    {'name': 'Burma', 'country_code': 'mm'},
    {'name': 'Burundi', 'country_code': 'bi'},
    {'name': 'Caicos Islands', 'country_code': 'tc'},
    {'name': 'Cambodia', 'country_code': 'kh'},
    {'name': 'Cameroon', 'country_code': 'cm'},
    {'name': 'Canada', 'country_code': 'ca'},
    {'name': 'Cape Verde', 'country_code': 'cv'},
    {'name': 'Cayman Islands', 'country_code': 'ky'},
    {'name': 'Central African Republic', 'country_code': 'cf'},
    {'name': 'Chad', 'country_code': 'td'},
    {'name': 'Chile', 'country_code': 'cl'},
    {'name': 'China', 'country_code': 'cn'},
    {'name': 'Christmas Island', 'country_code': 'cx'},
    {'name': 'Cocos Islands', 'country_code': 'cc'},
    {'name': 'Colombia', 'country_code': 'co'},
    {'name': 'Comoros', 'country_code': 'km'},
    {'name': 'Congo', 'country_code': 'cd'},
    {'name': 'Congo Brazzaville', 'country_code': 'cg'},
    {'name': 'Cook Islands', 'country_code': 'ck'},
    {'name': 'Costa Rica', 'country_code': 'cr'},
    {'name': 'Cote Divoire', 'country_code': 'ci'},
    {'name': 'Croatia', 'country_code': 'hr'},
    {'name': 'Cuba', 'country_code': 'cu'},
    {'name': 'Cyprus', 'country_code': 'cy'},
    {'name': 'Czech Republic', 'country_code': 'cz'},
    {'name': 'Denmark', 'country_code': 'dk'},
    {'name': 'Djibouti', 'country_code': 'dj'},
    {'name': 'Dominica', 'country_code': 'dm'},
    {'name': 'Dominican Republic', 'country_code': 'do'},
    {'name': 'Ecuador', 'country_code': 'ec'},
    {'name': 'Egypt', 'country_code': 'eg'},
    {'name': 'El Salvador', 'country_code': 'sv'},
    {'name': 'Equatorial Guinea', 'country_code': 'gq'},
    {'name': 'Eritrea', 'country_code': 'er'},
    {'name': 'Estonia', 'country_code': 'ee'},
    {'name': 'Ethiopia', 'country_code': 'et'},
    {'name': 'Europeanunion', 'country_code': 'eu'},
    {'name': 'Falkland Islands', 'country_code': 'fk'},
    {'name': 'Faroe Islands', 'country_code': 'fo'},
    {'name': 'Fiji', 'country_code': 'fj'},
    {'name': 'Finland', 'country_code': 'fi'},
    {'name': 'France', 'country_code': 'fr'},
    {'name': 'French Guiana', 'country_code': 'gf'},
    {'name': 'French Polynesia', 'country_code': 'pf'},
    {'name': 'French Territories', 'country_code': 'tf'},
    {'name': 'Gabon', 'country_code': 'ga'},
    {'name': 'Gambia', 'country_code': 'gm'},
    {'name': 'Georgia', 'country_code': 'ge'},
    {'name': 'Germany', 'country_code': 'de'},
    {'name': 'Ghana', 'country_code': 'gh'},
    {'name': 'Gibraltar', 'country_code': 'gi'},
    {'name': 'Greece', 'country_code': 'gr'},
    {'name': 'Greenland', 'country_code': 'gl'},
    {'name': 'Grenada', 'country_code': 'gd'},
    {'name': 'Guadeloupe', 'country_code': 'gp'},
    {'name': 'Guam', 'country_code': 'gu'},
    {'name': 'Guatemala', 'country_code': 'gt'},
    {'name': 'Guinea', 'country_code': 'gn'},
    {'name': 'Guinea-Bissau', 'country_code': 'gw'},
    {'name': 'Guyana', 'country_code': 'gy'},
    {'name': 'Haiti', 'country_code': 'ht'},
    {'name': 'Heard Island', 'country_code': 'hm'},
    {'name': 'Honduras', 'country_code': 'hn'},
    {'name': 'Hong Kong', 'country_code': 'hk'},
    {'name': 'Hungary', 'country_code': 'hu'},
    {'name': 'Iceland', 'country_code': 'is'},
    {'name': 'India', 'country_code': 'in'},
    {'name': 'Indian Ocean Territory', 'country_code': 'io'},
    {'name': 'Indonesia', 'country_code': 'id'},
    {'name': 'Iran', 'country_code': 'ir'},
    {'name': 'Iraq', 'country_code': 'iq'},
    {'name': 'Ireland', 'country_code': 'ie'},
    {'name': 'Israel', 'country_code': 'il'},
    {'name': 'Italy', 'country_code': 'it'},
    {'name': 'Jamaica', 'country_code': 'jm'},
    {'name': 'Jan Mayen', 'country_code': 'sj'},
    {'name': 'Japan', 'country_code': 'jp'},
    {'name': 'Jordan', 'country_code': 'jo'},
    {'name': 'Kazakhstan', 'country_code': 'kz'},
    {'name': 'Kenya', 'country_code': 'ke'},
    {'name': 'Kiribati', 'country_code': 'ki'},
    {'name': 'Kuwait', 'country_code': 'kw'},
    {'name': 'Kyrgyzstan', 'country_code': 'kg'},
    {'name': 'Laos', 'country_code': 'la'},
    {'name': 'Latvia', 'country_code': 'lv'},
    {'name': 'Lebanon', 'country_code': 'lb'},
    {'name': 'Lesotho', 'country_code': 'ls'},
    {'name': 'Liberia', 'country_code': 'lr'},
    {'name': 'Libya', 'country_code': 'ly'},
    {'name': 'Liechtenstein', 'country_code': 'li'},
    {'name': 'Lithuania', 'country_code': 'lt'},
    {'name': 'Luxembourg', 'country_code': 'lu'},
    {'name': 'Macau', 'country_code': 'mo'},
    {'name': 'Macedonia', 'country_code': 'mk'},
    {'name': 'Madagascar', 'country_code': 'mg'},
    {'name': 'Malawi', 'country_code': 'mw'},
    {'name': 'Malaysia', 'country_code': 'my'},
    {'name': 'Maldives', 'country_code': 'mv'},
    {'name': 'Mali', 'country_code': 'ml'},
    {'name': 'Malta', 'country_code': 'mt'},
    {'name': 'Marshall Islands', 'country_code': 'mh'},
    {'name': 'Martinique', 'country_code': 'mq'},
    {'name': 'Mauritania', 'country_code': 'mr'},
    {'name': 'Mauritius', 'country_code': 'mu'},
    {'name': 'Mayotte', 'country_code': 'yt'},
    {'name': 'Mexico', 'country_code': 'mx'},
    {'name': 'Micronesia', 'country_code': 'fm'},
    {'name': 'Moldova', 'country_code': 'md'},
    {'name': 'Monaco', 'country_code': 'mc'},
    {'name': 'Mongolia', 'country_code': 'mn'},
    {'name': 'Montenegro', 'country_code': 'me'},
    {'name': 'Montserrat', 'country_code': 'ms'},
    {'name': 'Morocco', 'country_code': 'ma'},
    {'name': 'Mozambique', 'country_code': 'mz'},
    {'name': 'Namibia', 'country_code': 'na'},
    {'name': 'Nauru', 'country_code': 'nr'},
    {'name': 'Nepal', 'country_code': 'np'},
    {'name': 'Netherlands', 'country_code': 'nl'},
    {'name': 'Netherlandsantilles', 'country_code': 'an'},
    {'name': 'New Caledonia', 'country_code': 'nc'},
    {'name': 'New Guinea', 'country_code': 'pg'},
    {'name': 'New Zealand', 'country_code': 'nz'},
    {'name': 'Nicaragua', 'country_code': 'ni'},
    {'name': 'Niger', 'country_code': 'ne'},
    {'name': 'Nigeria', 'country_code': 'ng'},
    {'name': 'Niue', 'country_code': 'nu'},
    {'name': 'Norfolk Island', 'country_code': 'nf'},
    {'name': 'North Korea', 'country_code': 'kp'},
    {'name': 'Northern Mariana Islands', 'country_code': 'mp'},
    {'name': 'Norway', 'country_code': 'no'},
    {'name': 'Oman', 'country_code': 'om'},
    {'name': 'Pakistan', 'country_code': 'pk'},
    {'name': 'Palau', 'country_code': 'pw'},
    {'name': 'Palestine', 'country_code': 'ps'},
    {'name': 'Panama', 'country_code': 'pa'},
    {'name': 'Paraguay', 'country_code': 'py'},
    {'name': 'Peru', 'country_code': 'pe'},
    {'name': 'Philippines', 'country_code': 'ph'},
    {'name': 'Pitcairn Islands', 'country_code': 'pn'},
    {'name': 'Poland', 'country_code': 'pl'},
    {'name': 'Portugal', 'country_code': 'pt'},
    {'name': 'Puerto Rico', 'country_code': 'pr'},
    {'name': 'Qatar', 'country_code': 'qa'},
    {'name': 'Reunion', 'country_code': 're'},
    {'name': 'Romania', 'country_code': 'ro'},
    {'name': 'Russia', 'country_code': 'ru'},
    {'name': 'Rwanda', 'country_code': 'rw'},
    {'name': 'Saint Helena', 'country_code': 'sh'},
    {'name': 'Saint Kitts and Nevis', 'country_code': 'kn'},
    {'name': 'Saint Lucia', 'country_code': 'lc'},
    {'name': 'Saint Pierre', 'country_code': 'pm'},
    {'name': 'Saint Vincent', 'country_code': 'vc'},
    {'name': 'Samoa', 'country_code': 'ws'},
    {'name': 'San Marino', 'country_code': 'sm'},
    {'name': 'Sandwich Islands', 'country_code': 'gs'},
    {'name': 'Sao Tome', 'country_code': 'st'},
    {'name': 'Saudi Arabia', 'country_code': 'sa'},
    {'name': 'Scotland', 'country_code': 'gb sct'},
    {'name': 'Senegal', 'country_code': 'sn'},
    {'name': 'Serbia', 'country_code': 'cs'},
    {'name': 'Serbia', 'country_code': 'rs'},
    {'name': 'Seychelles', 'country_code': 'sc'},
    {'name': 'Sierra Leone', 'country_code': 'sl'},
    {'name': 'Singapore', 'country_code': 'sg'},
    {'name': 'Slovakia', 'country_code': 'sk'},
    {'name': 'Slovenia', 'country_code': 'si'},
    {'name': 'Solomon Islands', 'country_code': 'sb'},
    {'name': 'Somalia', 'country_code': 'so'},
    {'name': 'South Africa', 'country_code': 'za'},
    {'name': 'South Korea', 'country_code': 'kr'},
    {'name': 'Spain', 'country_code': 'es'},
    {'name': 'Sri Lanka', 'country_code': 'lk'},
    {'name': 'Sudan', 'country_code': 'sd'},
    {'name': 'Suriname', 'country_code': 'sr'},
    {'name': 'Swaziland', 'country_code': 'sz'},
    {'name': 'Sweden', 'country_code': 'se'},
    {'name': 'Switzerland', 'country_code': 'ch'},
    {'name': 'Syria', 'country_code': 'sy'},
    {'name': 'Taiwan', 'country_code': 'tw'},
    {'name': 'Tajikistan', 'country_code': 'tj'},
    {'name': 'Tanzania', 'country_code': 'tz'},
    {'name': 'Thailand', 'country_code': 'th'},
    {'name': 'Timorleste', 'country_code': 'tl'},
    {'name': 'Togo', 'country_code': 'tg'},
    {'name': 'Tokelau', 'country_code': 'tk'},
    {'name': 'Tonga', 'country_code': 'to'},
    {'name': 'Trinidad', 'country_code': 'tt'},
    {'name': 'Tunisia', 'country_code': 'tn'},
    {'name': 'Turkey', 'country_code': 'tr'},
    {'name': 'Turkmenistan', 'country_code': 'tm'},
    {'name': 'Tuvalu', 'country_code': 'tv'},
    {'name': 'United Arab Emirates (U.A.E.)', 'country_code': 'ae'},
    {'name': 'Uganda', 'country_code': 'ug'},
    {'name': 'Ukraine', 'country_code': 'ua'},
    {'name': 'United Kingdom', 'country_code': 'gb'},
    {'name': 'United States', 'country_code': 'us'},
    {'name': 'Uruguay', 'country_code': 'uy'},
    {'name': 'US Minor Islands', 'country_code': 'um'},
    {'name': 'US Virgin Islands', 'country_code': 'vi'},
    {'name': 'Uzbekistan', 'country_code': 'uz'},
    {'name': 'Vanuatu', 'country_code': 'vu'},
    {'name': 'Vatican City', 'country_code': 'va'},
    {'name': 'Venezuela', 'country_code': 've'},
    {'name': 'Vietnam', 'country_code': 'vn'},
    {'name': 'Wales', 'country_code': 'gb wls'},
    {'name': 'Wallis and Futuna', 'country_code': 'wf'},
    {'name': 'Western Sahara', 'country_code': 'eh'},
    {'name': 'Yemen', 'country_code': 'ye'},
    {'name': 'Zambia', 'country_code': 'zm'},
    {'name': 'Zimbabwe', 'country_code': 'zw'},
]

users = [
    {
        'public_id': '705897b6-5478-4ba2-822a-c5e5833d4124',
        'email': 'sander@vandoorn.nl',
        'username': 'admin',
        'admin': True,
        'verified': True,
        # password: OneTwoThree123
        'password_hash': 'sha256$N34hfMMN$a6bec8f319443512b9c0cf5a400c66933ab563a5d2ff5d34fd87dbc19f27d3f7',
        'twitter': 'https://twitter.com/DoornSander',
        'linkedin': 'https://www.linkedin.com/in/sander-van-doorn-64b48b112/',
    },
    {
        'public_id': 'b9229d9b-cb28-4e12-baea-ead89ef0a494',
        'email': 'melle@dijkstra.nl',
        'username': 'Melle',
        'admin': False,
        'verified': False,
        # password: 123456
        'password_hash': 'sha256$xjKXjf0B$3efddd4395a0320e0ba6b6fddf14f793fe9dbe0170a7cdc657addda822dd65fd',
        'biography': 'My name is Melle and I will be going to Uganda next year. etc.',
        'twitter': None,
    },
    {
        'public_id': 'r595e75f-fe89-44d5-fosd-ewd4d5e87wdd',
        'email': 'r.bos@st.hanze.nl',
        'username': 'Romy',
        'admin': True,
        'verified': True,
        # password: OneTwoThree123
        'password_hash': 'sha256$N34hfMMN$a6bec8f319443512b9c0cf5a400c66933ab563a5d2ff5d34fd87dbc19f27d3f7',
        'biography': 'My name is Romy and I am a collaborator of the rpoject Regalos.',
        'twitter': 'https://twitter.com/RomyBos_',
    },
]

projects = [
    {
        'title': 'Building Houses',
        'short_description': 'We are going to build houses for people in Uganda',
        'project_plan': 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
        'owner': users[0]['public_id'],
        'collaborators': [
            users[0]['public_id'],
            users[1]['public_id'],
        ],
        'target_budget': 10000,
        'current_budget': 4576,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.99190516,
        'longitude': -58.86762519,
        'filename': 'dummy1.jpg',
        'country': 'ug',
    },
    {
        'title': 'Collecting money',
        'short_description': 'We want to collect money for others',
        'owner': users[0]['public_id'],
        'target_budget': 15000,
        'current_budget': 8594,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.61806054,
        'longitude': 62.77961401,
        'project_plan': 'We plan to collect money from door to door and use this app as payment method',
        'collaborators': [
            users[0]['public_id']
        ],
        'filename': 'dummy2.jpg',
        'country': 'an',
    },
    {
        'title': 'Recycle clothing',
        'short_description': 'Donate your clothing, so we can recycle it!',
        'owner': users[1]['public_id'],
        'target_budget': 0,
        'current_budget': 0,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 49.02797017,
        'longitude': -32.40686866,
        'project_plan': 'We want people to donate their clothing, so that we can send this to poor countries',
        'collaborators': [],
        'filename': 'dummy3.jpg',
        'country': 'us',
    },
    {
        'title': 'Project Regalos',
        'short_description': 'Donate for our project to create this project app',
        'owner': users[1]['public_id'],
        'target_budget': 5000,
        'current_budget': 30,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 31.80457949,
        'longitude': -10.32726764,
        'project_plan': 'Too bad we cannot afford our own hourly pay and Sander is addicted to coffee. Sad face.',
        'collaborators': [],
        'country': None,
    },
{
        'title': 'Safe drinking water',
        'short_description': 'We want to make 2000 drinking tubes and spread these between different housholds in South Africa. This way a lot of people will be able to drink the water that is already there.',
        'owner': users[2]['public_id'],
        'target_budget': 8000,
        'current_budget': 280,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 49.02797017,
        'longitude': -32.40686866,
        'project_plan': 'We want to make 2000 drinking tubes and spread these between different housholds in South Africa. This way a lot of people will be able to drink the water that is already there.',
        'collaborators': [],
        'filename': 'dummy4.jpg',
        'country': 'za',
    },
{
        'title': 'Building Houses',
        'short_description': 'We are going to build houses for people in Uganda',
        'project_plan': 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
        'owner': users[0]['public_id'],
        'collaborators': [
            users[0]['public_id'],
            users[1]['public_id'],
        ],
        'target_budget': 10000,
        'current_budget': 4576,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.99190516,
        'longitude': -58.86762519,
        'filename': 'dummy1.jpg',
        'country': 'ug',
    },
{
        'title': 'Collecting money',
        'short_description': 'We want to collect money for others',
        'owner': users[0]['public_id'],
        'target_budget': 15000,
        'current_budget': 8594,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.61806054,
        'longitude': 62.77961401,
        'project_plan': 'We plan to collect money from door to door and use this app as payment method',
        'collaborators': [
            users[0]['public_id']
        ],
        'filename': 'dummy2.jpg',
        'country': 'an',
    },
{
        'title': 'Project Regalos',
        'short_description': 'Donate for our project to create this project app',
        'owner': users[1]['public_id'],
        'target_budget': 5000,
        'current_budget': 30,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 31.80457949,
        'longitude': -10.32726764,
        'project_plan': 'Too bad we cannot afford our own hourly pay and Sander is addicted to coffee. Sad face.',
        'collaborators': [],
        'country': None,
    },
{
        'title': 'Safe drinking water',
        'short_description': 'We want to make 2000 drinking tubes and spread these between different housholds in South Africa. This way a lot of people will be able to drink the water that is already there.',
        'owner': users[2]['public_id'],
        'target_budget': 8000,
        'current_budget': 280,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 49.02797017,
        'longitude': -32.40686866,
        'project_plan': 'We want to make 2000 drinking tubes and spread these between different housholds in South Africa. This way a lot of people will be able to drink the water that is already there.',
        'collaborators': [],
        'filename': 'dummy4.jpg',
        'country': 'za',
    },
{
        'title': 'Building Houses',
        'short_description': 'We are going to build houses for people in Uganda',
        'project_plan': 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
        'owner': users[0]['public_id'],
        'collaborators': [
            users[0]['public_id'],
            users[1]['public_id'],
        ],
        'target_budget': 10000,
        'current_budget': 4576,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.99190516,
        'longitude': -58.86762519,
        'filename': 'dummy1.jpg',
        'country': 'ug',
    },
{
        'title': 'Project Regalos',
        'short_description': 'Donate for our project to create this project app',
        'owner': users[1]['public_id'],
        'target_budget': 5000,
        'current_budget': 30,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 31.80457949,
        'longitude': -10.32726764,
        'project_plan': 'Too bad we cannot afford our own hourly pay and Sander is addicted to coffee. Sad face.',
        'collaborators': [],
        'country': None,
    },
{
        'title': 'Collecting money',
        'short_description': 'We want to collect money for others',
        'owner': users[0]['public_id'],
        'target_budget': 15000,
        'current_budget': 8594,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.61806054,
        'longitude': 62.77961401,
        'project_plan': 'We plan to collect money from door to door and use this app as payment method',
        'collaborators': [
            users[0]['public_id']
        ],
        'filename': 'dummy2.jpg',
        'country': 'an',
    },
{
        'title': 'Building Houses',
        'short_description': 'We are going to build houses for people in Uganda',
        'project_plan': 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
        'owner': users[0]['public_id'],
        'collaborators': [
            users[0]['public_id'],
            users[1]['public_id'],
        ],
        'target_budget': 10000,
        'current_budget': 4576,
        'start_date': datetime.fromtimestamp(1527764457),
        'end_date': datetime.fromtimestamp(1527766457),
        'latitude': 0.99190516,
        'longitude': -58.86762519,
        'filename': 'dummy1.jpg',
        'country': 'ug',
    },
]

donations = [
    {
        'amount': 23,
        'project': projects[0]['title'],
        'donator': None,
        'paypal_payment_id': 'PAY-FAKEPAYMENTID',
        'status': str(Donation.Status.SUCCESS)
    },
    {
        'amount': 120,
        'project': projects[0]['title'],
        'donator': users[1]['public_id'],
        'paypal_payment_id': 'PAY-FAKEPAYMENTID',
        'status': str(Donation.Status.SUCCESS)
    },
    {
        'amount': 56,
        'project': projects[1]['title'],
        'donator': users[0]['public_id'],
        'paypal_payment_id': 'PAY-FAKEPAYMENTID',
        'status': str(Donation.Status.SUCCESS)
    },
    {
        'amount': 34234,
        'project': projects[1]['title'],
        'donator': None,
        'paypal_payment_id': 'PAY-FAKEPAYMENTID',
        'status': str(Donation.Status.CANCELLED)
    }
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


# populates everything
def populate():
    print('populating countries')
    for country in countries:
        Country(**country).save()

    # populate users
    print('populating users')
    for user in users:
        User(**user).save()

    # populate projects
    print('populating projects')
    for project in projects:
        owner = User.objects(public_id=project['owner']).first()
        country = Country.objects(country_code=project['country']).first()
        collaborators = []
        for collab in project['collaborators']:
            collaborators.append(User.objects(public_id=collab).first())
        del project['owner']
        del project['country']
        del project['collaborators']
        p = Project(**project)
        p.owner = owner
        p.collaborators += collaborators
        p.country = country
        p.save()

    print('populating donations')
    for donation in donations:
        project = Project.objects(title=donation['project']).first()
        donator = User.objects(public_id=donation['donator']).first()
        del donation['project']
        del donation['donator']
        d = Donation(**donation)
        d.project = project
        d.donator = donator
        d.save()

    # for reporting in user_reportings:
    #     # the user who is reporting another user
    #     reporter = User.query.filter_by(public_id=reporting['reporter_id']).first()  # type: User
    #     # the user being reported
    #     user = User.query.filter_by(public_id=reporting['user_id']).first()  # type: User
    #     reporter.given_reports.append(user)
    #
    # for reporting in project_reportings:
    #     # the user who is reporting another user
    #     reporter = User.query.filter_by(public_id=reporting['reporter_id']).first()  # type: User
    #     # the project being reported
    #     project = Project.query.filter_by(title=reporting['project_title']).first()  # type: Project
    #     reporter.project_reportings.append(project)


if __name__ == '__main__':
    if input('clear database first? (y/n): ') is 'y':
        db = connect('regalos')
        db.drop_database('regalos')
    populate()

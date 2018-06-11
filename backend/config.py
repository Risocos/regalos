import os

from backend import localconfig


class Config:
    """
    Configuration used by flask application
    """
    ENV = 'development'
    # SERVER_NAME = 'localhost'
    SECRET_KEY = '}Zz_n2=.B<yRp|KpK>,T:?KmS8a6?G0XES,kW0SIF=e}T)YEGh9k&&Xyni(~<5E'

    # Database configuration
    MONGOALCHEMY_DATABASE = 'regalos'
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

    # PayPal configuration
    PAYPAL = localconfig.PAYPAL

    # Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'regalos.crew@gmail.com'
    MAIL_PASSWORD = localconfig.MAIL_PASSWORD
    MAIL_DEFAULT_SENDER = 'Regalos Inc.'


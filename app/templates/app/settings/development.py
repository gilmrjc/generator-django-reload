import os

from .base import *

DEBUG = True

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.normpath(os.path.join(BASE_DIR, 'db.sqlite3')),
    }
}

SECRET_KEY = 'esta clave no es segura'

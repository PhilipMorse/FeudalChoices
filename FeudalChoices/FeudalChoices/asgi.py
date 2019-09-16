import os
import django
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "FeudalChoices.settings")
django.setup()
application = get_wsgi_application()

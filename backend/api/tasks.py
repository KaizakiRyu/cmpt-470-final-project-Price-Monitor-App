from __future__ import absolute_import, unicode_literals
from celery.schedules import crontab

from backend.celery import app
import requests

# @app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):
#     # Calls test('hello') every 10 seconds.
#     sender.add_periodic_task(10.0, test, name='add test task every 10')

@app.task
def update_price(product_url=None):
    data = {
        'project': 'scraper',
        'spider': 'pricespider',
        'provided_url': product_url
    }

    # response = requests.post('http://localhost:6800/schedule.json', data=data) #local test
    response = requests.post('http://scrapy:6800/schedule.json', data=data) #production
    print(response)

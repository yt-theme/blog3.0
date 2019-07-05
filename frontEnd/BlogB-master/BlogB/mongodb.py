from mongoengine import *
connect('blog')

class User(Document):
    username = StringField(required=True)
    website  = URLField()
    tags     = ListField(StringField(max_length=16))
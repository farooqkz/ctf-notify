import peewee as pw
from db import db


class Pusher:
    class Meta:
        database = db

    players = pw.IntegerField()  # minimum number of players for this pusher
    owner = pw.UUIDField(index=True)  # owner of this pusher
    mode = pw.CharField(
        index=True
    )  # either "nade_fight" or "classes" or "classic"
    map_ = pw.CharField(index=True)  # a technical map name
    pusher = pw.TextField()  # URL for the pusher for Web push API
    expire = pw.DateTimeField()

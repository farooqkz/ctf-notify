import peewee as pw

db = pw.SqliteDatabase("/tmp/ctf-notify", autocommit=True)

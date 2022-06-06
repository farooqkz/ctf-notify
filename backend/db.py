import peewee as pw

db = pw.SqliteDatabase("/tmp/ctf-notify.sqlite3", autocommit=True)

from models import Pusher
import time

if __name__ == "__main__":
    print(Pusher.delete().where(Pusher.expire < time.time()).execute())

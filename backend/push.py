import requests

from models import Pusher
from api import stats

if __name__ == "__main__":
    s = stats()
    i = 0
    for p in Pusher.select(Pusher.pusher).where(
        Pusher.map_
        == s["map_technical"] & Pusher.mode
        == s["mode"] & Pusher.players
        <= s["players"]
    ):
        requests.get(p.pusher, headers={"TTL": str(60 * 10)})
        i += 1
    print(i)

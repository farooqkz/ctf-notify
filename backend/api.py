import requests
import time
from typing import Dict, Union
from dataclasses import dataclass

CTF_API = "https://ctf.rubenwardy.com/api/game.json"
SERVER_LIST_API = "https://servers.minetest.net/list"
CACHE_TIMEOUT = 15


@dataclass
class Cache:
    expire: int
    result: Dict[str, Union[str, int]]

cache: Union[Cache, None] = None

def _stats() -> Union[Dict[str, Union[str, int]], None]:
    req_mode_map = requests.get(CTF_API)

    if req_mode_map.ok:
        j1 = req_mode_map.json()

        return {
            "map_technical": j1["current_map"]["technical_name"],
            "map": j1["current_map"]["name"],
            "mode": j1["current_mode"]["name"],
            "players": j1["player_info"]['count'],
            "start_time": j1["current_map"]["start_time"]
        }
    else:
        return None


def stats() -> Union[Dict[str, Union[str, int]], None]:
    global cache
    if cache is None or abs(cache.expire - time.time()) > CACHE_TIMEOUT:
        result = None
        while result is None:
            result = _stats()
            time.sleep(.2)
        cache = Cache(expire=int(time.time() + CACHE_TIMEOUT), result=result)
        return result

    return cache.result

import requests
from typing import Dict, Union

CTF_API = "https://ctf.rubenwardy.com/api/game.json"
SERVER_LIST_API = "https://servers.minetest.net/list"


def stats() -> Union[Dict[str, Union[str, int]], None]:
    req_mode_map = requests.get(CTF_API)
    req_players = requests.get(SERVER_LIST_API)

    if req_mode_map.ok and req_players.ok:
        j1 = req_mode_map.json()
        j2 = [
            x
            for x in req_players.json()["list"]
            if x["address"] == "ctf.rubenwardy.com"
        ][0]

        return {
            "map_technical": j1["current_map"]["technical_name"],
            "map": j1["current_map"]["name"],
            "mode": j1["current_mode"]["name"],
            "players": j2["clients"],
        }
    else:
        return None

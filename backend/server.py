from flask import Flask, redirect, request, abort, session
from flask_restful import Api, Resource
import requests
import uuid
import time
import peewee as pw

from models import Pusher
from api import stats


CTF_API = "https://ctf.rubenwardy.com/api/game.json"
SERVER_LIST_API = "https://servers.minetest.net/list"

CTF_MAP_REPO = "https://github.com/mt-ctf/maps/"

_1D = 3600 * 24

app = Flask(__name__)
api = Api(app)


class Stat(Resource):
    def get(self):
        s = stats()
        if s is None:
            abort(502)
        else:
            return s


class MapThumbnail(Resource):
    def get(self, map_name):
        return redirect(
            f"https://raw.githubusercontent.com/MT-CTF/maps/master/{map_name}/screenshot.png",
            code=308,
        )


class Pusher(Resource):
    def delete(self, id_):
        q = Pusher.delete().where(Pusher.id == id_)
        if q.execute() > 0:
            return {"result": "done"}
        else:
            abort(404)

    def get(self, id_=...):
        result = []
        owner = session.get("uuid", "")
        if owner:
            for pusher in Pusher.select().where(Pusher.owner == owner):
                result.append(
                    {
                        "id": pusher.id,
                        "players": pusher.player,
                        "map": pusher.map_,
                        "mode": pusher.mode,
                    }
                )
            Pusher.update({"expire": time.time() + _1D * 3}).where(
                Pusher.owner == owner
            ).execute()
            return {"pushers": result}
        else:
            session["owner"] = str(uuid.uuid4())
            return {"pushers": list()}

    def post(self):
        if not request.is_json:
            abort(404)
        pusher = request.json.get("pusher")
        players = request.json.get("players")
        map_ = request.json.get("map")
        mode = request.json.get("mode")
        missing = list()
        for j in ("pusher", "players", "map_", "mode"):
            if locals()[j] is None:
                missing.append(j)
        if len(missing) > 0:
            abort({"missing": missing}, 400)
        owner = session.get("owner")
        if owner is None:
            session["owner"] = str(uuid.uuid4())

        Pusher.create(
            {
                "pusher": pusher,
                "players": players,
                "map_": map_,
                "mode": mode,
                "expire": time.time() + _1D * 7,
                "owner": str(session["owner"]),
            }
        )
        return {"result": "done"}


api.add_resource(Stat, "/stats")
api.add_resource(MapThumbnail, "/mapthumbnail/<string:map_name>")
api.add_resource(Pusher, "/pusher/<string:id_>")

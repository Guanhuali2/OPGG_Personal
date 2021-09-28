from lol_api import Riot_Api
from flask import Flask
from flask_restful import Api, Resource, reqparse, request
from api_function import api_function
import pymongo
import sys


app = Flask(__name__)
api = Api(app)


# Get Api for Player Profile/Rank/Matches
class player_Api(Resource):
    def __init__(self):
        self.key = 'RGAPI-e7daf949-9a85-4cdb-a4dd-b7e533faf38e'
        self.server = 'na1'

    def get(self, server, userName):
        self.server = server
        dicts = {}
        temp = Riot_Api(self.key, self.server)
        try:
            temp1 = temp.get_profile_by_name(userName)
        except:
            dicts = {"nope": 1}
            print(dicts)
            return dicts, 200
        temp2 = temp.get_ranked_by_id(temp1['id'])
        temp5 = temp.get_match_by_account(temp1['accountId'])
        temp7 = []
        for i in range(len(temp5['matches'])):
            if i == 10:
                break
            temp7.append(temp.get_transfer_list(temp5['matches'][i]['gameId']))
        dicts["rank"] = temp2
        dicts["profile"] = temp1
        dicts["match"] = temp7
        winrate, champion = api_function(dicts).cal_winRate()
        dicts["winrate"] = winrate
        dicts["champion"] = champion
        return dicts, 200

    def put(self, server, userName):
        webclient = connect_to_db()
        self.server = server
        dicts = {
            "server": self.server,
            "userName": userName
        }
        db = webclient.user['users']
        if db.find({'userName': userName}).count() >= 1:
            return 200
        try:
            db.insert_one(dicts)
        except:
            return 400
        db.find()
        return 200


#function that help connect to database
def connect_to_db():
    try:
        webclient = pymongo.MongoClient(
            "mongodb+srv://Guanhua:champion328@cluster0.fwffs.mongodb.net/"
            "myFirstDatabase?retryWrites=true&w=majority")
    except TypeError:
        print("database connect error")
        sys.exit(1)
    return webclient


# Get Api for Champion
class champion_Api(Resource):
    def __init__(self):
        self.key = 'RGAPI-e7daf949-9a85-4cdb-a4dd-b7e533faf38e'
        self.server = 'na1'

    def get(self, champion):
        temp = Riot_Api(self.key, self.server)
        if champion == "solo":
            temp3 = temp.get_challenger("RANKED_SOLO_5x5")
        elif champion == "flex":
            temp3 = temp.get_challenger("RANKED_FLEX_SR")
        elif champion == "team":
            temp3 = temp.get_challenger("RANKED_FLEX_TT")
        else:
            temp3 = temp.get_game_version()
            temp4 = temp.get_champion_by_version(temp3['n']['champion'])
            dicts = {
                "top":[],
                "mid":[],
                "sup":[],
                "adc":[],
                "jug":[]
            }
            for champ in temp4["data"]:
                champ = temp4["data"][champ]
                if "Assassin" in champ["tags"] or "Mage" in champ["tags"]:
                    dicts["mid"].append(champ)
                if "Fighter" in champ["tags"] or "Tank" in champ["tags"]:
                    dicts["top"].append(champ)
                if "Marksman" in champ["tags"]:
                    dicts["adc"].append(champ)
                if "Support" in champ["tags"]:
                    dicts["sup"].append(champ)
                if "Fighter" in champ["tags"]:
                    dicts["jug"].append(champ)
            return dicts, 200
        return temp3, 200


api.add_resource(player_Api, '/<string:server>/<string:userName>')
api.add_resource(champion_Api, '/<string:champion>')

if __name__ == '__main__':
    app.run(debug=True)

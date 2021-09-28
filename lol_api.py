from riotwatcher import LolWatcher, ApiError
import pandas as pd


class Riot_Api:
    """
    this is a class that help build main api
    it connects with Riot riotwathcer api
    get data from Riot api, and transfer data
    """
    def __init__(self, api_key, region):
        self.watcher = LolWatcher(api_key)
        self.region = region
        self.dicts = {
            'spell': {}
        }

    # Get Player Profile Information
    def get_profile_by_name(self, name):
        return self.watcher.summoner.by_name(self.region, name)

    # Get Player Rank Information
    def get_ranked_by_id(self, id):
        return self.watcher.league.by_summoner(self.region, id)

    # Get Player Match Information
    def get_match_by_account(self, id):
        return self.watcher.match.matchlist_by_account(self.region, id)

    # Get Game Item Information
    def get_item_by_version(self, version):
        return self.watcher.data_dragon.items(version)

    # Store Game Spell Information
    def get_spell(self, version):
        temp = self.watcher.data_dragon.summoner_spells(version)
        for i in temp['data']:
            self.dicts['spell'][temp['data'][i]['key']] = temp['data'][i]['name']
        return

    # Get Top Player From Specific Server sorted by points
    def get_challenger(self, queue):
        temp = self.watcher.league.challenger_by_queue(self.region, queue)
        temp['entries'] = sorted(temp['entries'], key= lambda x: -x['leaguePoints'])
        return temp

    # Store Matches Info to dicts
    def get_match_status_by_Id(self, id):
        try:
            temp = self.watcher.match.by_id(self.region, id)
        except:
            return 404
        participants = []

        for row in temp['participants']:
            participants_row = {}
            participants_row['name'] = temp["participantIdentities"][row['participantId'] - 1]['player']['summonerName']
            participants_row['champion'] = row['championId']
            participants_row['spell1'] = row['spell1Id']
            participants_row['spell2'] = row['spell2Id']
            participants_row['win'] = 'Win' if row['stats']['win'] else 'Lose'
            participants_row['kills'] = row['stats']['kills']
            participants_row['deaths'] = row['stats']['deaths']
            participants_row['assists'] = row['stats']['assists']
            participants_row['totalDamageDealt'] = row['stats']['totalDamageDealt']
            participants_row['goldEarned'] = row['stats']['goldEarned']
            participants_row['champLevel'] = row['stats']['champLevel']
            participants_row['totalMinionsKilled'] = row['stats']['totalMinionsKilled']
            participants_row['item0'] = row['stats']['item0']
            participants_row['item1'] = row['stats']['item1']
            participants.append(participants_row)

        return participants

    # Transfer Id to Name (Spell/Item/Champion)
    def get_transfer_list(self, id):
        participants = self.get_match_status_by_Id(id)
        latest = self.get_game_version()['n']['champion']
        item = self.get_item_by_version(latest)
        self.get_spell(latest)
        static_champ_list = self.get_champion_by_version(latest)
        champ_dict = {}
        for key in static_champ_list['data']:
            row = static_champ_list['data'][key]
            champ_dict[row['key']] = row['id']
        for row in participants:
            row['champion'] = champ_dict[str(row['champion'])]
            row['spell1'] = self.dicts['spell'][str(row['spell1'])]
            row['spell2'] = self.dicts['spell'][str(row['spell2'])]
        return participants

    # Get Game Latest Version
    def get_game_version(self):
        return self.watcher.data_dragon.versions_for_region(self.region)

    # Get Champion Information
    def get_champion_by_version(self, version):
        return self.watcher.data_dragon.champions(version)

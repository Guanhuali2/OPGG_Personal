import unittest
from lol_api import Riot_Api
from api_function import  api_function

class TestJson(unittest.TestCase):
    temp = Riot_Api('RGAPI-d3e75320-438f-4ae0-a573-833c30fa67ce', 'na1')

    def testGetProfile(self):
        profile = self.temp.get_profile_by_name('strange top1')
        self.assertEqual('Strange Top1', profile['name'])

    def testGetRank(self):
        profile = self.temp.get_profile_by_name('strange top1')
        rank = self.temp.get_ranked_by_id(profile['id'])
        self.assertEqual('Strange Top1', rank[0]["summonerName"])

    def testGetMatch(self):
        profile = self.temp.get_profile_by_name('strange top1')
        match = self.temp.get_match_by_account(profile['accountId'])
        self.assertEqual('TOP', match['matches'][0]['lane'])

    def testGetChampion(self):
        temp3 = self.temp.get_game_version()
        temp4 = self.temp.get_champion_by_version(temp3['n']['champion'])
        self.assertEqual('Aatrox', temp4['data']['Aatrox']['id'])

    def testGetChallenger(self):
        temps = self.temp.get_challenger('RANKED_SOLO_5x5')
        self.assertEqual('CHALLENGER', temps['tier'])

    def testTransfer(self):
        profile = self.temp.get_profile_by_name('strange top1')
        match = self.temp.get_match_by_account(profile['accountId'])
        for i in range(len(match['matches'])):
            if i == 1:
                break
            temp7 = self.temp.get_transfer_list(match['matches'][i]['gameId'])
        self.assertEqual(temp7[0]['champion'], 'Lucian')

    def testMostChampion(self):
        temp1 = self.temp.get_profile_by_name('strange top1')
        temp2 = self.temp.get_ranked_by_id(temp1['id'])
        temp5 = self.temp.get_match_by_account(temp1['accountId'])
        temp7 = []
        dicts = {}
        for i in range(len(temp5['matches'])):
            print(temp5['matches'][i])
            if i == 10:
                break
            temp7.append(self.temp.get_transfer_list(temp5['matches'][i]['gameId']))
        dicts["rank"] = temp2
        dicts["profile"] = temp1
        dicts["match"] = temp7
        winrate, champion = api_function(dicts).cal_winRate()
        self.assertEqual(0.9, winrate)

    def testMostChampion(self):
        temp1 = self.temp.get_profile_by_name('strange top1')
        temp2 = self.temp.get_ranked_by_id(temp1['id'])
        temp5 = self.temp.get_match_by_account(temp1['accountId'])
        temp7 = []
        dicts = {}
        for i in range(len(temp5['matches'])):
            print(temp5['matches'][i])
            if i == 10:
                break
            temp7.append(self.temp.get_transfer_list(temp5['matches'][i]['gameId']))
        dicts["rank"] = temp2
        dicts["profile"] = temp1
        dicts["match"] = temp7
        winrate, champion = api_function(dicts).cal_winRate()
        self.assertEqual(champion[0], "Volibear")
        self.assertEqual(champion[1], 2)

class api_function:
    """
    this class implemented functions that Api.py class will use
    """
    def __init__(self, dicts):
        self.match =dicts['match']
        self.name = dicts['rank'][0]['summonerName']

    """
    calculate recent win rate and most used champion
    """
    def cal_winRate(self):
        diction = {
            "Win": 0,
            "Lose": 0
        }
        champion = {}
        for i in self.match:
            for j in i:
                if j['name'] == self.name:
                    diction[j["win"]] += 1
                    if j['champion'] in champion:
                        champion[j['champion']] += 1
                    else:
                        champion[j['champion']] = 1
        max_champion = max(champion.items(), key= lambda item: item[1])
        winrate = diction["Win"]/(diction["Lose"]+diction["Win"])
        return winrate, max_champion


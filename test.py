import requests

BASE = "http://127.0.0.1:5000/"

#response = requests.get(BASE + "na1/strange top1")
response = requests.get(BASE+"aatrox")
response = requests.get(BASE+"top/solo")
print(response.json())

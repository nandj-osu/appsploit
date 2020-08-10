#!/usr/bin/env python3

import os, sys, re, shutil
import subprocess
import sqlite3
import hashlib
import base64
import random
import string

from passlib.hash import django_pbkdf2_sha256 as _pbkdf2
from passlib.hash import bcrypt as _bcrypt
from passlib.hash import scrypt as _scrypt

DB_PATH = "../db/appsploit.db"
HASHCAT_MODE = dict(
    md5=0,
    sha256=1400,
    pbkdf2=10000,
    bcrypt=3200,
    ripemd160=6000,
    whirlpool=6100,
)
DIFFICULTY = {
    'md5': [100,1000,2500,10000],
    'sha256': [100,1000,2500,10000],
    'pbkdf2': [100,1000,2500,10000],
    'bcrypt': [100,1000,2500],
    'scrypt': [100,1000,2500,10000],
    'ripemd160': [100,1000,2500,10000],
    'whirlpool': [100,1000,2500,10000]
}

conn = sqlite3.connect(DB_PATH)


def md5(pw):
    return hashlib.md5(pw).hexdigest()

def pbkdf2(pw):
    return _pbkdf2.hash(pw)

def bcrypt(pw):
    return _bcrypt.hash(pw)

def ripemd160(pw):
    h = hashlib.new('ripemd160')
    h.update(pw)
    return h.hexdigest()

def whirlpool(pw):
    h = hashlib.new('whirlpool')
    h.update(pw)
    return h.hexdigest()

def rand_pass(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

def backfill():
    curr = conn.cursor()     
    rows = curr.execute("select * from user").fetchall()
    for row in rows:
        user_id = row[0]
        username = row[1]
        pw_plaintext = row[2]
        # pw_plaintext = rand_pass(8)

        pw_cleartxt = pw_plaintext.encode()

        pw_md5 = md5(pw_cleartxt)
        pw_pbkdf2 = pbkdf2(pw_cleartxt)
        pw_bcrypt = bcrypt(pw_cleartxt)
        pw_ripemd160 = ripemd160(pw_cleartxt)
        pw_whirlpool = whirlpool(pw_cleartxt)

        sql = """
            update user 
            set 
                password_plaintext = '{}',
                password_md5 = '{}',
                password_pbkdf2 = '{}',
                password_bcrypt = '{}',
                password_ripemd160 = '{}',
                password_whirlpool = '{}'
            where id = {}
            """.format(
                pw_plaintext,
                pw_md5, 
                pw_pbkdf2,
                pw_bcrypt,
                pw_ripemd160,
                pw_whirlpool,
                user_id)

        curr.execute(sql)

        print(" ".join(sql.split()))

    conn.commit()

def analysis():
    for k in HASHCAT_MODE.keys():
        with open("pw.hash", "w") as h:
            curr = conn.cursor()    
            for row in curr.execute("select * from user"):
                user_id = row[0]
                username = row[1]
                pw_cleartxt = row[2]
                pw_hashes = dict(
                    md5=row[3],
                    sha256=row[4],
                    pbkdf2=row[5],
                    bcrypt=row[6],
                    ripemd160=row[7],
                    whirlpool=row[8]
                )

                h.write("{}\n".format(pw_hashes[k]))

        for difficulty in DIFFICULTY[k]:

            cmd = ['/usr/bin/time', '-v',
                'hashcat',
                '-m{}'.format(HASHCAT_MODE[k]),
                '-a0',
                # '--show',
                '--potfile-disable',
                # '--restore-disable',
                # '--debug-mode=4',
                '-o', '{}_cracked.txt'.format(k),
                'pw.hash', 
                'wordlist_{}.txt'.format(difficulty)]

            p = subprocess.run(cmd, capture_output=True)            
            stats = p.stderr.decode('utf-8')
            # print("=== >> " + " ".join(cmd))

            m = re.search(r"Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (.*)\n", stats, re.MULTILINE)    
            elapsed_time = m.group(1)        
            m = re.search(r"Maximum resident set size \(kbytes\): (\d+)\n", stats, re.MULTILINE)    
            max_rss = m.group(1)

            out = os.popen('wc -l {}_cracked.txt'.format(k)).read()            
            cracked = out.split()[0]
            print("Cracked: {} Difficulty: {:<8}\tAlgorithm: {:<8}\tTime: {} h:mm:ss\tMem: {}kb".format(cracked, difficulty, k, elapsed_time, max_rss))

            os.unlink('{}_cracked.txt'.format(k))
            os.popen('rm -fr ~/.hashcat').read()


if __name__ == "__main__":
    
    if len(sys.argv) < 2:
        print("""
usage: ./stretch_goal.py mode

    mode:
        backfill    backfill hashes into database
        analysis    crack and analyze
            """)

    elif sys.argv[1] == "backfill":
        backfill()
    elif sys.argv[1] == "analysis":
        analysis()

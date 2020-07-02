# appsploit
CS 467 - Capstone Project -- Security-based research project

## Introduction
Web-based applications are ubiquitous today, making data accessible and more exposed than ever before. Due to the nature of web application implementations, and that they handle user-provided inputs, the modern developer needs to consider validation a top priority. However, it’s not just data integrity that they should be worried about. What if bad user input isn’t innocuous, but instead a well-crafted attack against a shortcoming in the application’s implementation? The method by which an attacker exploits an application is known as the attack vector. There are many types of attack vectors, each of which could result in a range of consequences, from the exposure of sensitive data to the complete incapacitation of a website.

In this project we seek to explore ten common web attacks, their implications to the user, how to execute each attack, and also how to defend against each of them. To demonstrate these concepts we will be creating a simple todo list application that contains known vulnerabilities. We will then provide the reviewer with detailed instructions on how to invoke this vulnerability. Furthermore, we will demonstrate how to harden an application against such attacks, all while detailing the mechanics and method of action of each exploit.

The team consists of three OSU computer science students with introductory experience in web development, cloud computing, and security research. The application will be built using Vanillajs with both Bootstrap and Expressjs running on Nodejs. Our chosen RDBMS is SQLite. We hope to show the importance of observing good security practices during development by demonstrating the potential for exploitation when an application is not hardened against these common attack vectors.

## Objective
The goal of this project is to understand how certain exploits affect a system and their mechanisms of action. Once the mechanism of action is determined then we can design a solution to mitigate potential attacks. This will be showcased through a web site that acts as a gallery of exploits and their solutions. Ten types of attacks will be covered:

Injection (SQL, HTML, iFrame, SSI, XML, LDAP, SMTP, etc.)
Broken Auth (session hijacking, brute force, etc.)
Sensitive data exposure (stealing password hashes for stretch goal could go here)
XML external entities (XXE)
Broken access control
Security misconfiguration
Cross-site scripting (XSS)
Insecure deserialization
Using components with known vulnerabilities
Insufficient logging and monitoring

Additionally, we will be demonstrating how a bad actor might conduct a cryptographic attack on data exfiltrated from a compromised web application. This will further demonstrate the need for a tiered approach to security; stop-gap, midterm, and long-term solutions will be discussed briefly at the end of this project


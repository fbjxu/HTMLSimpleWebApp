from flask import Flask, redirect, render_template, request, url_for, session
import requests

app = Flask(__name__)

#TODO: corner case when user does not input correct ticker or user do not provide any input

@app.route('/', methods = ["POST", "GET"])
def hello():
    responseOutlookDict = {}
    responseSummaryList = {}

    if request.method == "POST":
        symbol = request.form['nm']
        headers = {
            'Content-Type': 'application/json',
            'Authorization' : 'Token a4d9cb249227d4a1c64fac98783787069f17c866'
        }
        # get request
        if symbol != "":
            outlookResponse = requests.get("https://api.tiingo.com/tiingo/daily/"+symbol, headers=headers)
            summaryResponse = requests.get("https://api.tiingo.com/iex/"+symbol, headers=headers)
            #convert received request to json
            responseOutlookDict = outlookResponse.json()  
            responseSummaryList = summaryResponse.json()[0]
    return render_template("hello.html", outlook = responseOutlookDict, summary = responseSummaryList)


if __name__ == "__main__":
    app.run()
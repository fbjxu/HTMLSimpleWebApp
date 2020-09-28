from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from pytz import timezone, utc
import datetime
from dateutil.relativedelta import relativedelta
import requests
application = Flask(__name__)
CORS(application)

token = "a4d9cb249227d4a1c64fac98783787069f17c866"

headers = {
            'Content-Type': 'application/json',
            'Authorization' : 'Token a4d9cb249227d4a1c64fac98783787069f17c866'
        }
outlookResponse = {}

@application.route('/', methods = ["POST", "GET"])
def index():
    return application.send_static_file("index.html")

@application.route('/api/stockName', methods = ["GET"])
def stockName():
    symbol = request.args.get('symbol', default = "msft")
    now = datetime.datetime.now(tz=utc) # get current time
    now = now.astimezone(timezone('US/Pacific')) # set now to PST
    today_date = f"{now.year}-{now.month}-{now.day}"
    res = [symbol, today_date]
    return json.dumps(res)

@application.route('/api/outlook', methods = ["GET"])
def outlook():
    symbol = request.args.get('symbol', default = "undetermined")
    if symbol != "":
        outlookResponse = requests.get("https://api.tiingo.com/tiingo/daily/"+symbol, headers=headers)
    return jsonify(outlookResponse.json())

@application.route('/api/summary', methods = ["GET"])
def summary():
    symbol = request.args.get('symbol', default = "undetermined")
    if symbol != "":
        summaryResponse = requests.get("https://api.tiingo.com/iex/"+symbol+"?token=a4d9cb249227d4a1c64fac98783787069f17c866")
    return jsonify(summaryResponse.json())

@application.route('/api/chart', methods = ["GET"])
def chart():
    symbol = request.args.get('symbol', default = "undetermined")
    if symbol != "":
        now = datetime.datetime.now(tz=utc) # get current time
        now = now.astimezone(timezone('US/Pacific')) # set now to PST
        startDate_date = (now + relativedelta(months=-6))
        startDate = f"{startDate_date.year}-{startDate_date.month}-{startDate_date.day}"
        chartResponse = requests.get("https://api.tiingo.com/iex/"+symbol+"/prices?token="+token+"&startDate="+startDate+"&resampleFreq=12hour&columns=open,high,low,close,volume")
    return jsonify(chartResponse.json())

if __name__ == "__main__":
    application.run(debug=True)
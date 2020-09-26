from flask import Flask, request, jsonify
import requests
stockName = ''

app = Flask(__name__)
headers = {
            'Content-Type': 'application/json',
            'Authorization' : 'Token a4d9cb249227d4a1c64fac98783787069f17c866'
        }
outlookResponse = {}

@app.route('/', methods = ["POST", "GET"])
def index():
    return app.send_static_file("index.html")

@app.route('/api/stockName', methods = ["GET"])
def stockName():
    symbol = request.args.get('symbol', default = "msft")
    return symbol

@app.route('/api/outlook', methods = ["GET"])
def outlook():
    symbol = request.args.get('symbol', default = "undetermined")
    if symbol != "":
        outlookResponse = requests.get("https://api.tiingo.com/tiingo/daily/"+symbol, headers=headers)
    return jsonify(outlookResponse.json())

@app.route('/api/summary', methods = ["GET"])
def summary():
    symbol = request.args.get('symbol', default = "undetermined")
    if symbol != "":
        summaryResponse = requests.get("https://api.tiingo.com/iex/"+symbol+"?token=a4d9cb249227d4a1c64fac98783787069f17c866")
    return jsonify(summaryResponse.json())

if __name__ == "__main__":
    app.run()
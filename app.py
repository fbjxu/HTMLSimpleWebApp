from flask import Flask, redirect, render_template, request

app = Flask(__name__)

@app.route('/', methods = ["POST", "GET"])
def hello():
    if request.method == "POST":
        user = request.form["nm"]
        return redirect(url_for("user", usr=user))
    else:
        return render_template("hello.html")
    

@app.route("/<usr>")
def user(usr):
    return f"<h1>{usr}</h1?"

if __name__ == "__main__":
    app.run()
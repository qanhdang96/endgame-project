from flask import Flask, render_template, redirect, send_file, jsonify
from flask_pymongo import pymongo
from functions import getRidOfId
import time
import tweets
import os

app = Flask(__name__)

conn = "mongodb://localhost:27017/endgame_project"
client = pymongo.MongoClient(conn)

@app.route('/')
def index():

    return render_template("index.html")


#function to render aus_maps in the index.html
@app.route('/templates/aus_map.html')
def show_map():

    return send_file('templates/aus_map.html')

@app.route("/grabtweets")
def grabtweets():
    tweets_info = client.db.tweets_info
    tweets_data = tweets.scrape_tweets()
    tweets_info.update({}, tweets_data, upsert=True)
    return redirect("/", code=302)


@app.route('/templates/tweets.html')
def show_tweets():

    return send_file("tweets.html")


@app.route('/templates/entertainment.html')
def show_ent():

    return send_file('templates/entertainment.html')


@app.route('/templates/boundary.html')
def show_liq():

    return send_file('templates/boundary.html')


if __name__ == "__main__":
    app.run()



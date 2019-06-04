from flask import Flask, render_template, jsonify, redirect, send_file, request
from flask_pymongo import pymongo
from functions import getRidOfId
import os

app = Flask(__name__)

conn = "mongodb://localhost:27017/endgame_project"
client = pymongo.MongoClient(conn)

app.route('/')
def index():

    return render_template("index.html")


#function to render aus_maps in the index.html
app.route('/templates/aus_map.html')
def show_map():

    return send_file('templates/aus_map.html')

app.route('/grabtweets')
def grabtweets():
    import time
    from nightlifetweets import getTweets
    
    nighttweets = getTweets()

    for x in nighttweets:
        mongo.db.nightlife.replace_one(x, x, upsert=True)
    print('tweets added')
    time.sleep(3)

    tweets = getRidOfId(mongo.db.nightlife.find())
    return jsonify(tweets)


app.route('/templates/tweets.html')
def show_tweets():

    return send_file('templates/tweets.html')


app.route('/templates/entertainment.html')
def show_ent():

    return send_file('templates/entertainment.html')


app.route('/templates/boundary.html')
def show_liq():

    return send_file('templates/boundary.html')


if __name__ == "__main__":
    app.run(debug=True)



from flask import Flask, render_template, jsonify, redirect, send_file, request
from flask_pymongo import PyMongo
from functions import getRidOfId
import os

MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017/";


aus_dashboard = Flask(__name__)

aus_dashboard.config['MONGO_URI'] = MONGO_URL
mongo = PyMongo(aus_dashboard)

@aus_dashboard.route('/')
def index():

    return render_template("index.html")


#function to render dc_maps in the index.html
@aus_dashboard.route('/templates/aus_map.html')
def show_map():

    return send_file('templates/aus_map.html')

@aus_dashboard.route('/grabtweets')
def grabtweets():
    # import time
    from nightlifetweets import getTweets
    
    nighttweets = getTweets()

    for x in nighttweets:
        mongo.db.nightlife.replace_one(x, x, upsert=True)
    print('tweets added')
    # time.sleep(3)

    tweets = getRidOfId(mongo.db.nightlife.find())
    return jsonify(tweets)


@aus_dashboard.route('/templates/tweets.html')
def show_tweets():

    return send_file('templates/tweets.html')


@aus_dashboard.route('/templates/entertainment.html')
def show_ent():

    return send_file('templates/entertainment.html')


@aus_dashboard.route('/templates/boundary.html')
def show_liq():

    return send_file('templates/boundary.html')


if __name__ == "__main__":
    aus_dashboard.run()



import pandas as pd
import tweepy
from tweepy import OAuthHandler
import config
from config import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET
import os

def getTweets():
    
    auth = tweepy.OAuthHandler(config.CONSUMER_KEY, config.CONSUMER_SECRET)
    auth.set_access_token(config.ACCESS_TOKEN, config.ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

    target_terms = ["@ElysiumAustin", "@BarbarellaATX", "@VAustinTX",
                   "@KingdomAustin", "@yardbar","@ClubVulcanATX", "@CliveBarATX",
                   "@IrenesATX", "@MaggieMaesATX", "@TheTownsendATX", "@PubCrawlerATX",
                   "@ShakespearesATX", "@ATX_Nightlife", "@NightCultureATX", "@ElephantRoomATX", "@Austin6thStreet"]

    bar = []
    tweet_text = []
    date = []

    for target in target_terms:
        print(f'grabbing {target}')

        oldest_tweet = None

        for x in range(1):

            public_tweets = api.search(target, count=2, result_type="recent", max_id=oldest_tweet)
            print('public tweets')

            for tweet in public_tweets["statuses"]:
                bar.append(target)
                tweet_text.append(tweet['text'])
                date.append(tweet['created_at'])
                oldest_tweet = tweet["id"] - 1
            print(tweet)


    nightlife_df=pd.DataFrame({"Bar": bar,
                              "Tweet": tweet_text,
                              "Date": date})

    nightlifetweets=nightlife_df.to_dict('records')
    
    return nightlifetweets

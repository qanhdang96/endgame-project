from flask import Flask, render_template, redirect, send_file, jsonify
from functions import getRidOfId
import os

app = Flask(__name__)


@app.route('/')
def index():

    return render_template("index.html")


#function to render aus_maps in the index.html
@app.route('/templates/aus_map.html')
def show_map():

    return send_file('templates/aus_map.html')



@app.route('/templates/entertainment.html')
def show_ent():

    return send_file('templates/entertainment.html')


@app.route('/templates/boundary.html')
def show_liq():

    return send_file('templates/boundary.html')


if __name__ == "__main__":
    app.run()



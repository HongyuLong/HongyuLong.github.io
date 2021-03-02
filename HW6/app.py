from flask import Flask, jsonify
import requests
import json

# create Flask's app
app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

api_key = 'ee187b6fc0dfb521936ace68e072031c'

@app.route('/style.css')
def upload_css():
    return app.send_static_file('style.css')

@app.route('/funcs.js')
def upload_js():
    return app.send_static_file('funcs.js')

@app.route('/')
def index():
    return app.send_static_file('HW6_home.html')

@app.route('/app/filter')
def filter_info(rsp_ls, num, keys):
    items = []
    for i in range(num):
        item = {}
        for key in keys:
            item[key] = rsp_ls[i][key]
        items.append(item)
    return items
   

@app.route('/app/home/movie')
def load_trending_movies():
    url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + api_key
    #url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=97588ddc4a26e3091152aa0c9a40de22'
    response = requests.get(url=url)
    if response.status_code == 200:
        rsp = response.json()
        res_list = rsp['results']
        keys = ['title', 'backdrop_path', 'release_date']
        return jsonify(filter_info(res_list, 5, keys))
    return None

@app.route('/app/home/tv')
def load_tv_airing_today():
    url = 'https://api.themoviedb.org/3/tv/airing_today?api_key=' + api_key
    response = requests.get(url=url)
    if response.status_code == 200:
        rsp = response.json()
        res_list = rsp['results']
        keys = ['name', 'backdrop_path', 'first_air_date']
        return jsonify(filter_info(res_list, 5, keys))
    return None

'''
@app.route('app/search/fill')
def do_valid_fill():
    return True
'''

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
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

@app.route('/app/search/cards')
def load_search_result():
    keyword = request.args.get('key')
    category = request.args.get('cat')
    items = []
    keys_mv = ['id', 'title', 'overview', 'poster_path', 'release_date', 'vote_average', 'vote_count', 'genre_ids']
    keys_tv = ['id', 'name', 'overview', 'poster_path', 'first_air_date', 'vote_average', 'vote_count', 'genre_ids']
    if category == 'cat_mv':
        url = 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + keyword + '&language=en-US&page=1&include_adult=false'
        response = requests.get(url=url)
        if response.status_code == 200:
            rsp = response.json()
            results = rsp['results']
            for i in range(len(results)):
                item = {}
                for key in keys_mv:
                    item[key] = results[i][key]
                item['media_type'] = 'movie'
                items.append(item)
    elif category == 'cat_tv':
        url = 'https://api.themoviedb.org/3/search/tv?api_key=' + api_key + '&language=en-US&page=1&query=' + keyword + '&include_adult=false'
        response = requests.get(url=url)
        if response.status_code == 200:
            rsp = response.json()
            results = rsp['results']
            for i in range(len(results)):
                item = {}
                for key in keys_tv:
                    item[key] = results[i][key]
                item['media_type'] = 'tv'
                items.append(item)
    elif category == 'cat_both':
        url = 'https://api.themoviedb.org/3/search/multi?api_key=' + api_key + '&language=en-US&query=' + keyword + '&page=1&include_adult=false'
        response = requests.get(url=url)
        if response.status_code == 200:
            rsp = response.json()
            results = rsp['results']
            for i in range(len(results)):
                item = {}
                if results[i]['media_type'] == 'movie':
                    for key in keys_mv:
                        item[key] = results[i][key]
                    item['media_type'] = 'movie'
                    items.append(item)
                else:
                    for key in keys_tv:
                        item[key] = results[i][key]
                    item['mdedia_type'] = 'tv'
                    items.append(item)
    return jsonify(items)

@app.route('/app/search/popup')
def load_popup():
    media_id = request.args.get('media_id')
    media_type = request.args.get('media_type')
    info = {}
    # 1. details
    #details = {}
    details_key_mv = ['id', 'title', 'overview', 'release_date', 'spoken_languages', 'vote_average', 'vote_count', 'backdrop_path', 'genres']
    details_key_tv = ['id', 'name', 'overview', 'first_air_date', 'spoken_languages', 'vote_average', 'vote_count', 'backdrop_path', 'genres']
    if media_type == 'movie':
        url1 = 'https://api.themoviedb.org/3/movie/' + media_id + '?api_key=' + api_key + '&language=en-US'
    else:
        url1 = 'https://api.themoviedb.org/3/tv/' + media_id + '?api_key=' + api_key + '&language=en-US'
    response1 = requests.get(url=url1)
    if response1.status_code == 200:
        rsp1 = response1.json()
        if media_type == 'movie':
            for key in details_key_mv:
                if key == 'genres':
                    genres = ''
                    for i in range(len(rsp1[key])):
                        genres = rsp1[key][i]['name'] if i == 0 else genres + ',' + rsp1[key][i]['name']
                    if len(genres) == 0:
                        genres = 'N/A'
                    info['genres'] = genres
                elif key == 'spoken_languages':
                    languages = ''
                    for i in range(len(rsp1[key])):
                        languages = rsp1[key][i]['english_name'] if i == 0 else languages + ',' + rsp1[key][i]['english_name']
                    info['spoken'] = languages
                elif key == 'release_date':
                    info['date'] = rsp1[key][:4] if len(rsp1[key]) > 3 else 'N/A'
                else:
                    info[key] = rsp1[key]
        else:
            for key in details_key_tv:
                if key == 'genres':
                    genres = ''
                    for i in range(len(rsp1[key])):
                        genres = rsp1[key][i]['name'] if i == 0 else genres + ',' + rsp1[key][i]['name']
                    if len(genres) == 0:
                        genres = 'N/A'
                    info['genres'] = genres
                elif key == 'spoken_languages':
                    languages = ''
                    for i in range(len(rsp1[key])):
                        languages = rsp1[key][i]['english_name'] if i == 0 else languages + ',' + rsp1[key][i]['english_name']
                    info['spoken'] = languages
                elif key == 'first_air_date':
                    info['date'] = rsp1[key][:4] if len(rsp1[key]) > 3 else 'N/A'
                elif key == 'name':
                    info['title'] = rsp1[key]
                else:
                    info[key] = rsp1[key]
    # detailt's key: 'id', 'title', 'overview', 'date', 'spoken', 'vote_average', 'vote_count', 'backdrop_path', 'genres'
    # 2. credits
    credits = []
    credits_key = ['name', 'profile_path', 'character']
    if media_type == 'movie':
        url2 = 'https://api.themoviedb.org/3/movie/' + media_id + '/credits?api_key=' + api_key + '&language=en-US'
    else:
        url2 = 'https://api.themoviedb.org/3/tv/' + media_id + '/credits?api_key=' + api_key + '&language=en-US'
    response2 = requests.get(url=url2)
    if response2.status_code == 200:
        rsp2 = response2.json()
        r_ls = rsp2['cast']
        for i in range(min(len(r_ls), 8)):
            credit = {}
            for key in credits_key:
                credit[key] = r_ls[i][key]
            credits.append(credit)

    info['credits'] = credits
    # 3. reviews
    reviews = []
    #reviews_key = ['username', 'content', 'rating', 'created_at']
    if media_type == 'movie':
        url3 = 'https://api.themoviedb.org/3/movie/' + media_id + '/reviews?api_key=' + api_key + '&language=en-US&page=1'
    else:
        url3 = 'https://api.themoviedb.org/3/tv/' + media_id + '/reviews?api_key=' + api_key + '&language=en-US&page=1'
    response3 = requests.get(url=url3)
    if response3.status_code == 200:
        rsp3 = response3.json()
        r_ls = rsp3['results']
        for i in range(min(len(r_ls), 5)):
            review = {}
            review['username'] = r_ls[i]['author_details']['username']
            review['rating'] = r_ls[i]['author_details']['rating']
            review['content'] = r_ls[i]['content']
            review['created_at'] = r_ls[i]['created_at'][5:7] + '/' + r_ls[i]['created_at'][8:10] + '/' + r_ls[i]['created_at'][:4]
            #print(review)
            reviews.append(review)
    info['reviews'] = reviews
    return jsonify(info)

if __name__ == '__main__':
    app.run(debug=True)

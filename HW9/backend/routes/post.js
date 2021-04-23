const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = 'ee187b6fc0dfb521936ace68e072031c';

const head_url = 'https://api.themoviedb.org/3/';
const tail_url = '&language=en-US&page=1'; 

router.get('/home/:media_type', (req, res) => {
    console.log('req.params.media_type = ', req.params.media_type);
    const media_type = req.params.media_type;
    if(media_type == 'movie') {
        var url_now_playing = head_url + media_type + '/now_playing?api_key=' + API_KEY + tail_url;
    }
    else {
        var url_now_playing = head_url + media_type + '/airing_today?api_key=' + API_KEY + tail_url;
    }
    var url_top_rated = head_url + media_type + '/top_rated?api_key=' + API_KEY + tail_url;
    var url_popular = head_url + media_type + '/popular?api_key=' + API_KEY + tail_url;

    axios.all([
        axios.get(url_now_playing),
        axios.get(url_top_rated),
        axios.get(url_popular)
    ])
    .then(responseArr => {
        res.json({
            'now_playing' : filterNowPlaying(media_type, responseArr[0].data.results),
            'top_rated' : filterTopRated(media_type, responseArr[1].data.results),
            'popular' : filterTopRated(media_type, responseArr[2].data.results)
        })
    })
    .catch(error => {
        console.log(error);
    })
});

function filterNowPlaying(media_type, results) {
    var items = [];
    for(let i = 0; i < 5; ++i) {
        var item = {};
        item['id'] = results[i].id;
        item['title'] = media_type == 'tv' ? results[i].name : results[i].title;
        if(results[i].poster_path == null) {
            item['poster_path'] = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/movie_placeholder.png";
        }
        else {
            item['poster_path'] = 'https://image.tmdb.org/t/p/w500' + results[i].poster_path;
        }
        item['year'] = getYear(media_type, results[i])
        items.push(item);
    }
    return items;
}

function getYear(media_type, result) {
    let year = null;
    if(media_type == 'tv') {
        if(result.hasOwnProperty('first_air_date') && result['first_air_date'] != "") {
            year = result['first_air_date'].substr(0, 4);
        }
    }
    else {
        if(result.hasOwnProperty('release_date') && result['release_date'] != "") {
            year = result['release_date'].substr(0, 4);
        }
    }
    return year
}

function filterTopRated(media_type, results) {
    if(results.length == 0) {return null;}
    var items = [];
    for(let i = 0; i < 20 && i < results.length; ++i) {
        var item = {};
        item['id'] = results[i].id;
        item['title'] = media_type == 'tv' ? results[i].name : results[i].title;
        if(results[i].poster_path == null) {
            item['poster_path'] = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/movie_placeholder.png";
        }
        else {
            item['poster_path'] = 'https://image.tmdb.org/t/p/w500' + results[i].poster_path;
        }
        item['year'] = getYear(media_type, results[i]);
        items.push(item);
    }
    return items;
}


router.get('/watch/:media_type/:id', (req, res)=>{
    console.log('req.params.media_type = ', req.params.media_type);
    console.log('req.params.id = ', req.params.id);
    let url_video = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '/videos?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_details = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_reviews = 'https://api.themoviedb.org/3/' + req.params.media_type + '/'  + req.params.id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_casts = 'https://api.themoviedb.org/3/' + req.params.media_type + '/'   + req.params.id + '/credits?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_recommended = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '/recommendations?api_key=' + API_KEY + '&language=en-US&page=1';
    if(req.params.media_type == 'movie') {
        var media_keys = ['id', 'title', 'poster_path'];
    }
    else {
        var media_keys = ['id', 'name', 'poster_path'];
    }

    axios.all([
        axios.get(url_video),
        axios.get(url_details),
        axios.get(url_reviews),
        axios.get(url_casts),
        axios.get(url_recommended),
    ])
    .then(responseArr => {
        //console.log(media_keys);
        res.json({
            'video': filterVideo(responseArr[0].data.results),
            'details': filterDetails(req.params.media_type, responseArr[1].data),
            'reviews' : filterReviews(responseArr[2].data.results),
            'casts' : filterCasts(responseArr[3].data.cast),
            'recommended' : filterTopRated(req.params.media_type, responseArr[4].data.results)
        })
    })
    .catch(error => {
        console.log(error);
    })
});

function filterVideo(results) {
    let flag = false;
    var item = {};
    for(let i = 0; i < results.length; ++i) {
        if(results[i].site != 'YouTube' || results[i].type != 'Trailer' || results[i].key == '')  {continue;}
        item['site'] = 'YouTube';
        item['type'] = 'Trailer';
        item['name'] = results[i].name;
        item['key'] = 'https://www.youtube.com/watch?v=' + results[i].key;
        flag = true;  // get a valid data
        break;
    }
    return flag ? item : null;
}

function filterDetails(media_type, results) {
    let item = {};
    let genres_str = '';
    let lang_str = '';
    if(media_type == 'movie') {
        item['title'] = results['title'];
    }
    else {
        item['title'] = results['name'];
    }
    
    for(let i = 0; i < results['genres'].length; ++i) {
        if(i > 0) {
            genres_str = genres_str + ',';
        }
        genres_str = genres_str + results['genres'][i]['name'];
    }
    item['genres'] = genres_str.length > 0 ? genres_str : null;

    for(let i = 0; i < results['spoken_languages'].length; ++i) {
        if(i > 0) {
            lang_str = lang_str + ',';
        }
        lang_str = lang_str + results['spoken_languages'][i]['english_name'];
    }
    item.spoken_languages = lang_str.length > 0 ? lang_str : null;
    item['year'] = getYear(media_type, results);
    item['overview'] = results['overview'];
    item['vote_average'] = results['vote_average'];

    if(results['poster_path'] == null) {
        item['poster_path'] = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/movie_placeholder.png";
    }
    else {
        item['poster_path'] = 'https://image.tmdb.org/t/p/w500' + results['poster_path'];
    }
    return item;
}

function filterCasts(results) {
    if(results.length == 0) {return null;}
    var casts = [];
    for(let i = 0; i < results.length && i < 10; ++i) {
        var cast = {};
        cast['id'] = results[i]['id'];
        cast['name'] = results[i]['name'];
        cast['character'] = results[i]['character'];
        if(results[i]['profile_path'] == null ) {
            cast['profile_path'] = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/cast_placeholder.png";
        }
        else {
            cast['profile_path'] = 'https://image.tmdb.org/t/p/w500/' + results[i]['profile_path'];
        }
        casts.push(cast);
        //console.log(cast);
    }
    return casts;
}

function filterReviews(results) {
    if(results.length == 0) {
        return null;
    }
    var reviews = [];
    for(let i = 0; i < 3 && i < results.length; ++i) {
        var review = {};
        review['author'] = results[i]['author'];
        review['content'] = results[i]['content'];
        review['rating'] = results[i]['author_details']['rating'];
        //console.log(results[i]['created_at']);
        let month_num = results[i]['created_at'].substr(5, 2);
        let month_dict = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'};
        let created_str = month_dict[month_num] + ' ' + results[i]['created_at'].substr(8, 2) + ', ' + results[i]['created_at'].substr(0, 4);
        review['created_at'] = created_str;
        reviews.push(review);
    }
    return reviews;
}

router.get('/shared/images', (req, res) => {
    res.json({
        'twitter' : 'http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/twitter.png',
        'facebook' : 'http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/facebook-app-symbol.png',
        'appicon' : 'http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/static/images/AppIcon.png'
    })
})

router.get('/search/:query', (req, res)=>{
    let url_search = 'https://api.themoviedb.org/3/search/multi?api_key=' + API_KEY + '&language=enUS&query=' + req.params.query;
    axios.get(url_search)
        .then(response=>{
            let results = response.data.results;
            let items = [];

            for(let i = 0, j = 0; i < results.length && j < 7; ++i) {
                if(results[i]['backdrop_path'] == null || results[i]['media_type'] == 'person') {
                    continue;
                }
                let item = {};
                item['id'] = results[i]['id'];
                item['media_type'] = results[i]['media_type'];
                item['backdrop_path'] = 'https://image.tmdb.org/t/p/w500' + results[i]['backdrop_path'];
                if(results[i]['media_type'] == 'tv') {
                    item['title'] = results[i]['name'];
                    item['year'] = getYear(results[i]['media_type'], results[i]);
                }
                else {
                    item['title'] = results[i]['title'];
                    item['year'] = getYear(results[i]['media_type'], results[i]);
                }
                item['vote_average'] = results[i].vote_average;
                items.push(item);
                j++;
            }
            res.json(items);
        })
        .catch(error => {
            console.log(error);
        })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = 'ee187b6fc0dfb521936ace68e072031c';

router.get('/', (req, res) => {
    let url_now_playing = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&language=en-US&page=1';  // currently playing movies
    let url_pop_mv = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=en-US&page=1';  // popular movies
    let url_top_mv = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + API_KEY + '&language=en-US&page=1';  // top rated movies
    let url_trending_mv = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY;  // trending movies
    
    let url_pop_tv = 'https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY + '&language=en-US&page=1';  // popular tv shows
    let url_top_tv = 'https://api.themoviedb.org/3/tv/top_rated?api_key=' + API_KEY + '&language=en-US&page=1';  // top rated tv shows
    let url_trending_tv = 'https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY;  // trending tv shows
    

    axios.all([
        axios.get(url_now_playing),
        axios.get(url_pop_mv), axios.get(url_top_mv), axios.get(url_trending_mv),
        axios.get(url_pop_tv), axios.get(url_top_tv), axios.get(url_trending_tv)
    ])
    .then(responseArr => {
        res.json({
            'now_playing' : filter(['id', 'title', 'backdrop_path', 'poster_path'], responseArr[0].data.results, 5, false),
            'pop_mv' : filter(['id', 'title', 'poster_path'], responseArr[1].data.results, responseArr[1].data.results.length, true),
            'top_mv' : filter(['id', 'title', 'poster_path'], responseArr[2].data.results, responseArr[2].data.results.length, true),
            'trending_mv' : filter(['id', 'title', 'poster_path'], responseArr[3].data.results, responseArr[3].data.results.length, true),
            'pop_tv' : filter(['id', 'name', 'poster_path'], responseArr[4].data.results, responseArr[4].data.results.length, true),
            'top_tv' : filter(['id', 'name', 'poster_path'], responseArr[5].data.results, responseArr[5].data.results.length, true),
            'trending_tv' : filter(['id', 'name', 'poster_path'], responseArr[6].data.results, responseArr[6].data.results.length, true)
        })
    })
    .catch(error => {
        console.log(error);
    })
});

function filter(keys, results, n, flag) {
    //console.log(results);
    var items = []
    for(let i = 0; i < n;) {
        if(results[i].hasOwnProperty('poster_path') && results[i].poster_path == null) {
            i++;
            continue;
        }
        var item = {}
        //keys.forEach(element => {item[element] = results[i][element]});
        for(let j = 0; j < keys.length; ++j) {
            let key = keys[j];
            if(key == 'name') {
                item['title'] = results[i][key];
            }else {
                item[key] = results[i][key];
            }
        }
        //console.log(item);
        items.push(item);
        i++;
    }

    if(flag) {
        var grouped_items = [];
        for(let i = 0, j = -1; i < items.length; ++i) {
            if(i % 6 == 0) {
                j++;
                grouped_items[j] = []
                grouped_items[j].push(items[i]);
            }
            else {
                grouped_items[j].push(items[i]);
            }
        }
        return {'single' : items, 'grouped': grouped_items};
    } else {
        return items;
    }
}


router.get('/watch/:media_type/:id', (req, res)=>{
    console.log('req.params.media_type = ', req.params.media_type);
    console.log('req.params.id = ', req.params.id);
    let url_video = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '/videos?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_details = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_reviews = 'https://api.themoviedb.org/3/' + req.params.media_type + '/'  + req.params.id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_casts = 'https://api.themoviedb.org/3/' + req.params.media_type + '/'   + req.params.id + '/credits?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_recommended = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '/recommendations?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_similar = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.id + '/similar?api_key=' + API_KEY + '&language=en-US&page=1';
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
        axios.get(url_similar)
    ])
    .then(responseArr => {
        //console.log(media_keys);
        res.json({
            'video': filterVideo(['site', 'type','name', 'key'], responseArr[0].data.results),
            'details': filterDetails(req.params.media_type, responseArr[1].data),
            'reviews' : filterReviews(responseArr[2].data.results),
            'casts' : filterCasts(responseArr[3].data.cast),
            'recommended': filter(media_keys, responseArr[4].data.results, responseArr[4].data.results.length, true),
            'similar': filter(media_keys, responseArr[5].data.results, responseArr[5].data.results.length, true),
            'has_recommended': responseArr[4].data.results.length > 0,
            'has_similar': responseArr[5].data.results.length > 0,
        })
    })
    .catch(error => {
        console.log(error);
    })
});
function filterCasts(results) {
    var casts = [];
    for(let i = 0; i < results.length; ++i) {
        if(results[i]['profile_path'] == null) { continue;}
        var cast = {};
        cast['id'] = results[i]['id'];
        cast['name'] = results[i]['name'];
        cast['character'] = results[i]['character'];
        cast['profile_path'] = 'https://image.tmdb.org/t/p/w500/' + results[i]['profile_path'];
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
    for(let i = 0; i < 10 && i < results.length; ++i) {
        var review = {};
        review['author'] = results[i]['author'];
        review['content'] = results[i]['content'];
        review['url'] = results[i]['url'];
        if(results[i]['author_details']['rating'] == null) {
            review['rating'] = 0;
        }
        else {
            review['rating'] = results[i]['author_details']['rating'];
        }
        
        if(results[i]['author_details']['avatar_path'] == null) {
            review['avatar_path'] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU';
        }
        else {
            if(results[i]['author_details']['avatar_path'].includes("https://secure.gravatar.com")) {
                review['avatar_path'] = results[i]['author_details']['avatar_path'].substr(1);
            }
            else {
                review['avatar_path'] = 'https://image.tmdb.org/t/p/original' + results[i]['author_details']['avatar_path'];
            }
        }
        //console.log(results[i]['created_at']);
        let month_num = results[i]['created_at'].substr(5, 2);
        let month_dict = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'};
        let current_str = '';
        let hrs_num = parseInt(results[i]['created_at'].substr(11, 2));
        if(hrs_num > 0 && hrs_num <= 12) {
            current_str = '' + hrs_num;
        }
        else if(hrs_num > 12 && hrs_num < 24) {
            current_str = '' + (hrs_num - 12);
        }
        else {
            current_str = '12';
        }

        current_str = current_str + results[i]['created_at'].substr(13, 6);
        if(hrs_num < 12 || hrs_num == 24) {
            current_str = current_str + ' AM';
        }
        else {
            current_str = current_str + ' PM';
        }
        let created_str = month_dict[month_num] + ' ' + results[i]['created_at'].substr(8, 2) + ', ' + results[i]['created_at'].substr(0, 4) + ', ' + current_str;
        review['created_at'] = created_str;
        reviews.push(review);
    }
    return reviews;
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
    item.genres = genres_str.length > 0 ? genres_str : null;

    for(let i = 0; i < results['spoken_languages'].length; ++i) {
        if(i > 0) {
            lang_str = lang_str + ',';
        }
        lang_str = lang_str + results['spoken_languages'][i]['english_name'];
    }
    item.spoken_languages = lang_str.length > 0 ? lang_str : null;

    if(media_type == 'movie') {
        item['year'] = results['release_date'].substr(0, 4);
        item['runtime'] = (results['runtime'] == null) ? null : getRuntimeFormatted(results['runtime']);
    }
    else {
        item['year'] = results['first_air_date'].substr(0, 4);
        item['runtime'] = (results['episode_run_time'] == null) ? null : getRuntimeFormatted(results['episode_run_time']);
    }
    item['overview'] = results['overview'];
    item['vote_average'] = results['vote_average'];
    item['tagline'] = (results['tagline'] == null || results['tagline'].length == 0) ? null  : results['tagline'];
    item['poster_path'] = results['poster_path'];

    return item;
}
function filterVideo(keys, results) {
    if(results.length == 0) {
        return {'site': 'YouTube', 'type': 'Trailer', 'name': 'CSCI 571 HW8', 'key': 'tzkWB85ULJY'};
    }
    let flag = false;
    var item = {};
    for(let i = 0; i < results.length; ++i) {
        if(results[i].site != 'YouTube')  {continue;}
        keys.forEach(element => {item[element] = results[i][element]});
        if(item.key == null) {
            item.key = 'tzkWB85ULJY';
        }
        flag = true;  // get a valid data
        break;
    }
    if(flag) {
        return item;
    }
    else {
        return {'site': 'YouTube', 'type': 'Trailer', 'name': 'CSCI 571 HW8', 'key': 'tzkWB85ULJY'};
    }
}

function getRuntimeFormatted(runtime) {
    if(runtime < 60) {
        return runtime + 'mins';
    }
    else {
        let hrs = Math.floor(runtime / 60);
        let mins = runtime % 60;
        return hrs + 'hrs ' + mins + 'mins';
    }
}


router.get('/cast/:person_id', (req, res) => {
    //console.log('req.params.person_id = ', req.params.person_id);
    let url_person = 'https://api.themoviedb.org/3/person/' + req.params.person_id + '?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_external = 'https://api.themoviedb.org/3/person/' + req.params.person_id + '/external_ids?api_key='+ API_KEY + '&language=en-US&page=1';

    axios.all([
        axios.get(url_person),
        axios.get(url_external)
    ])
    .then(responseArr => {
        res.json(filterCastInfo(responseArr[0].data, responseArr[1].data));
        //console.log(responseArr[0].data)
    })
    .catch(error => {
        console.log(error);
    })
});

function filterCastInfo(results1, results2) {
    let modal={};
    // details
    modal['name'] = results1.name;
    modal['profile_path'] = 'https://image.tmdb.org/t/p/w500/' + results1.profile_path;
    modal['birthday'] = results1.birthday;
    modal['place_of_birth'] = results1['place_of_birth'];
    modal['homepage'] = results1['homepage'];
    if(results1['gender'] == 1) {
        modal['gender'] = 'Female';
    }
    else if(results1['gender'] == 2){
        modal['gender'] = 'Male';
    }
    modal['known_for_department'] = results1['known_for_department'];
    let also_know_str = '';
    for(let i = 0; i < results1['also_known_as'].length; ++i) {
        if(i > 0) {
            also_know_str = also_know_str + ',';
        }
        also_know_str = also_know_str + results1['also_known_as'][i];
    }
    modal['also_known_as'] = also_know_str;
    //modal['also_known_as'] = results1['also_known_as'];
    modal['biography'] = results1['biography'];
    // external
    modal['imdb_id'] = (results2['imdb_id'] == null || results2['imdb_id'].length == 0) ? null : 'https://www.imdb.com/name/' + results2['imdb_id'];
    modal['facebook_id'] = (results2['facebook_id'] == null || results2['facebook_id'].length == 0) ? null : 'https://www.facebook.com/' + results2['facebook_id'];
    modal['twitter_id'] = (results2['twitter_id'] == null || results2['twitter_id'].length == 0) ? null : 'https://twitter.com/' + results2['twitter_id'];
    modal['instagram_id'] = (results2['instagram_id'] == null || results2['instagram_id'].length == 0) ? null : 'https://www.instagram.com/' + results2['instagram_id'];
    //console.log(modal);
    return modal;
}


router.get('/search/:query', (req, res)=>{
    let url_search = 'https://api.themoviedb.org/3/search/multi?api_key=' + API_KEY + '&language=enUS&query=' + req.params.query;
    axios.get(url_search)
        .then(response=>{
            let results = response.data.results;
            let items = [];

            for(let i = 0, j = 0; i < results.length && j < 7; ++i) {
                if(results[i]['backdrop_path'] == null || results[i]['poster_path'] == null || results[i]['media_type'] == 'person') {
                    continue;
                }
                let item = {};
                item['id'] = results[i]['id'];
                item['media_type'] = results[i]['media_type'];
                item['backdrop_path'] = 'https://image.tmdb.org/t/p/w500' + results[i]['backdrop_path'];
                if(results[i]['media_type'] == 'tv') {
                    item['title'] = results[i]['name'];
                }
                else {
                    item['title'] = results[i]['title'];
                }
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
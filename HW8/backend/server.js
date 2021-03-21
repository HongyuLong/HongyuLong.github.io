const express = require('express');
const axios = require('axios');
const app = express();

const port = 3000;

const API_KEY = 'ee187b6fc0dfb521936ace68e072031c';

app.get('/', (req, res) => {
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
        // var filter_results = {}
        // filter_results.now_playing = filter(['id', 'title', 'poster_path'], responseArr[0].data.results, 5);
        // filter_results.pop_mv = filter(['id', 'title', 'poster_path'], responseArr[1].data.results, responseArr[1].data.results.length);
        // filter_results.top_mv = filter(['id', 'title', 'poster_path'], responseArr[2].data.results, responseArr[2].data.results.length);
        // filter_results.trending_mv = filter(['id', 'title', 'poster_path'], responseArr[3].data.results, responseArr[3].data.results.length);

        // filter_results.pop_tv = filter(['id', 'name', 'poster_path'], responseArr[4].data.results, responseArr[4].data.results.length);
        // filter_results.top_tv = filter(['id', 'name', 'poster_path'], responseArr[5].data.results, responseArr[5].data.results.length);
        // filter_results.trending_tv = filter(['id', 'name', 'poster_path'], responseArr[6].data.results, responseArr[6].data.results.length);

        //res.json({filter_results})
        res.json({
            'now_playing' : filter(['id', 'title', 'poster_path'], responseArr[0].data.results, 5),
            'pop_mv' : filter(['id', 'title', 'poster_path'], responseArr[1].data.results, responseArr[1].data.results.length),
            'top_mv' : filter(['id', 'title', 'poster_path'], responseArr[2].data.results, responseArr[2].data.results.length),
            'trending_mv' : filter(['id', 'title', 'poster_path'], responseArr[3].data.results, responseArr[3].data.results.length),
            'pop_tv' : filter(['id', 'name', 'poster_path'], responseArr[4].data.results, responseArr[4].data.results.length),
            'top_tv' : filter(['id', 'name', 'poster_path'], responseArr[5].data.results, responseArr[5].data.results.length),
            'trending_tv' : filter(['id', 'name', 'poster_path'], responseArr[6].data.results, responseArr[6].data.results.length)
        })
    })
});


// app.get('/', (req, res) => {
//     axios.get('https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY + '&language=en-US&page=1')
//     .then(response => {
//         //var keys = ['id', 'title', 'poster_path'];

//         res.json(filter(['id', 'name', 'poster_path'], response.data.results, response.data.results.length));
//     })
// })

function filter(keys, results, n) {
    //console.log(results);
    var items = []
    for(let i = 0; i < n;) {
        if(results[i].hasOwnProperty('poster_path') && results[i].poster_path == null) {continue}
        var item = {}
        keys.forEach(element => {item[element] = results[i][element]});
        //console.log(item);
        items.push(item);
        i++;
    }
    return items;
}


app.get('/watch/:media_type/:media_id', (req, res)=>{
    console.log('req.params.id = ', req.params.media_type);
    console.log('req.params.id = ', req.params.media_id);
    let url_details = 'https://api.themoviedb.org/3/' + req.params.media_type + '/' + req.params.media_id + '?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_reviews = 'https://api.themoviedb.org/3/' + req.params.media_type + '/'  + req.params.media_id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1';
    let url_casts = 'https://api.themoviedb.org/3/' + req.params.media_type + '/'   + req.params.media_id + '/credits?api_key=' + API_KEY + '&language=en-US&page=1';
    axios.all([
        axios.get(url_details),
        axios.get(url_reviews),
        axios.get(url_casts)
    ])
    .then(responseArr => {
        res.json({
            'details': responseArr[0].data,
            'reviews' : responseArr[1].data.results,
            'casts' : responseArr[2].data.cast
        })
    })
});

/*
app.get('/watch/movie/:id', (req, res)=>{
    console.log('req.params.id', req.params.id);
    let url_details = 'https://api.themoviedb.org/3/movie/' + req.params.id + '?api_key=' + API_KEY + '&language=en-US&page=1';
    axios.get(url_details)
        .then(response=>{
            // handle success
           //console.log(response)
           res.send(response.data)
        });

    let url_reviews = 'https://api.themoviedb.org/3/movie/' + req.params.id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1';

    let url_casts = 'https://api.themoviedb.org/3/movie/' + req.params.id + '/credits?api_key=' + API_KEY + '&language=en-US&page=1';
});

app.get('/watch/tv/:id', (req, res)=>{
    console.log('req.params.id', req.params.id);
    axios.get('url')
        .then(response=>{
            // handle success
           //console.log(response)
           res.send(response.data)
        })
});
*/

/*
app.get('/mylist', (req, res)=>{
    axios.get('url')
        .then(response=>{
            // handle success
           //console.log(response)
           res.send(response.data)
        })
});
*/

var server = app.listen(port, function() {
    console.log(`Backend Application listening at http://localhost:${port}`);
})


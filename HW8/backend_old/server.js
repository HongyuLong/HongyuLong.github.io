const express = require('express');
const axios = require('axios');
const app = express();

const port = 3000;

const API_KEY = 'ee187b6fc0dfb521936ace68e072031c';

app.get('/', (req, res)=>{
    axios.get('https://api.themoviedb.org/3/movie/464052?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US&page=1')
        .then(response=>{
            // handle success
           //console.log(response)
           //var info = JSON.parse(response.data);
           res.send(response.data['id'] + '')
        })
});

/*
app.get('/watch/movie/:id', (req, res)=>{
    console.log('req.params.id', req.params.id);
    axios.get('url')
        .then(response=>{
            // handle success
           //console.log(response)
           res.send(response.data)
        })
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


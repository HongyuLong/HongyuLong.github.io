const api_key = 'ee187b6fc0dfb521936ace68e072031c';
const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.send('Hello World!');
})


app.get('/api/movie', function(req, res){
    res.send('Movie data!');
})
var server = app.listen(port, function() {
    console.log('Backend Application listening at http://localhost:${port}');
})


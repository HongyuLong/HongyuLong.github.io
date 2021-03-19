var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
})


app.get('/api/movie', function(req, res){
    res.send('Movie data!');
})
var server = app.listen(8080, function() {
    console.log('Backend Application listening at http://localhost:8080');
})


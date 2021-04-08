const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

var posts = require('./routes/post');

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/frontend')));
app.use('/apis/posts', posts);
app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
})

const port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    console.log(`Backend Application listening at http://localhost:${port}`);
})

module.exports = app;


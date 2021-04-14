const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

var posts = require('./routes/post');

app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/apis/posts', posts);

const port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    console.log(`Backend Application listening at http://localhost:${port}`);
})

module.exports = app;

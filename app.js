var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var HTTP_PORT = process.env.PORT || 8080;

var options = {
  index: "index.html"
};

app.use('/', express.static(__dirname + '/assets', options));

app.listen(HTTP_PORT, function() {
    console.log('Video Catalogue app is running on port:' + HTTP_PORT);
});
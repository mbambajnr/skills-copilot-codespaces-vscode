//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsFile = path.join(__dirname, 'comments.json');

// Path: comments.js
//read comments from comments.json
function readComments(callback) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.log(err);
      return callback([]);
    }
    var comments = JSON.parse(data);
    callback(comments);
  });
}

// Path: comments.js
//write comments to comments.json
function writeComments(comments, callback) {
  fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

// Path: comments.js
//get comments from comments.json
app.get('/api/comments', function(req, res) {
  readComments(function(comments) {
    res.json(comments);
  });
});

// Path: comments.js
//post comments to comments.json
app.post('/api/comments', bodyParser.json(), function(req, res) {
  readComments(function(comments) {
    var comment = {
      id: Date.now(),
    text: req.body.text
    };
    comments.push(comment);
    writeComments(comments, function() {
    res.json(comment);
    });
  });
});

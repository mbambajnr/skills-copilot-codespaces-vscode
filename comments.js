//create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = {
    "comment1": "This is a comment",
    "comment2": "This is a comment too"
};

http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true);
    var path = url_parts.pathname;
    var query = url_parts.query;
    console.log(path);
    console.log(query);
    if (path === '/comment') {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(comments));
        } else if (req.method === 'POST') {
            var body = '';
            req.on('data', function(data) {
                body += data;
                if (body.length > 1e6) {
                    req.connection.destroy();
                }
            });
            req.on('end', function() {
                var post = qs.parse(body);
                var commentKey = "comment" + (Object.keys(comments).length + 1);
                comments[commentKey] = post.comment;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(JSON.stringify(comments));
            });
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end("Page not found");
    }
}).listen(3000, '

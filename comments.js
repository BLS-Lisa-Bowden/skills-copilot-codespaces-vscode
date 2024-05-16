// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('Server Error...');
            } else {
                res.end(data);
            }
        });
    } else if (pathname === '/submit') {
        var comment = urlObj.query;
        comment.data = new Date();
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        var file = path.join(__dirname, pathname);
        fs.readFile(file, function (err, data) {
            if (err) {
                res.end('404');
            } else {
                res.end(data);
            }
        });
    }
}).listen(3000);
console.log('Server is running at http://
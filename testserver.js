
'use strict'

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    port = 8675;

http.createServer(function (request, response) {
    console.log('request starting...' + request.url);

  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.exists(filePath, function (exists) {
    if (exists) {
      fs.readFile(filePath, function (error, content) {
        if (error) {
          response.writeHead(500);
          response.write(error + "\n");
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.write("404: Page Not Found\n");
      response.end();
    }
  });

}).listen(port);
console.log('Server running at localhost:8675');


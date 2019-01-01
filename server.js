var http = require('http').createServer(createServer);
var express = require('express');
var fs = require('fs');
var url = require('url');


app = express();
app.use(express['static'](__dirname ))

// Express route for incoming requests for a customer name
app.get('/api/edc', function(req, res) {
  res.status(200).send("Working Bitch");
});

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) {
        if(error) throw error;

        res.writeHead(200);
        res.write(data);
        res.end();
    }

    switch(path) {
        case '/edc':
            doc = fs.readFile(__dirname + '/everyDayCalender/everyDayCalendar.html', fsCallback);
        break;
        default:
            doc = fs.readFile(__dirname + '/index.html', fsCallback);
        break;
    }
}

app.listen(8080);

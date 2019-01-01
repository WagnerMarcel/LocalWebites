var http = require('http').createServer(createServer);
var express = require('express');
var fs = require('fs');
var url = require('url');


app = express();
app.use(express['static']('everyDayCalendar'))

// Express route for incoming requests for a customer name
app.get('/api/edc', function(req, res) {
  res.status(200).send("Working Bitch");
});

app.listen(8080);

var http = require('http');
var express = require('express');
var fs = require('fs');
var url = require('url');


app = express();
app.use(express['static'](__dirname));
app.use(express.static('everyDayCalendar'))

// Express route for incoming requests for a customer name
app.get('/api/edc', function(req, res) {
  res.status(200).send("Working Bitch");
});

app.get('/edc', function(req, res){
  res.status(200).sendfile('/everyDayCalendar/everyDayCalendar.index');
});

app.listen(8080);

var http = require('http');
var express = require('express');
var fs = require('fs');
var url = require('url');


app = express();
app.use(express['static'](__dirname));
app.use('/edc', express.static(__dirname + '/everyDayCalendar'))

// Express route for every day Calendar
app.route('/api/edc/:day')
  .get(function(req, res) {
    res.status(200).send('Hello' + day);
  })
  .post(function(req, res) {
    storeJson('everyDayCalendar/edc_data.json', day);
    res.status(200).send('ok');
  })

var storeJson = function(path, day){

}

app.listen(8080);

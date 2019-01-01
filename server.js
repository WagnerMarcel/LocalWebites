var http = require('http');
var express = require('express');
var fs = require('fs');
var url = require('url');


app = express();
app.use(express['static'](__dirname));
app.use('/edc', express.static(__dirname + '/everyDayCalendar'))

// Express route for every day Calendar
app.route('/api/edc')
  .get(function(req, res) {
    res.status(200).sendfile('everyDayCalendar/edc_data.json');
  })
  .post(function(req, res) {
    res.status(200).send('ok');
  })

app.listen(8080);

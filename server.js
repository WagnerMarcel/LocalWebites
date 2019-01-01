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
    res.status(200).sendFile('everyDayCalendar/edc_data.json');
  })
  .post(function(req, res) {
    storeJson('everyDayCalendar/edc_data.json', req.query.month, req.query.day);
    res.status(200).send('ok');
  })

var storeJson = function(path, month, day){
  var data = JSON.parse(fs.readFileSync(path).toString());
  data.days[month-1][day-1] = 1;
  fs.writeFile(path, JSON.stringify(data));
}

app.listen(8080);

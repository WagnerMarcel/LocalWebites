var http = require('http');
var express = require('express');
var fs = require('fs');
var url = require('url');


app = express();
app.use(express['static'](__dirname));
app.use('/edc', express.static(__dirname + '/everyDayCalendar'))

// Express route for every day Calendar
app.route('/api/edc/days')
  .get(function(req, res) {
    if(req.query.month != 0){
      var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
      res.status(200).send(data.days[req.query.month-1]);
    }else{
      res.status(200).sendFile(__dirname + '/everyDayCalendar/edc_data.json');
    }
  })
  .post(function(req, res) {
    var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
    data.days[req.query.month-1][req.query.day-1] = 1;
    fs.writeFile(path, JSON.stringify(data));
  });

app.route('/api/edc/month')
    .get(function(req, res) {
        var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
        res.status(200).send(data.months);
    })
    .post(function(req, res) {
      var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
      data.months[req.query.month-1] = 1;
      fs.writeFile(path, JSON.stringify(data));
    });


app.listen(8080);

var http = require('http');
var express = require('express');
var fs = require('fs');
var url = require('url');



app = express();
app.use(express['static'](__dirname));
app.use('/edc', express.static(__dirname + '/everyDayCalendar'));


// Express route for every day Calendar
app.route('/api/edc/days')
  .get(function(req, res) {
    if(req.query.month != 0){
      var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
      var package = {
        "month" : data.days[req.query.month-1]
      }
      res.status(200).send(JSON.stringify(package));
    }else{
      res.status(200).sendFile(__dirname + '/everyDayCalendar/edc_data.json');
    }
  })
  .post(function(req, res) {
    var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
    console.log(req.query);
    data.days[req.query.month-1][req.query.day-1] = 1;
    fs.writeFile(__dirname + '/everyDayCalendar/edc_data.json', JSON.stringify(data));
  });

app.route('/api/edc/months')
    .get(function(req, res) {
        var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
        var package = {
          "months" : data.months
        }
        res.status(200).send(JSON.stringify(package));
    })
    .post(function(req, res) {
      var data = JSON.parse(fs.readFileSync(__dirname + '/everyDayCalendar/edc_data.json').toString());
      data.months[req.body.month-1] = 1;
      fs.writeFile(__dirname + '/everyDayCalendar/edc_data.json', JSON.stringify(data));
    });


app.listen(8080);

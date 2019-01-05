var client = new XMLHttpRequest();
var table = "";
var bar = "";
var basic = "";
var myObj = "";
var progMonths = [];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"];

client.open('GET', '/everyDayCalendar/edc_data.json');
client.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    table += "<table class='table'>"
    var i = 0;
    table += "<tr>"
    while(i < 33){
      if(i == 0){
        table += "<td></td>";
      }else if(i == 32){
        table += "<td>Progress</td>";
      }else {
        table += "<td>" + i + "</td>";
      }
      i++;
    }
    table += "</tr>"
    for (x in myObj.days) {
      table += "<tr><td>" + months[parseInt(x)] + "</td>";
      i = 0;
      for (y in myObj.days[x]){
        if(myObj.days[x][y] == 0){
          table += "<td bgcolor='#ff8888'></td>";
        }else{
          table += "<td bgcolor='#88ff88'></td>";
        }
        i++;
      }
      while(i < 31){
        table += "<td></td>";
        i++
      }
      var val = parseFloat(progress(myObj.days[x])).toFixed(2);
      table += "<td><div class='progress'><div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow=" + val + "aria-valuemin='0' aria-valuemax='100' style='width:" + val + "%; color: gray;' >" + val + "%</div></div></td>";
      table += "</tr>";
    }
    table += "</table>"
    var progYear = 0.0;
    for(x in progMonths){
      progYear += parseFloat(progMonths[x]);
    }
    progYear = progYear/12.0;
    progYear = progYear.toFixed(2);
    bar += "<div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow=" + progYear + "aria-valuemin='0' aria-valuemax='100' style='width:" + progYear + "%; color: gray;'>" + progYear + "%</div>";
    basic += "Progres so far: " + total(myObj) + "/365 Days completed\n";
    basic += "Current Day completed: " + currentDay(myObj) + "\n";
    basic += "Days missed so far: " + daysMissed(myObj);
    document.getElementById("demo").innerHTML = table;
    document.getElementById("bar").innerHTML = bar;
    document.getElementById("basic").innerHTML = basic;
  }
}
client.send();

function total(array){
  var total = 0;
  for(x in array.days){
    for(y in array.days[x]){
      total += array.days[x][y];
    }
  }
  return total;
}

function currentDay(array){
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;

  if(array.days[month-1][day]){
    return "Yes!"
  }else{
    return "No!"
  }
}

function daysMissed(array){
  var missed = 0;
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var i = 0;

  while(i < month){
    for(j in array.days[i-1]){
      if(array.days[i-1][j] == 0){
        missed += 1;
      }
    }
    i++;
  }
  var k = 0;
  if(i == month){
    while(k < day-1){
      if(array.days[i-1][k] == 0){
        missed += 1;
      }
      k++;
    }
  }
  return missed;
}

function progress(array){
  var prog = 0;
  for(x in array){
    prog += array[x];
  }
  var prog = prog*100/array.length;
  progMonths.push(prog);
  return prog;
}

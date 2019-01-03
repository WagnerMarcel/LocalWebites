var client = new XMLHttpRequest();
var table = "";
var bar = "";
var myObj = "";
var progMonths;
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
      table += "<td>" + progress(myObj.days[x]) + "</td>";
      table += "</tr>";
    }
    table += "</table>"
    var progYear = 0;
    for(x in progMonths){
      progYear += progMonths;
    }
    progYear = progYear/12;
    bar += "<div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow=" + progYear + "aria-valuemin='0' aria-valuemax='100' style='width:" + progYear + "%'>";
    document.getElementById("demo").innerHTML = table;
    document.getElementById("bar").innerHTML = bar;
  }
}
client.send();

function progress(array){
  var prog = 0;
  for(x in array){
    prog += array[x];
  }
  var prog = prog*100/array.length;
  progMonths.push(prog);
  return prog;
}

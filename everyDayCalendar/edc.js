var client = new XMLHttpRequest();
var txt = "";
var myObj = "";

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"];

client.open('GET', '/everyDayCalendar/edc_data.json');
client.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    txt += "<table class='table'>"
    var i = 0;
    txt += "<tr>"
    while(i < 32){
      if(i != 0){
        txt += "<td>" + i + "</td>";
      }else {
        txt += "<td></td>";
      }
      i++;
    }
    txt += "</tr>"
    for (x in myObj.days) {
      txt += "<tr><td>" + months[parseInt(x)] + "</td>";
      for (y in myObj.days[x]){
        if(myObj.days[x][y] == 0){
          txt += "<td bgcolor='#ff8888'></td>";
        }else{
          txt += "<td bgcolor='#88ff88'></td>";
        }
      }
      txt += "<td>" + progress(myObj.days[x]) + "</td>";
      txt += "</tr>";
    }
    txt += "</table>"
    document.getElementById("demo").innerHTML = txt;
  }
}
client.send();

function progress(var array[]){
  var prog = 0;
  for(x in array){
    prog += array[x];
  }
  var prog *= 100;
  var prog /= array.length;
  return prog;
}

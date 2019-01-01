var client = new XMLHttpRequest();
var txt = "";
var myObj = "";
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
      var val = parseInt(x)+1;
      txt += "<tr><td>" + val + "</td>";
      for (y in myObj.days[x]){
        txt += "<td>" + myObj.days[x][y] + "</td>";
      }
      txt += "</tr>";
    }
    txt += "</table>"
    document.getElementById("demo").innerHTML = txt;
  }
}
client.send();

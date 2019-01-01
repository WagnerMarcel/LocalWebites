var client = new XMLHttpRequest();
var txt = "";
var myObj = "";
client.open('GET', '/everyDayCalendar/edc_data.json');
client.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    txt += "<table class='table'>"
    for (x in myObj.days) {
      txt += "<tr><td>" + (x+1) + "</td>";
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

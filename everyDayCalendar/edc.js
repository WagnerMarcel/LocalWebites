var client = new XMLHttpRequest();
client.open('GET', '/edc_data.json');
client.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    txt += "<table border='1'>"
    for (x in myObj.days) {
      txt += "<tr>"
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

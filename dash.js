var therealURL = 'http://api.reimaginebanking.com/customers/58d6e1171756fc834d906ab1?key=f1e4a8e47992316ea823dd7cae9507b1';
var balanceURL = 'http://api.reimaginebanking.com/customers/58d6e1171756fc834d906ab1/accounts?key=f1e4a8e47992316ea823dd7cae9507b1';
var name = "AAPL"; //boi we gotta find a way to change this part
//var appleURL = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=AAPL&qopts.columns=date%2Copen&api_key=_xxj62hU6DK8MaazUSh1";
var appleURL = "https://api.intrinio.com/prices?identifier=" + name;
var snapURL = "https://api.intrinio.com/prices?identifier=SNAP";
var baseURL = "https://api.intrinio.com/prices?identifier=";
var fName, lName;
var balance;
var labelsA = [], priceA=[];
var labelsS =[], priceS=[];
var type;

$(document).ready(function(){

$.getJSON(balanceURL, function(data) {     //data is the JSON string
      console.log("Balance", data[0].balance);
      balance = data[0].balance;
      document.getElementById("balance").innerHTML = "$" + balance;
    });
    
 $.getJSON(therealURL, function(data) {     //data is the JSON string
    //   console.log(data);
    //   obj = data;
      console.log("Here is our data for realURL", data);
      fName = data.first_name;
      lName = data.last_name;
      if(balance>1000){
        type = "aggressive";
      }else{
        type="conservative";
      }
      document.getElementById("name").innerHTML = "Hello " + fName + " " + lName +". You have a " + type + " investment strategy.";
    });
  $.ajax({
          url: appleURL,
          type: 'GET',
          dataType: 'json',
          success: function(obj){ //labelsA, priceA
            for(var i = obj.data.length -1; i >=0 ; i-=20){
              labelsA.push(obj.data[i].date);
              priceA.push(obj.data[i].open);
            }
            console.log("labelsA", labelsA);
            console.log("priceA", priceA);
          },
          error: function() { alert('boo!'); },
          beforeSend: setHeader
  });
  $.ajax({ //snapchat
          url: snapURL,
          type: 'GET',
          dataType: 'json',
          success: function(obj){ //labelsA, priceA
            for(var i = obj.data.length -1; i >=0 ; i-=1){
              labelsS.push(obj.data[i].date);
              priceS.push(obj.data[i].open);
            }
            console.log("labelsS", labelsS);
            console.log("priceS", priceS);
          },
          error: function() { alert('boo!'); },
          beforeSend: setHeader
  });
  function setHeader(xhr) {
        var username = "fbf1ad372855125a7ced3869620b7c8b";
        var password = "8122fa6759fa379baae51ce1b19a7e57";
        var auth = 'Basic ZmJmMWFkMzcyODU1MTI1YTdjZWQzODY5NjIwYjdjOGI6ODEyMmZhNjc1OWZhMzc5YmFhZTUxY2UxYjE5YTdlNTc=';//"Basic " + Base64.encode(username + ":" + password);
        
        xhr.setRequestHeader('Authorization', auth);
      }
  // makeChart(labelsA, priceA);
  
  makeChart(labelsA, priceA, 'myChart');
  makeChart(labelsS, priceS, 'myChart2');
 
 
});
 function ugh(){
  console.log("swagg");
  var riskyness = 5;
  if(type == "aggressive"){
    riskyness = 10;
  }
  var percent = (priceA[priceA.length - 1] - priceA[priceA.length -2])/priceA[priceA.length -2] * 100;
  console.log("PERCENT AJDSF ASDF")
  if (percent > riskyness){
    document.getElementById("aaplb").innerHTML = "invest"; //"Looks like " + name + " is increasing in value. "
  }
  else{// if(percent < (-1 * riskyness)){
    document.getElementById("aaplb").innerHTML = "do not invest"; //"Looks like " + name + " is decreasing in value."
  }
}
    // document.getElementById("aaplb").innerHTML = "invest"}
function ugh2(){
  console.log("swagg");
  var riskyness = 5;
  if(type == "aggressive"){
    riskyness = 10;
  }
  var percent = (priceS[priceS.length - 1] - priceS[priceS.length -2])/priceS[priceS.length -2] * 100;
  console.log("PERCENT AJDSF ASDF")
  if (percent > riskyness){
    document.getElementById("aaplb2").innerHTML = "invest";//"Looks like " + name + " is increasing in value. ";
  }
  else{
    document.getElementById("aaplb2").innerHTML = "do not invest";//"Looks like " + name + " is decreasing in value.";
  }
}
 //Make Graph
 function makeChart(labels, price, ids){ //price is an array of prices, labels is dates
  var ctx = document.getElementById(ids).getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock',
        data: price,
        backgroundColor: "rgba(153,255,51,0.4)"
      }]},
    options: {
      title :{
        display:true,
        text: "Stock Price"
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'price ($)'
          }
        }],
        xAxes:[{
         scaleLabel:{
            display:true,
            labelString:'day'
         }
        }]
      }
    }
  });
}

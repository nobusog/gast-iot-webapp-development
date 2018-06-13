$(document).ready(function () {
    //initialize map in index when button is clicked
    function getMap(){    
        var map = new Microsoft.Maps.Map('#bingmap');
    };

    //show device map when button is clicked
    document.getElementById("mapButton").onclick = function() {
        document.getElementById("map").classList.remove("d-none");
    }; 

    //close map when close button is clicked 
    document.getElementById("mapCloseButton").onclick = function() {
        document.getElementById("map").classList.add("d-none");
    };
   //Insert Current Time into jumbotron
   var currentTime =   new Date().toLocaleString();
   document.getElementById("timePlaceHolder").innerHTML = currentTime;

   //Insert Current Location into jumbotron
   document.getElementById("locationPlaceHolder").innerHTML = "Current Location";

   //Insert Current Time into jumbotron
   var currentTimeHours = new Date().getHours();
   
   if (currentTimeHours < 12 & currentTimeHours >= 0) {
       greeting = "Good Morning, ";
   }

   else if (currentTimeHours >= 12 & currentTimeHours <= 17) {
       greeting = "Good Afternoon, ";
   }
   else {
       greeting = "Good Evening, ";
   }
   document.getElementById("greeting").innerHTML = greeting;
    
    //Show charts when button is clicked
    document.getElementById("bme280Button").onclick = function() {
        document.getElementById("bmeContainer").classList.remove("d-none");
    };
    document.getElementById("am2302Button").onclick = function() {
        document.getElementById("am2302Container").classList.remove("d-none");
    };
    document.getElementById("pressureTransmitterButton").onclick = function() {
        document.getElementById("pressureTransmitterContainer").classList.remove("d-none");
    };


    //close charts when button is clicked
    document.getElementById("bme280CloseButton").onclick = function() {
        document.getElementById("bmeContainer").classList.add("d-none");
    };
    document.getElementById("am2302CloseButton").onclick = function() {
        document.getElementById("am2302Container").classList.add("d-none");
    };
    document.getElementById("pressureTransmitterCloseButton").onclick = function() {
        document.getElementById("pressureTransmitterContainer").classList.add("d-none");
    };
});
$(document).ready(function () {
    //Show charts when button is clicked
    document.getElementById("bme280Button").onclick = function() {
        document.getElementById("bmeContainer").classList.remove("d-none")
    };
    document.getElementById("am2302Button").onclick = function() {
        document.getElementById("am2302Container").classList.remove("d-none")
    };
    document.getElementById("pressureTransmitterButton").onclick = function() {
        document.getElementById("pressureTransmitterContainer").classList.remove("d-none")
    };

    //close charts when button is clicked
    document.getElementById("bme280CloseButton").onclick = function() {
        document.getElementById("bmeContainer").classList.add("d-none")
    };
    document.getElementById("am2302CloseButton").onclick = function() {
        document.getElementById("am2302Container").classList.add("d-none")
    };
    document.getElementById("pressureTransmitterCloseButton").onclick = function() {
        document.getElementById("pressureTransmitterContainer").classList.add("d-none")
    };

    //Insert Current Time into jumbotron
    document.getElementById("timePlaceHolder").innerHTML = "Current Time"

     //Insert Current Location into jumbotron
     document.getElementById("locationPlaceHolder").innerHTML = "Current Location"

      //Insert Current Time into jumbotron
    document.getElementById("greeting").innerHTML = "Greeting"
})
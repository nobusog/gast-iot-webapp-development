//global variables
var currentLocation;

$(document).ready(function () {
    //show device map when button is clicked
    document.getElementById("mapButton").onclick = function() {
        document.getElementById("mapholder").classList.remove("d-none");
    }; 

    //close map when close button is clicked 
    document.getElementById("mapCloseButton").onclick = function() {
        document.getElementById("mapholder").classList.add("d-none");
    };
   
    //insert time into place holder
    (function updateTime(){ 
        currentTime = new Date().toLocaleString([], { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        document.getElementById("timePlaceHolder").innerHTML = currentTime; 
        setTimeout(updateTime, 60000)
    })(); 
   
    //Insert Current Location into jumbotron
    navigator.geolocation.getCurrentPosition(function locationNotFound(position) {
        currentLocation = position.coords.latitude;
    }, function locationFound() {
        currentLocation = "Location not Found" ;
    });
    
    document.getElementById("locationPlaceHolder").innerHTML = currentLocation;

    //Insert greeting into jumbotron and update every 30 mins
    (function updateGreeting() {
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
        
        setTimeout(updateGreeting,1800000)
    })();
    
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

    //Toggle quick stats when button is clicked
    document.getElementById("quickStatsButton").onclick = function() {
        if (document.getElementById("quickStatsContainer").classList.contains("d-none")) {
            document.getElementById("quickStatsContainer").classList.remove("d-none");
        }
        else  {
            document.getElementById("quickStatsContainer").classList.add("d-none");
        }
    };

    //store last recorded data points
    var ws = new WebSocket('wss://' + location.host);
    ws.onopen = function () {
      console.log('Successfully connect 2nd WebSocket');
    }
    ws.onmessage = function (message) {
        try {
        var obj = JSON.parse(message.data);
        document.getElementById("lastam2302temperature").innerHTML= +obj.am2302temperature.toFixed(2)+"°C";
        document.getElementById("lastam2302humidity").innerHTML = +obj.am2302humidity.toFixed(2)+"%";
        }
        catch (err) {
            console.error(err);
        }
    };

    //show which compressor is active 
    document.getElementById("jun-airSelectButton").onclick( function(){
    if (this.classList.contains("active")){
        document.getElementById("deviceAlert")
    }
    else {
        document.getElementById("deviceSelectContainer").getElementsByClassName("active").classList.remove("active")
        document.getElementById("jun-airSelectButton").classList.add("active")
    }
})
});
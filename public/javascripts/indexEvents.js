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
        setTimeout(updateTime, 900)
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
    document.getElementById("thermocoupleButton").onclick = function() {
        document.getElementById("thermocoupleContainer").classList.remove("d-none");
    };
    document.getElementById("sht20Button").onclick = function() {
        document.getElementById("sht20Container").classList.remove("d-none");
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
    document.getElementById("thermocoupleCloseButton").onclick = function() {
        document.getElementById("thermocoupleContainer").classList.add("d-none");
    };
    document.getElementById("sht20CloseButton").onclick = function() {
        document.getElementById("sht20Container").classList.add("d-none");
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
        document.getElementById("lastam2302temperature").innerHTML= +obj.am2302Temperature.toFixed(2)+"°C";
        document.getElementById("lastam2302humidity").innerHTML = +obj.am2302Humidity.toFixed(2)+"%";
        }
        catch (err) {
            console.error(err);
        }
    };

    //show which compressor is active 
    document.getElementById("jun-airSelectButton").onclick = function(){
    if (this.classList.contains("active")){
        document.getElementById("deviceAlert").classList.remove("d-none");
    }
    else {
        var activeList = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
        for (var i=0; i<activeList.length; i++){
            activeList[i].classList.remove("active")
        }
        document.getElementById("jun-airSelectButton").classList.add("active");
        //close alert bar and enable selector
        document.getElementById("chartDeviceSelectAlert").classList.add("d-none")
        document.getElementById("chartSelector").classList.remove("disabled")
        }   
    }
    
    document.getElementById("nitrogenSelectButton").onclick = function(){
        if (this.classList.contains("active")){
            document.getElementById("deviceAlert").classList.remove("d-none");
        }
        else {
            var activeListNitro = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
            for (var i=0; i<activeListNitro.length; i++){
                activeListNitro[i].classList.remove("active")
            }
            document.getElementById("nitrogenSelectButton").classList.add("active");
            //close alert bar and enable chart selection
            document.getElementById("chartDeviceSelectAlert").classList.add("d-none")
            document.getElementById("chartSelector").classList.remove("disabled")
        }
    }

    //close alert whenever button is pressed 
    document.getElementById("deviceAlertCloseButton").onclick = function(){
        document.getElementById("deviceAlert").classList.add("d-none");
    }
    
    /*Device Select Alerts
    */
    //check if device is selected before letting user select charts
    document.getElementById("chartSelector").onclick = function(){
        if (document.getElementById("jun-airSelectButton").classList.contains("active") || document.getElementById("nitrogenSelectButton").classList.contains("active") ) {
            document.getElementById("chartDeviceSelectAlert").classList.remove("disabled")
        }
        else {
            document.getElementById("chartSelector").classList.add("disabled")
            document. getElementById("chartDeviceSelectAlert").classList.remove("d-none")
        }
    }
    
    //close all charts when button is pressed 
    document.getElementById("closeAllChartsButton").onclick = function () {
        divList = document.getElementsByTagName("div");
        for (var i=0; i<divList.length; i++) {
            if (divList[i].classList.contains("chartContainer")) {
                divList.classList.add("d-none");
            }
        }
    }
});
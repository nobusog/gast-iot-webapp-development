//global variables
var currentLocation;
var openCharts = [];

$(document).ready(function () {
    document.getElementById("homeButton").onclick = function () {
        document.getElementById("homePage").classList.remove("d-none");
        document.getElementById("chartSelector").classList.remove("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("settingsButtonContainer").classList.remove("active");
        document.getElementById("homeButtonContainer").classList.add("active");
    };

    //insert time into place holder
    (function updateTime(){ 
        currentTime = new Date().toLocaleString([], { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        document.getElementById("timePlaceHolder").innerHTML = currentTime; 
        setTimeout(updateTime, 900);
    })(); 
   
    //Insert Current Location into jumbotron
    navigator.geolocation.getCurrentPosition(function locationNotFound(position) {
        currentLocation = position.coords.latitude;
    }, function locationFound() {
        currentLocation = "Location not Found" ;
    });
    
    //Insert greeting into jumbotron and update every 30 mins
    (function updateGreeting() {
        var currentTimeHours = new Date().getHours();
        if (currentTimeHours < 12 && currentTimeHours >= 0) {
            greeting = "Good Morning, ";
        }

        else if (currentTimeHours >= 12 && currentTimeHours <= 17) {
            greeting = "Good Afternoon, ";
        }
        else {
            greeting = "Good Evening, ";
        }
        document.getElementById("greeting").innerHTML = greeting;
        
        setTimeout(updateGreeting,1800000)
    })();
    
    //Show charts when button is clicked only for the slected elements 
    document.getElementById("bme280Button").onclick = function() {
        if (document.getElementById("jun-airSelectButton").classList.contains("active")) {
            document.getElementById("bme280ContainerJunair").classList.remove("d-none");
            openCharts.push(document.getElementById("bme280ContainerJunair"));
        } 
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("bme280ContainerNitrogen").classList.remove("d-none");
            openCharts.push(document.getElementById("bme280ContainerNitrogen"));
        }
    };
    document.getElementById("am2302Button").onclick = function() {
        if (document.getElementById("jun-airSelectButton").classList.contains("active")) {
            document.getElementById("am2302ContainerJunair").classList.remove("d-none");
            openCharts.push(document.getElementById("am2302ContainerJunair"));
        } 
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("am2302ContainerNitrogen").classList.remove("d-none");
            openCharts.push(document.getElementById("am2302ContainerNitrogen"));
        }
    };
    document.getElementById("pressureTransmitterButton").onclick = function() {
        if (document.getElementById("jun-airSelectButton").classList.contains("active")) {
            document.getElementById("pressureTransmitterContainerJunair").classList.remove("d-none");
            openCharts.push(document.getElementById("pressureTransmitterContainerJunair"));
        } 
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("pressureTransmitterContainerNitrogen").classList.remove("d-none");
            openCharts.push(document.getElementById("pressureTransmitterContainerNitrogen"));
        }
    };
    document.getElementById("thermocoupleButton").onclick = function() {
        if (document.getElementById("jun-airSelectButton").classList.contains("active")) {
            document.getElementById("thermocoupleContainerJunair").classList.remove("d-none");
            openCharts.push(document.getElementById("thermocoupleContainerJunair"));
        } 
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("thermocoupleContainerNitrogen").classList.remove("d-none");
            openCharts.push(document.getElementById("thermocoupleContainerNitrogen"));
        }
    };
    document.getElementById("sht20Button").onclick = function() {
        if (document.getElementById("jun-airSelectButton").classList.contains("active")) {
            document.getElementById("sht20ContainerJunair").classList.remove("d-none");
            openCharts.push(document.getElementById("sht20ContainerJunair"));
        } 
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("sht20ContainerNitrogen").classList.remove("d-none");
            openCharts.push(document.getElementById("sht20ContainerNitrogen"));
        }
    };

    //close jun air charts when button is clicked    
    document.getElementById("bme280CloseButtonJunair").onclick = function() {
        document.getElementById("bme280ContainerJunair").classList.add("d-none");
    };
    document.getElementById("am2302CloseButtonJunair").onclick = function() {
        document.getElementById("am2302ContainerJunair").classList.add("d-none");
    };
    document.getElementById("pressureTransmitterCloseButtonJunair").onclick = function() {
        document.getElementById("pressureTransmitterContainerJunair").classList.add("d-none");
    };
    document.getElementById("thermocoupleCloseButtonJunair").onclick = function() {
        document.getElementById("thermocoupleContainerJunair").classList.add("d-none");
    };
    document.getElementById("sht20CloseButtonJunair").onclick = function() {
        document.getElementById("sht20ContainerJunair").classList.add("d-none");
    };

    //close nitrogen charts when button is clicked
    document.getElementById("bme280CloseButtonNitrogen").onclick = function() {
        document.getElementById("bme280ContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("am2302CloseButtonNitrogen").onclick = function() {
        document.getElementById("am2302ContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("pressureTransmitterCloseButtonNitrogen").onclick = function() {
        document.getElementById("pressureTransmitterContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("thermocoupleCloseButtonNitrogen").onclick = function() {
        document.getElementById("thermocoupleContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("sht20CloseButtonNitrogen").onclick = function() {
        document.getElementById("sht20ContainerNitrogen").classList.add("d-none");
    };

    //Toggle quick stats when button is clicked
    document.getElementById("quickStatsButton").onclick = function() {
        if (document.getElementById("jun-airSelectButton").classList.contains("active")) {
            if (document.getElementById("quickStatsContainerJunair").classList.contains("d-none")) {
                document.getElementById("quickStatsContainerJunair").classList.remove("d-none");
            }
            else  {
                document.getElementById("quickStatsContainerJunair").classList.add("d-none");
            }
        }
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            if (document.getElementById("quickStatsContainerNitrogen").classList.contains("d-none")) {
                document.getElementById("quickStatsContainerNitrogen").classList.remove("d-none");
            }
            else  {
                document.getElementById("quickStatsContainerNitrogen").classList.add("d-none");
            }
        }
        else {
            document. getElementById("chartDeviceSelectAlert").classList.remove("d-none")
        }
    };

    //open new websocket 
    var ws = new WebSocket('wss://' + location.host);
    ws.onopen = function () {
      console.log('Successfully connect 2nd WebSocket');
    }

    var timeOnJunair = 0 
    var timeOnNitro = 0
    var NitroConsumption = 0;
    ws.onmessage = function (message) {
        try {
            var obj = JSON.parse(message.data);
            if (obj.deviceId == "JunAir Pi - Python") {
                timeOnJunair = timeOnJunair + obj.globalTimeOn
                document.getElementById("junairCompressorOnTimeContainer").innerHTML= +timeOnJunair.toFixed(2)+"s";
                document.getElementById("junairDutyCycleContainer").innerHTML = +obj.dutyCycle.toFixed(2)+"%";

                if(obj.compState == 1) {
                    document.getElementById("junairStateDisplay").classList.replace("btn-outline-light", "btn-success") 
                    document.getElementById("junairStateDisplay").disabled = false;
                }
                else if (obj.compState != 1) {
                    document.getElementById("junairStateDisplay").classList.replace("btn-success", "btn-outline-light")
                    document.getElementById("junairStateDisplay").disabled = true;
                }
               
            } else if  (obj.deviceId == "NitroGen Pi - Python") {
                timeOnNitro = timeOnNitro + obj.globalTimeOn
                NitroConsumption = NitroConsumption + obj.NitroConsumption
                document.getElementById("nitrogenCompressorOnTimeContainer").innerHTML= +timeOnNitro.toFixed(2) +"s";
                document.getElementById("nitrogenDutyCycleContainer").innerHTML = +obj.dutyCycle.toFixed(2)+"%";
                document.getElementById("nitrogenConsumptionContainer").innerHTML = +NitroConsumption.toFixed(2)+"scf";

                if(obj.compState == 1) {
                    document.getElementById("nitrogenStateDisplay").classList.replace("btn-outline-light", "btn-success") 
                    document.getElementById("nitrogenStateDisplay").disabled = false;
                }
                else if (obj.compState != 1) {
                    document.getElementById("nitrogenStateDisplay").classList.replace("btn-success", "btn-outline-light")
                    document.getElementById("nitrogenStateDisplay").disabled = true;
                }
               
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    function checkCompOff (system, time) {
        console.log("we called checkcompoff")
        if (system == "junair") {
        var intial1 = timeOnJunair
            (function checkjunair() {
                end1 = timeOnJunair
                if (intial1 == end1) {
                    return true 
                }else  {
                    return false 
                }
                setTimeout(checkjunair, time)
            })();
        }
        else if (system == "nitrogen") {
            var intial1 = timeOnNitro
            (function checknitrogen () {
                end1 = timeOnNitro
                if (intial1 == end1) {
                    return true 
                    console.log("initial = end")
                }else  {
                    return false 
                    console.log("initial not eqaul end")
                }
                setTimeout(checknitrogen, time)
            })();
        }    
    }
   (function compoffstate () {
        var lastCompStateJunair = checkCompOff("junair", 5000);
        var lastCompStateNitrogen = checkCompOff("nitrogen", 5000);
        if (lastCompStateJunair != true) { 
            document.getElementById("nitrogenStateDisplay").classList.replace("btn-outline-success", "btn-outline-light")
        }
        if (lastCompStateNitrogen != true) {
            document.getElementById("junairStateDisplay").classList.replace("btn-outline-success", "btn-outline-light")
        };   
        setTimeout(compoffstate, 5000)
        console.log("we called compoff state")
    })();
    

    
    //show which compressor is active 
    document.getElementById("jun-airSelectButton").onclick = function(){
    if (this.classList.contains("active")){
        document.getElementById("deviceAlert").classList.remove("d-none");
    }
    else {
        document.getElementById("quickStatsContainerNitrogen").classList.add("d-none");
        bringBackOpenedCharts("junair")
        var activeList = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
        for (var i=0; i<activeList.length; i++){
            activeList[i].classList.remove("active")
        }
        document.getElementById("jun-airSelectButton").classList.add("active");
        //close alert bar and enable selector
        document.getElementById("chartDeviceSelectAlert").classList.add("d-none")
        document.getElementById("chartSelector").classList.remove("disabled")
        closeAllCharts("nitrogen")
        }   
    }
    
    document.getElementById("nitrogenSelectButton").onclick = function(){
        if (this.classList.contains("active")){
            document.getElementById("deviceAlert").classList.remove("d-none");
        }
        else {
            document.getElementById("quickStatsContainerJunair").classList.add("d-none");
            bringBackOpenedCharts("nitrogen")
            var activeListNitro = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
            for (var i=0; i<activeListNitro.length; i++){
                activeListNitro[i].classList.remove("active")
            }
            document.getElementById("nitrogenSelectButton").classList.add("active");
            //close alert bar and enable chart selection
            document.getElementById("chartDeviceSelectAlert").classList.add("d-none")
            document.getElementById("chartSelector").classList.remove("disabled")
            closeAllCharts("junair");
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
        if (document.getElementById("jun-airSelectButton").classList.contains("active") || document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("chartDeviceSelectAlert").classList.remove("disabled")
        }
        else {
            document.getElementById("chartSelector").classList.add("disabled")
            document. getElementById("chartDeviceSelectAlert").classList.remove("d-none")
        }
    }
    
    //close all charts when button is pressed 
    function closeAllCharts (selected) {
        if (selected === "junair") {
            divList = document.getElementById("junair").getElementsByTagName("div"); 
        }
        else if (selected === "nitrogen") {
            divList = document.getElementById("nitrogen").getElementsByTagName("div"); 
        }
        for (var i=0; i<divList.length; i++) {
            if (divList[i].classList.contains("chartContainer")) {
                divList[i].classList.add("d-none");
            }
        }

        
    }
    document.getElementById("closeAllChartsButton").onclick = function () {
        if (document.getElementById("jun-airSelectButton").classList.contains("active") && document.getElementById("jun-airSelectButton").classList.contains("active")){
            closeAllCharts("junair");
            for (i=0; i<openCharts.length; i++){
                if (openCharts[i]) {
                    if (openCharts[i].classList.contains("junair")){
                        delete openCharts[i];
                    }
                }
            }
        }

        else if (document.getElementById("nitrogenSelectButton").classList.contains("active") && document.getElementById("nitrogenSelectButton").classList.contains("active")){
            closeAllCharts("nitrogen");
            for (i=0; i<openCharts.length; i++){
                if (openCharts[i]) {
                    if (openCharts[i].classList.contains("nitrogen")){
                        delete openCharts[i];
                    }
                }
            }
        }
    }

    //function that resores open charts from the open charts array
    function bringBackOpenedCharts (chart) {
        for (i=0; i<openCharts.length; i++) {
            if (openCharts[i]) {
                if (openCharts[i].classList.contains(chart)){
                    openCharts[i].classList.remove("d-none");
                }
            } 
        }
    }

    //removes specific chart from open charts array and closes chart
    function removeChart (chart) {
        var i=0;
        var selectedChart = 0; 
        while (selectedChart == 0) {
            if (openCharts[i] == document.getElementById(chart)) {
                openCharts.splice(i,1);
                selectedChart = 1;
            }
            if (openCharts[i] == openCharts[-1]){
                selectedChart = 1;
            }
            i++;
        }
        document.getElementById(chart).classList.add("d-none");
    }

    //open all charts when button is pressed 
    document.getElementById("openAllChartsButton").onclick = function () {
        if(document.getElementById("jun-airSelectButton").classList.contains("active")) {
            divList = document.getElementById("junair").getElementsByTagName("div");
        } 
        else if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            divList = document.getElementById("nitrogen").getElementsByTagName("div"); 
        }
        for (var i=0; i<divList.length; i++) {
            if (divList[i].classList.contains("chartContainer")) {
                divList[i].classList.remove("d-none");
                openCharts.push(divList[i]);
            }
        }
    }
});
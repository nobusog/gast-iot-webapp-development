//global variables
var currentLocation;
var openCharts = [];

$(document).ready(function () {
    document.getElementById("homeButton").onclick = function () {
        document.getElementById("homePage").classList.remove("d-none");
        document.getElementById("chartSelector").classList.remove("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("systemsPage").classList.add("d-none");
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
        
        setTimeout(updateGreeting,1800000);
    })();
    
    //Show charts when button is clicked only for the slected elements 
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
    };
    document.getElementById("nitrogenGenerationButton").onclick = function() {
        if (document.getElementById("nitrogenSelectButton").classList.contains("active")) {
            document.getElementById("nitrogenGenerationContainerNitrogen").classList.remove("d-none");
            openCharts.push(document.getElementById("nitrogenGenerationContainerNitrogen"));
        }
    };
    

    //close jun air charts when button is clicked    
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
    //Test
    document.getElementById("am2302CloseButtonNitrogen").onclick = function() {
        document.getElementById("am2302ContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("pressureTransmitterCloseButtonNitrogen").onclick = function() {
        document.getElementById("pressureTransmitterContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("thermocoupleCloseButtonNitrogen").onclick = function() {
        document.getElementById("thermocoupleContainerNitrogen").classList.add("d-none");
    };
    document.getElementById("nitrogenGenerationCloseButtonNitrogen").onclick = function() {
        document.getElementById("nitrogenGenerationContainerNitrogen").classList.add("d-none");
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
            unsuccessfulAlert("Please Select A Device!")
        }
    };

    //open new websocket 
    var ws = new WebSocket('wss://' + location.host);
    ws.onopen = function () {
      console.log('Successfully connect 2nd WebSocket');
    }
    ws.onerror = function () {
        unsuccessfulAlert("Please reload page, websocket failed to load ")
    }
    var timeOnJunair = 0; 
    var timeOnNitro = 0;
    var nitrogenGeneration = 0;
    ws.onmessage = function (message) {
        try {
            var obj = JSON.parse(message.data);
            if (obj.deviceId == "JunAir Pi - Python") {
                sessionStorage.setItem("junairCompOnTimer", Date.now())
                timeOnJunair = timeOnJunair + obj.globalTimeOn;
                document.getElementById("junairCompressorOnTimeContainer").innerHTML= +timeOnJunair.toFixed(2)+"s";
                document.getElementById("junairDutyCycleContainer").innerHTML = +obj.dutyCycle.toFixed(2)+"%";

                if(obj.compState == 1) {
                    document.getElementById("junairStateDisplay").classList.replace("btn-outline-light", "btn-success") 
                    document.getElementById("junairStateDisplay").disabled = false;
                    sessionStorage.setItem("junairCompState", "1");
                }
                else if (obj.compState != 1) {
                    document.getElementById("junairStateDisplay").classList.replace("btn-success", "btn-outline-light")
                    document.getElementById("junairStateDisplay").disabled = true;
                }
               
            } else if  (obj.deviceId == "NitroGen Pi - Python") {
                sessionStorage.setItem("nitrogenCompOnTimer", Date.now())
                timeOnNitro = obj.globalTimeOn;
                nitroGeneration = obj.nitroGeneration;
                document.getElementById("nitrogenCompressorOnTimeContainer").innerHTML= +timeOnNitro.toFixed(2) +"s";
                document.getElementById("nitrogenDutyCycleContainer").innerHTML = +obj.dutyCycle.toFixed(2)+"%";
                document.getElementById("nitrogenGenerationContainer").innerHTML = +nitrogenGeneration.toFixed(2)+"scf";

                if(obj.compState == 1) {
                    document.getElementById("nitrogenStateDisplay").classList.replace("btn-outline-light", "btn-success") 
                    document.getElementById("nitrogenStateDisplay").disabled = false;
                    sessionStorage.setItem("nitrogenCompState", "1");
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

    //makesure if compressor is off, buttons dont say otherwise
    setInterval(setCompOff,100);
    setInterval(readCompState,100);
    
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
            activeList[i].classList.remove("active");
        }
        document.getElementById("jun-airSelectButton").classList.add("active");
        //enable selector
        document.getElementById("chartSelector").classList.remove("disabled");
        closeAllCharts("nitrogen");
        }   
    }
    
    document.getElementById("nitrogenSelectButton").onclick = function(){
        if (this.classList.contains("active")){
            document.getElementById("deviceAlert").classList.remove("d-none");
        }
        else {
            document.getElementById("quickStatsContainerJunair").classList.add("d-none");
            bringBackOpenedCharts("nitrogen");
            var activeListNitro = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
            for (var i=0; i<activeListNitro.length; i++){
                activeListNitro[i].classList.remove("active");
            }
            document.getElementById("nitrogenSelectButton").classList.add("active");
            //enable chart selection
            document.getElementById("chartSelector").classList.remove("disabled");
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
            document.getElementById("chartSelector").classList.remove("disabled");
        }
        else {
            document.getElementById("chartSelector").classList.add("disabled");
            unsuccessfulAlert("Please Select A Device!")
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
                if(!divList[i].classList.contains("shtNitro")){
                    divList[i].classList.remove("d-none");
                    openCharts.push(divList[i]);
                }
            }
        }
    }
});
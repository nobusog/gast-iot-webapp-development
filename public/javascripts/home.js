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
    document.getElementById("ambientButton").onclick = function() {
        if (document.getElementById("junair1SelectButton").classList.contains("active")) {
            document.getElementById("ambientContainerJunair1").classList.remove("d-none");
            openCharts.push(document.getElementById("ambientContainerJunair1"));
        } 
        else if (document.getElementById("junair2SelectButton").classList.contains("active")) {
            document.getElementById("ambientContainerJunair2").classList.remove("d-none");
            openCharts.push(document.getElementById("ambientContainerJunair2"));
        }
    };
    document.getElementById("airtankButton").onclick = function() {
        if (document.getElementById("junair1SelectButton").classList.contains("active")) {
            document.getElementById("airtankContainerJunair1").classList.remove("d-none");
            openCharts.push(document.getElementById("airtankContainerJunair1"));
        } 
        else if (document.getElementById("junair2SelectButton").classList.contains("active")) {
            document.getElementById("airtankContainerJunair2").classList.remove("d-none");
            openCharts.push(document.getElementById("airtankContainerJunair2"));
        }
    };
    document.getElementById("compressorButton").onclick = function() {
        if (document.getElementById("junair1SelectButton").classList.contains("active")) {
            document.getElementById("compressorContainerJunair1").classList.remove("d-none");
            openCharts.push(document.getElementById("compressorContainerJunair1"));
        } 
        else if (document.getElementById("junair2SelectButton").classList.contains("active")) {
            document.getElementById("compressorContainerJunair2").classList.remove("d-none");
            openCharts.push(document.getElementById("compressorContainerJunair2"));
        }
    };
    
    //close junair1.0 charts when button is clicked    
    document.getElementById("ambientCloseButtonJunair1").onclick = function() {
        document.getElementById("ambientContainerJunair1").classList.add("d-none");
    };
    document.getElementById("airtankCloseButtonJunair1").onclick = function() {
        document.getElementById("airtankContainerJunair1").classList.add("d-none");
    };
    document.getElementById("compressorCloseButtonJunair1").onclick = function() {
        document.getElementById("compressorContainerJunair1").classList.add("d-none");
    };

    //close junair2.0 charts when button is clicked
    document.getElementById("ambientCloseButtonJunair2").onclick = function() {
        document.getElementById("ambientContainerJunair2").classList.add("d-none");
    };
    document.getElementById("airtankCloseButtonJunair2").onclick = function() {
        document.getElementById("airtankContainerJunair2").classList.add("d-none");
    };
    document.getElementById("compressorCloseButtonJunair2").onclick = function() {
        document.getElementById("compressorContainerJunair2").classList.add("d-none");
    };

    //open new websocket 
    var ws = new WebSocket('wss://' + location.host);
    ws.onopen = function () {
      console.log('Successfully connect 2nd WebSocket');
    }
    ws.onerror = function () {
        unsuccessfulAlert("Please reload page, websocket failed to load ")
    }
    var timeOnJunair1 = 0; 
    var timeOnJunair2 = 0;
    ws.onmessage = function (message) {
        try {
            var obj = JSON.parse(message.data);
            if (document.getElementById("stateDisplayContainer").childElementCount == 0 ){
                document.getElementById("navbarSystemsDropdown").classList.add("disabled");
            }
            
            if (obj.deviceId == "JunAir 1.0") {
                sessionStorage.setItem("junair1CompOnTimer", Date.now())
                timeOnJunair1 = timeOnJunair1 + obj.globalTimeOn;
                document.getElementById("junair1CompressorOnTimeContainer").innerHTML= +timeOnJunair1.toFixed(2)+"s";
                document.getElementById("junair1DutyCycleContainer").innerHTML = +obj.dutyCycle.toFixed(2)+"%";

                if(obj.compState == 1) {
                    sessionStorage.setItem("junair1CompState", "1");
                    document.getElementById("deviceActiveAlert").classList.remove("d-none");
                    if (!document.getElementById("junair1StateDisplay")) {
                        setActiveDevice("junair1")
                    }    
                }
                else if (obj.compState != 1) {
                    document.getElementById("deviceActiveAlert").classList.add("d-none");
                    if (document.getElementById("junair1DisplayTemp")) {
                        document.getElementById("stateDisplayContainer").removeChild(document.getElementById("junair1DisplayTemp"))
                    }
                }
               
            } else if  (obj.deviceId == "JunAir 2.0") {
                sessionStorage.setItem("junair2CompOnTimer", Date.now())
                timeOnJunair2 = timeOnJunair2 + obj.globalTimeOn;
                document.getElementById("junair2CompressorOnTimeContainer").innerHTML= +timeOnJunair2.toFixed(2)+"s";
                document.getElementById("junair2DutyCycleContainer").innerHTML = +obj.dutyCycle.toFixed(2)+"%";

                if(obj.compState == 1) {
                    sessionStorage.setItem("junair2CompState", "1");
                    document.getElementById("deviceActiveAlert").classList.remove("d-none");
                    if (!document.getElementById("junair2StateDisplay")) {
                        setActiveDevice("junair2")
                    }
                }
                else if (obj.compState != 1) {
                    document.getElementById("deviceActiveAlert").classList.add("d-none");
                    if (document.getElementById("junair2DisplayTemp")) {
                        document.getElementById("stateDisplayContainer").removeChild(document.getElementById("junair2DisplayTemp"))
                    }
                }
               
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    
    /**
     * function to run when the junair1 system is clicked
     */
    document.getElementById("junair1SelectButton").onclick = function(){
    if (this.classList.contains("active")){
        unsuccessfulAlert("This device is already active!")
    }
    else {
        bringBackOpenedCharts("junair1")
        var activeList = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
        for (var i=0; i<activeList.length; i++){
            activeList[i].classList.remove("active");
        }
        document.getElementById("junair1SelectButton").classList.add("active");
        //enable selector
        document.getElementById("chartSelector").classList.remove("disabled");
        closeAllCharts("junair2");
        }   
    }
    
    /**
     * function to run when the junair2 system button is clicked
     */
    document.getElementById("junair2SelectButton").onclick = function(){
        if (this.classList.contains("active")){
            unsuccessfulAlert("This device is already active!")
        }
        else {
            bringBackOpenedCharts("junair2");
            var activeListNitro = document.getElementById("deviceSelectContainer").getElementsByClassName("nav-link");
            for (var i=0; i<activeListNitro.length; i++){
                activeListNitro[i].classList.remove("active");
            }
            document.getElementById("junair2SelectButton").classList.add("active");
            //enable chart selection
            document.getElementById("chartSelector").classList.remove("disabled");
            closeAllCharts("junair1");
        }
    }

    
    /*Device Select Alerts
    */
    //check if device is selected before letting user select charts
    document.getElementById("chartSelector").onclick = function(){
        if (document.getElementById("junair1SelectButton").classList.contains("active") || document.getElementById("junair2SelectButton").classList.contains("active")) {
            document.getElementById("chartSelector").classList.remove("disabled");
        }
        else {
            document.getElementById("chartSelector").classList.add("disabled");
            unsuccessfulAlert("Please Select A Device!")
        }
    }
    
    document.getElementById("closeAllChartsButton").onclick = function () {
        if (document.getElementById("junair1SelectButton").classList.contains("active")){
            closeAllCharts("junair1");
            for (i=0; i<openCharts.length; i++){
                if (openCharts[i]) {
                    if (openCharts[i].classList.contains("junair1")){
                        delete openCharts[i];
                    }
                }
            }
        }

        else if (document.getElementById("junair2SelectButton").classList.contains("active")){
            closeAllCharts("junair2");
            for (i=0; i<openCharts.length; i++){
                if (openCharts[i]) {
                    if (openCharts[i].classList.contains("junair2")){
                        delete openCharts[i];
                    }
                }
            }
        }
    }

    

    //open all charts when button is pressed 
    document.getElementById("openAllChartsButton").onclick = function () {
        if(document.getElementById("junair1SelectButton").classList.contains("active")) {
            divList = document.getElementById("junair1").getElementsByTagName("div");
        } 
        else if (document.getElementById("junair2SelectButton").classList.contains("active")) {
            divList = document.getElementById("junair2").getElementsByTagName("div"); 
        }
        for (var i=0; i<divList.length; i++) {
            if (divList[i].classList.contains("chartContainer")) {
                    divList[i].classList.remove("d-none");
                    openCharts.push(divList[i]);
            }
        }
    }
});
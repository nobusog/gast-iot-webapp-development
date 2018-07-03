var activeDevice
$(document).ready(function () {
    document.getElementById("settingsButton").onclick = function () {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("settingsPage").classList.remove("d-none");
        document.getElementById("homeButtonContainer").classList.remove("active");
        document.getElementById("settingsButtonContainer").classList.add("active"); 
    }

    document.getElementById("settingsJunairSelectButton").onclick = function() {
        document.getElementById("settingsJunairSelectButton").classList.replace("btn-secondary", "btn-primary");
        document.getElementById("settingsNitrogenSelectButton").classList.replace("btn-primary", "btn-secondary");
        document.getElementById("settingsJunairSelectButton").classList.add("active");
        document.getElementById("settingsNitrogenSelectButton").classList.remove("active");
    }

    document.getElementById("settingsNitrogenSelectButton").onclick = function() {
        document.getElementById("settingsNitrogenSelectButton").classList.add("active");
        document.getElementById("settingsJunairSelectButton").classList.remove("active");
        document.getElementById("settingsNitrogenSelectButton").classList.replace("btn-secondary", "btn-primary");
        document.getElementById("settingsJunairSelectButton").classList.replace("btn-primary", "btn-secondary");
    }

    document.getElementById("quickStatSettingsTab").onclick = function() {
        hideAllTabs ();
        document.getElementById("quickStatsSettings").classList.remove("d-none");
    }

    document.getElementById("reportsSettingsTab").onclick = function() {
        hideAllTabs ();
        document.getElementById("reportsSettings").classList.remove("d-none");
    }

    function hideAllTabs () {
        tabList = document.getElementsByClassName("settingsTab");
        for (var i=0; i<tabList.length; i++) {
            tabList[i].classList.add("d-none");
        }
    }
    
    //Find out and save which device is selected into the deviceIdVal variavble.
    var deviceIdVal
    document.getElementById("settingsDeviceSelectModalCenter").onchange = function() {
    if (document.getElementById("settingsJunairSelectButton").classList.contains("active")) {
        deviceIdVal = "junair";
    }
    else if (document.getElementById("settingsNitrogenSelectButton").classList.contains("active")) {
        deviceIdVal = "nitrogen";
    }};

    document.getElementById("reportRequestForm").onsubmit = function (e) {
        // stop the regular form submission
        e.preventDefault();

        var reportLengthStr;
        var emailVal = document.getElementById("reportEmailInput").value;
        var reportLengthVal = document.getElementById("reportLengthOptions").options[document.getElementById("reportLengthOptions").selectedIndex].value ;
        
        //check the report length and provide a time variable for search purposes
        var currentTime, startTime;
        currentTime = Date.now();
        switch (reportLengthVal) {
            case "0": 
                startTime = currentTime - 3600000;
                reportLengthStr = "Last Hour"
                break;
            case "1":
                startTime = currentTime - 86400000 ;
                reportLengthStr = "Last 24 Hours"
                break;
            case "2":
                startTime = currentTime - 604800000 ;
                reportLengthStr = "Last Week"
                break;
            default:
                startTime = 0;
                reportLengthStr = "Entire History"
            
        }

        // construct an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://prod-07.centralus.logic.azure.com:443/workflows/788b169d20d44be5a51d369c420c7a0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PxYwwSMdUouEGwRUhaeP48BcJwSPX_2d9sO2vBeUWlU", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // Define what happens on successful data submission
        xhr.addEventListener("load", function(event) {
            successfulAlert("Request Sent Successfully");
            reportLogUpdate(emailVal, deviceIdVal)
        });

        // Define what happens in case of error
        xhr.addEventListener("error", function(event) {
            unsuccessfulAlert('Oops! Something went wrong.');
        });
        // send the collected data as JSON
        xhr.send(JSON.stringify({"devicdeId": deviceIdVal, "email": emailVal, "reportLength": reportLengthVal, "currentTime": currentTime, "startTime": startTime, "reportLengthStr": reportLengthStr}));

        xhr.onloadend = function () {
            // done
        };
    }; 

    document.getElementById("reportLogRequestForm").onsubmit = function (e) {
        e.preventDefault();
        var emailVal = document.getElementById("reportLogEmailInput").value;
        // construct an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://prod-29.centralus.logic.azure.com:443/workflows/d705e2f89c714802bec1090086029f44/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Fq2zUaQlmDRsY3aPj5MQo0BQM4hA73QRuBBizDBoOac", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // Define what happens on successful data submission
        xhr.addEventListener("load", function(event) {
            successfulAlert("Request Sent Successfully");
        });

        // Define what happens in case of error
        xhr.addEventListener("error", function(event) {
            unsuccessfulAlert('Oops! Something went wrong.');
        });

        console.log(JSON.stringify({"devicdeId": deviceIdVal, "email": emailVal}));
        // send the collected data as JSON
        xhr.send(JSON.stringify({"devicdeId": deviceIdVal, "email": emailVal}));

    }
    document.getElementById("quickStatsCustomizer").onchange = function() {
        var maxSelected = 5;
        var allElements = this.querySelectorAll('input[type="checkbox"]')
        var selectedElements = this.querySelectorAll('input[type="checkbox"]:checked');
        var unSelectedElements = this.querySelectorAll('input[type="checkbox"]:not(:checked)');

        if (selectedElements.length >= 5) {
            for (var i=0; i<unSelectedElements.length; i++){
                if (unSelectedElements[i]) {
                    unSelectedElements[i].disabled = true;
        }}}
        else {
            for (var i=0; i<allElements.length; i++){
                if (allElements[i]) {
                    allElements[i].disabled = false;
        }}}
    }

    document.getElementById("quickStatsCustomizer").onsubmit = function(e) {
        e.preventDefault();

        var selectedElements = this.querySelectorAll('input[type="checkbox"]:checked');
        if (document.getElementById("settingsJunairSelectButton").classList.contains("active")) {
            var carouselElemnts = document.getElementById("junairCarouselContainer").getElementsByTagName("p");
        }
        else if (document.getElementById("settingsNitrogenSelectButton").classList.contains("active")){
            var carouselElemnts = document.getElementById("nitrogenCarouselContainer").getElementsByTagName("p");
        }
        
        for (var i=0; i<selectedElements.length; i++) {
            carouselElemnts[i].innerHTML = selectedElements[i].value;
        }
    }

});
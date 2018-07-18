var activeDevice
var deviceIdVal
$(document).ready(function () {
    document.getElementById("settingsButton").onclick = function () {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("systemsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("settingsPage").classList.remove("d-none");
        document.getElementById("homeButtonContainer").classList.remove("active");
        document.getElementById("settingsButtonContainer").classList.add("active"); 
        if (document.getElementById("settingsJunair1SelectButton").classList.contains("active")) {
            setHeadersSettings("junair1");
        }    
        else if (document.getElementById("settingsJunair2SelectButton").classList.contains("active")) {
            setHeadersSettings("junair2");
        }
    }

    document.getElementById("settingsJunair1SelectButton").onclick = function() {
        document.getElementById("settingsJunair1SelectButton").classList.replace("btn-secondary", "btn-primary");
        document.getElementById("settingsJunair2SelectButton").classList.replace("btn-primary", "btn-secondary");
        document.getElementById("settingsJunair1SelectButton").classList.add("active");
        document.getElementById("settingsJunair2SelectButton").classList.remove("active");
        deviceIdVal = "junair1";
        setHeadersSettings("junair1");
    }

    document.getElementById("settingsJunair2SelectButton").onclick = function() {
        document.getElementById("settingsJunair2SelectButton").classList.add("active");
        document.getElementById("settingsJunair1SelectButton").classList.remove("active");
        document.getElementById("settingsJunair2SelectButton").classList.replace("btn-secondary", "btn-primary");
        document.getElementById("settingsJunair1SelectButton").classList.replace("btn-primary", "btn-secondary");
        deviceIdVal = "junair2";
        setHeadersSettings("junair2");   
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
});
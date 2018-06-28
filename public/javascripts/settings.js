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
    }

    document.getElementById("settingsNitrogenSelectButton").onclick = function() {
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

    function successfulAlert (words) {
        document.getElementById("settingsSuccessfulAlertText").innerHTML = words;
        document.getElementById("settingsSuccessfulAlert").classList.remove("d-none");
        setTimeout(function() {
            document.getElementById("settingsSuccessfulAlert").classList.add("d-none");
        },5000)
    }

    var form = document.getElementById("reportRequestForm");

    form.onsubmit = function (e) {
        // stop the regular form submission
        e.preventDefault();

        var deviceIdVal
        var emailVal = document.getElementById("reportEmailInput").value;
        var reportLengthVal = document.getElementById("reportLengthOptions").options[document.getElementById("reportLengthOptions").selectedIndex].value ;
        if (document.getElementById("settingsJunairSelectButton").classList.contains("active")) {
            console.log("i see junair");
            deviceIdVal = "junair";
        }
        else if (document.getElementById("settingsNitrogenSelectButton").classList.contains("active")) {
            console.log("i see nitrogen");
            deviceIdVal = "nitrogen";
        }

        // construct an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://prod-07.centralus.logic.azure.com:443/workflows/788b169d20d44be5a51d369c420c7a0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PxYwwSMdUouEGwRUhaeP48BcJwSPX_2d9sO2vBeUWlU", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // Define what happens on successful data submission
        xhr.addEventListener("load", function(event) {
            successfulAlert("Request Sent Successfully");
        });

        // Define what happens in case of error
        xhr.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        console.log(JSON.stringify({"devicdeId": "junair", "email": emailVal, "reportLength": reportLengthVal}));
        // send the collected data as JSON
        xhr.send(JSON.stringify({"devicdeId": "junair", "email": emailVal, "reportLength": reportLengthVal}));

        xhr.onloadend = function () {
            // done
        };
    }; 
});
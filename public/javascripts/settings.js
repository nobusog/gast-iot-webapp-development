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
            tabList[i].classList.add("d-none")
        }
    }

    function successfulAlert (words) {
        document.getElementById("settingsSuccessfulAlertText").innerHTML = words
        document.getElementById("settingsSuccessfulAlert").classList.remove("d-none")
        setTimeout(function() {
            document.getElementById("settingsSuccessfulAlert").classList.add("d-none")
        },5000)
    }

    function sendData() {
        var XHR = new XMLHttpRequest();
    
        // Bind the FormData object and the form element
        var FD = new FormData(form);
        if  (document.getElementById("settingsJunairSelectButton").classList.contains("active")) {
            FD.append("Junair") 
        }
        else if (document.getElementById("settingsNitrogenSelectButton").classList.contains("active")){
            FD.append("Nitrogen") 
        }
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            successfulAlert("Request Sent Successfully");
        });
    
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
    
        // Set up our request
        XHR.open("POST", "https://prod-12.northcentralus.logic.azure.com:443/workflows/187c76b9f18f48dab7a84882ca8eb0ea/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sKpeLDmUbUw2xmdEls2ZDec-QNv6jwHTCnzUea9ahxs");
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        }
    
        // Access the form element...
        var form = document.getElementById("reportRequestForm");
    
        // ...and take over its submit event.
        form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        sendData();
    });

});
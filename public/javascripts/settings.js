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
});
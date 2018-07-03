var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;

function chartDumper(array, str) {
    savedArray = JSON.parse(localStorage.getItem(str));
    if (savedArray) {
        for (var i=0; i<savedArray.length; i++){
            array[i] = savedArray[i]
        }
    }
}

function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
  }

function chartSaver (array, str) {
    if (array) {
        arrayJSON = JSON.stringify(array);
        localStorage.setItem(str, arrayJSON)
    }
}

function setCompOff () {
    var currentTime = Date.now();
    var junairLastTime = sessionStorage.getItem("junairCompOnTimer");
    if ((currentTime - junairLastTime) > 5000) {
        sessionStorage.setItem("junairCompState", 0);
    }
    var nitrogenLastTime = sessionStorage.getItem("nitrogenCompOnTimer");
    if ((currentTime - nitrogenLastTime) > 5000) {
        sessionStorage.setItem("nitrogenCompState", 0);
    }
}

function readCompState() {
    if (sessionStorage.getItem("junairCompState") == 0) {
        document.getElementById("junairStateDisplay").classList.replace("btn-success", "btn-outline-light");
    }
    if (sessionStorage.getItem("nitrogenCompState") == 0) {
        document.getElementById("nitrogenStateDisplay").classList.replace("btn-success", "btn-outline-light")
    }
}

function reportLogUpdate (email, deviceId) {
    var newRow = document.createElement("tr");
    var currentTime =  new Date().toLocaleString();
    document.getElementById("reportLogTableBody").appendChild(newRow);
    newRow.innerHTML = "<th scope='row'></th><td>" +email+"</td><td>" +currentTime+ "</td><td>" +deviceId+ "</td>"                      
}

function successfulAlert (words) {
    document.getElementById("successfulAlertText").innerHTML = words;
    document.getElementById("successfulAlert").classList.remove("d-none");
    setTimeout(function() {
        document.getElementById("successfulAlert").classList.add("d-none");
    },5000)
}

function unsuccessfulAlert (words) {
    document.getElementById("unsuccessfulAlertText").innerHTML = words;
    document.getElementById("unsuccessfulAlert").classList.remove("d-none");
    setTimeout(function() {
        document.getElementById("unsuccessfulAlert").classList.add("d-none");
    },5000)
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
}}}

//function that resores open charts from the open charts array
function bringBackOpenedCharts (chart) {
    for (i=0; i<openCharts.length; i++) {
        if (openCharts[i]) {
            if (openCharts[i].classList.contains(chart)){
                openCharts[i].classList.remove("d-none");
}}}}

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

//sets headers for the quickstats and reports tabs on the sttings page
function setHeadersSettings (system) {
    switch (system) {
        case "junair":
        console.log("got junair yayyy");
            document.getElementById("settingsQuickStatsHeader").innerText = "Jun-Air Quick Stat Settings";
            document.getElementById("settingsReportsHeader").innerText = "Jun-Air Report Settings";
        case "nitrogen":
        console.log("got nitrogen yayyyy");
            document.getElementById("settingsQuickStatsHeader").innerText = "NitroGen Quick Stat Settings";
            document.getElementById("settingsReportsHeader").innerText = "NitroGen Report Settings";
        default:
    }
}
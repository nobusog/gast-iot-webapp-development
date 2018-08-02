/**
 * In this file you'll find functions that called in the rest of the webapp
 * i put them here for ease of location. Every function will have a short 
 * description of what it does of course.
 */

var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;


/**
 * This function takes the specified array (by the first parameter) converts it to a string 
 * then saves it to the users local storage under the key specified by the second
 * parameter
 * @param {array} array 
 * @param {string} str 
 */
function chartSaver (array, str) {
    if (array) {
        arrayJSON = JSON.stringify(array);
        localStorage.setItem(str, arrayJSON)
    }
}
/**
 * This function gets the saved array from the last session (stored by chartSaver) 
 * specified by the second parameter and passess them into the array specified 
 * by the first parameter.
 * @param {array} array 
 * @param {string} str 
 */
function chartDumper(array, str) {
    savedArray = JSON.parse(localStorage.getItem(str));
    if (savedArray) {
        for (var i=0; i<savedArray.length; i++){
            array[i] = savedArray[i]
        }
    }
}
/**
 * This function takes an array of charts and updates them using the "update function" from chart.js
 * @param {array} array 
 */
function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
  }
/**
 * This functionchecks if a specified system is off and if so returns true, else it will return false.
 * @param {string} system 
 */
function isCompOff (system) {
    var currentTime = Date.now();
    switch (system) {
        case "junair1":
            var junair1LastTime = sessionStorage.getItem("junair1CompOnTimer");
            if ((currentTime - junair1LastTime) > 5000) {
                return true;
            }
            break;
        case "junair2":
            var junair2LastTime = sessionStorage.getItem("junair2CompOnTimer");
            if ((currentTime - junair2LastTime) > 5000) {
                return true;
            }
            break;
        default:
            return false;
}}
/**
 * This function checks if the system is off and if so sets a compstate variable 
 * in the users session storage to 0.
 */
function setCompOff () {
    if (isCompOff("junair1")) {
        sessionStorage.setItem("junair1CompState", 0);
    }
    if (isCompOff("junair2")) {
        sessionStorage.setItem("junair2CompState", 0);
}}
/**
 * This function updates the users screen when any of the systems turn off by sending them to another 
 * more relevant page.
 */
function systemsCompStateUpdate() {
    if (isCompOff("junair1") && !isCompOff("junair2")) {
        document.getElementById("junair1SystemContainer").classList.add("d-none");
        document.getElementById("junair2SystemContainer").classList.remove("d-none");
    }
    if (isCompOff("junair2") && !isCompOff("junair")) {
        document.getElementById("junair2SystemContainer").classList.add("d-none");
        document.getElementById("junair1SystemContainer").classList.remove("d-none");
    }
    if (isCompOff("junair1") && isCompOff("junair2")){
        document.getElementById("homeButton").click();
}}
/**
 * This function checks the session storage to see if a compressor is off and if so, 
 * turns off and dsiabled the display button located on the main navbar.
 */
function readCompState() {
    if (sessionStorage.getItem("junair1CompState") == 0) {
        document.getElementById("junair1StateDisplay").classList.replace("btn-success", "btn-outline-secondary");
        document.getElementById("junair1StateDisplay").disabled = true;
    }
    if (sessionStorage.getItem("junair2CompState") == 0) {
        document.getElementById("junair2StateDisplay").classList.replace("btn-success", "btn-outline-secondary");
        document.getElementById("junair2StateDisplay").disabled = true;
    }
}
/**
 * This function updates the report log whenever a request for system reporyt is made
 * @param {string} email 
 * @param {string} deviceId 
 */
function reportLogUpdate (email, deviceId) {
    var newRow = document.createElement("tr");
    var currentTime =  new Date().toLocaleString();
    document.getElementById("reportLogTableBody").appendChild(newRow);
    newRow.innerHTML = "<th scope='row'></th><td>" +email+"</td><td>" +currentTime+ "</td><td>" +deviceId+ "</td>"                      
}
/**
 * Generic alert bar colored green for showing positive alerts. Fades after 5 seconds
 * @param {string} words 
 */
function successfulAlert (words) {
    document.getElementById("successfulAlertText").innerHTML = words;
    document.getElementById("successfulAlert").classList.remove("d-none");
    setTimeout(function() {
        document.getElementById("successfulAlert").classList.add("d-none");
    },5000)
}
/**
 * Generic alert bar colored red for showing negative alerts. Fades after 5 seconds
 * @param {string} words 
 */
function unsuccessfulAlert (words) {
    document.getElementById("unsuccessfulAlertText").innerHTML = words;
    document.getElementById("unsuccessfulAlert").classList.remove("d-none");
    setTimeout(function() {
        document.getElementById("unsuccessfulAlert").classList.add("d-none");
    },5000)
}
/**
 * This function closes any open charts for the selected system
 * @param {string} selected 
 */
function closeAllCharts (selected) {
    if (selected === "junair1") {
        divList = document.getElementById("junair1").getElementsByTagName("div"); 
    }
    else if (selected === "junair2") {
        divList = document.getElementById("junair2").getElementsByTagName("div"); 
    }
    for (var i=0; i<divList.length; i++) {
        if (divList[i].classList.contains("chartContainer")) {
            divList[i].classList.add("d-none");
}}}

/**
 * This function restores any opened charts that where closed when user switched between system tabs(on the home page).
 * @param {string} chart 
 */
function bringBackOpenedCharts (chart) {
    for (i=0; i<openCharts.length; i++) {
        if (openCharts[i]) {
            if (openCharts[i].classList.contains(chart)){
                openCharts[i].classList.remove("d-none");
}}}}
/**
 * Removes a specific chart from the open charts list and closes it.
 * @param {string} chart 
 */
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

/**
 * Sets the headers on the reports and quickstats pages (within the settings page) so that the user always know which 
 * device is selected.
 * @param {string} system 
 */
function setHeadersSettings (system) {
    switch (system) {
        case "junair1":
            document.getElementById("settingsReportsHeader").innerText = "Jun-Air1 Report Settings";
            break;
        case "junair2":
            document.getElementById("settingsReportsHeader").innerText = "junair2 Report Settings";
            break;
        default:
            unsuccessfulAlert("errorr in selecting system");
    }
}

/**
 * This function takes either "junair1" or "junair2" and updates the active device dropdown accordingly.
 * @param {string} string 
 */
function setActiveDevice (string) {
    switch (string) {
        case "junair1":
            var newTag = document.createElement("a");
            document.getElementById("stateDisplayContainer").appendChild(newTag);
            newTag.classList.add("dropdown-item");
            newTag.id = "junair1DisplayTemp";
            newTag.href = "#";
            newTag.innerHTML = "<button id='junair1StateDisplay' type='button' class='btn btn-outline-success mx-2 disabled'>Jun-Air OF302 1.0</button>";
            document.getElementById("navbarSystemsDropdown").classList.remove("disabled");
            break;
            
        case "junair2":
            var newTag = document.createElement("a");
            document.getElementById("stateDisplayContainer").appendChild(newTag);
            newTag.classList.add("dropdown-item");
            newTag.id = "junair2DisplayTemp";
            newTag.href = "#";
            newTag.innerHTML = "<button id='junair1StateDisplay' type='button' class='btn btn-outline-success mx-2 disabled'>Jun-Air OF302 2.0</button>";
            document.getElementById("navbarSystemsDropdown").classList.remove("disabled");
            break;

        default:
    }
}


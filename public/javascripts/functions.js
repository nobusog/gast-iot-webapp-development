var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;

function chartDumper(array, str) {
    var arrayString = localStorage.getItem(str);
    if (arrayString){
        var arrayOfStrings = arrayString.split(",%:");
        var n =0;
        for (var i=0; i<arrayOfStrings.length; i++) {
            if (parseInt(arrayOfStrings[i],10) != NaN && arrayOfStrings[i] != "" && arrayOfStrings[i] != null && arrayOfStrings[i] != NaN) {
                array[n] =parseInt(arrayOfStrings[i],10);
                n++ ;
            }   
        }
    }
    console.log(array)
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
  }

function chartSaver (array, str) {
    var arrayString;
    if (array[0] != null & typeof str == "string") {
        for (var i=0; i<array.length; i++) {
            if (array[i] != NaN && array[i] != null && typeof array[i] == "number")
            arrayString = arrayString +",%:"+ array[i];
        }
        localStorage.setItem(str, arrayString);
    }
}

function setCompOff () {
    sessionStorage.setItem("junairCompState", "0");
    sessionStorage.setItem("nitrogenCompState", "0");
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


var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;

function chartDumper(array, str) {
    savedArray = JSON.parse(localStorage.getItem(str));
    for (var i=0; i<savedArray.length; i++){
        array[i] = savedArray[i]
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


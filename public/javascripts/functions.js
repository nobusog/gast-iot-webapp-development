var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;

function chartDumper(array, str) {
    var arrayString = localStorage.getItem(str);
    var arrayOfStrings = arrayString.split(",:");
    console.log(arrayOfStrings)
    var n =0;
    for (var i=0; i<arrayOfStrings.length; i++) {
        if (arrayOfStrings != "NaN" || arrayOfStrings != "") {
            array[n] =parseInt(escapeHtml(arrayOfStrings[i]),10);
            n++ ;
        }   
    }
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
    var arrayString = "";
    if (array[0] != null & typeof str == "string") {
        for (var i=0; i<array.length; i++) {
            arrayString = arrayString +",:"+ array[i];
        }
        console.log(arrayString)
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
    else if (sessionStorage.getItem("nitrogenCompState") == 0) {
        document.getElementById("nitrogenStateDisplay").classList.replace("btn-success", "btn-outline-light")
    }
}
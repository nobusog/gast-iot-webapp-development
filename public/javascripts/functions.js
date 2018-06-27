var storage = window.localStorage;

function chartDumper(array, str) {
    var arrayString = storage.getItem(str);
    var arrayOfStrings = arrayString.split(",:");
    console.log(arrayOfStrings)
    for (var i=0; i<arrayOfStrings.length; i++) {
        array[i] =parseInt(escapeHtml(arrayOfStrings[i]),10);
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
        storage.setItem(str, arrayString);
    }
}


var storage = window.localStorage;

function chartDumper(array, str) {
    var arrayStrineg = "";
    if (array[0] != null & typeof str == "string") {
        for (var i=0; i<array.length; i++) {
            arrayStrineg = arrayStrineg +","+ array[i];
        }
        console.log(arrayStrineg)
    }
    var arrayString = storage.getItem(str);
    var arrayOfStrings = arrayString.split(",");
    console.log(arrayOfStrings)
    for (var i=0; i<arrayOfStrings.length; i++) {
        array[i] =parseInt(arrayOfStrings[i],10);
    }
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
            arrayString = arrayString +","+ array[i];
        }
        console.log(arrayString)
        storage.setItem(str, arrayString);
    }
}


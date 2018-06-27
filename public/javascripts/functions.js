var storage = window.localStorage;

function chartDumper(array, str) {
    if (typeof str == "string") {
        var arry = storage.getItem(str);
        console.log(arry)
        if (arry != null){
            if (array.length <= 50) {
                for (var n=0; n<arry.length; n++) {
                array.push(arry[n]);
                }
            } else {
                for (var n=0; n<=50; n++) {
                array.push(arry[n]);
                }
            } 
        }
    }
}

function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
  }

  function chartSaver (array, str) {
    if (array != null) {
        var arrayString = JSON.stringify(array);
        console.log(arrayString);
        storage.setItem(str, arrayString);
    }
}


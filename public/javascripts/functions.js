var storage = window.localStorage;

function chartDumper(array, str) {
    if (typeof str == "string") {
        var arry = JSON.parse(storage.getItem(str));
        if (arry != null){    
            var newArray =[];
            for(var i=0; i<arry.length; i++) {
                newArray[i] = arry[i]
            }
            console.log(newArray)
            if (array.length <= 50) {
                for (var n=0; n<newArray.length; n++) {
                array.push(newArray[n]);
                }
            } else {
                for (var n=0; n<=50; n++) {
                array.push(newArray[n]);
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
        arrayObject = Object.assign({}, array)
        console.log(arrayObject)
        var arrayString = JSON.stringify(arrayObject);
        console.log(arrayString);
        storage.setItem(str, arrayString);
    }
}


function chartDumper(array, str) {
    for (var i=0; i<array.length; i++) {
        var arry = JSON.parse(window.localStorage.getItem(str[i]));
        console.log(window.localStorage.getItem(str[i]));
        if (arry != null){
            if (arry.length <= 50) {
                for (var n=0; n<arry.length; n++) {
                array[i].push(arry[n]);
                }
            } else {
                for (var n=0; n<=50; n++) {
                array[i].push(arry[n]);
                }
            } 
        }
    }
}

function chartSaver (array,str) {
    for (var i=0; i<array.length; i++){
        var arrayString = JSON.stringify(array[i]);
        if (arrayString != null) {
            window.localStorage.setItem(str[i], arrayString);
        }
    }
    console.log("saved");
}

function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
}




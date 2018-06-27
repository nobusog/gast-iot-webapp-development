function chartDumper(array, str) {
    for (var i=0; i<array.length; i++) {
        var arry = JSON.parse(window.localStorage.getItem(str[i]));
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
        console.log(arrayString)
        window.localStorage.setItem(str[i], arrayString);
    }
}

function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
}




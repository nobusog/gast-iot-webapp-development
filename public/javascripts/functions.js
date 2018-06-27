function chartDumper(array, str) {
var arry = JSON.parse(window.localStorage.getItem(str));
console.log(window.localStorage.getItem(str))
if (arry != null){
if (array.length <= 50) {
    for (var n=0; n<arry.length; n++) {
    array.push(arry.n);
    }
} else {
    for (var n=0; n<=50; n++) {
    array.push(arry.n);
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
    console.log(array)
    if (array != null) {
        var arrayString = JSON.stringify(array);
        console.log(arrayString);
        window.localStorage.setItem(str, arrayString);
    }
}

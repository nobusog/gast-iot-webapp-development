$(document).ready(function () {
    //Show charts when button is clicked
    document.getElementById("bme280Button").onclick = function() {
        document.getElementById("bmeContainer").classList.remove("d-none")
    };
})
$(document).ready(function () {
    document.getElementById("settingsButton").onclick = function () {
        document.getElementById("page").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none")
    }

    document.getElementById("homeButton").onclick = function () {
        document.getElementById("page").classList.remove("d-none");
        document.getElementById("chartSelector").classList.remove("d-none")
    }
});
$(document).ready(function () {

    document.getElementById("junairStateDisplay").onclick = function() {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("systemsPage").classList.remove("d-none");
        document.getElementById("nitrogenSystemContainer").classList.add("d-none");
        document.getElementById("junairSystemContainer").classList.remove("d-none");
    }

    document.getElementById("nitrogenStateDisplay").onclick = function() {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("systemsPage").classList.remove("d-none");
        document.getElementById("nitrogenSystemContainer").classList.remove("d-none");
        document.getElementById("junairSystemContainer").classList.add("d-none");
    }
})
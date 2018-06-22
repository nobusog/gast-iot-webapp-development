$(document).ready(function () {
    document.getElementById("settingsButton").onclick = function () {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("settingsPage").classList.remove("d-none");
        document.getElementById("homeButtonContainer").classList.remove("active");
        document.getElementById("settingsButtonContainer").classList.add("active"); 
    }
});
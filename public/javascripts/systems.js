$(document).ready(function () {
    /**
     * opens the systems pages when the device select buttons are double clikced
     */
    document.getElementById("junair1SelectButton").ondblclick = function(){
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("systemsPage").classList.remove("d-none");
        document.getElementById("junair2SystemContainer").classList.add("d-none");
        document.getElementById("junair1SystemContainer").classList.remove("d-none");
    }

    document.getElementById("junair2SelectButton").ondblclick = function(){
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("systemsPage").classList.remove("d-none");
        document.getElementById("junair2SystemContainer").classList.remove("d-none");
        document.getElementById("junair1SystemContainer").classList.add("d-none");
    }

    function readStatusString (arr) {
        
    }


})
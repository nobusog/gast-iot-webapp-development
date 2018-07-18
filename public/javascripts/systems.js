$(document).ready(function () {
    /**
     * this makes sure that when the nitrogen or junair button is active and clicked, we get the home page, settings page  
     * and chart selector option on the main nav out of the way. we then show the nitrogen systems page and close junairs 
     * for a nitrogen button click. for a junair click we do the opposite
     */
    if ( document.getElementById("junair1StateDisplay")){
        document.getElementById("junair1StateDisplay").onclick = function() {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("systemsPage").classList.remove("d-none");
        document.getElementById("junair2SystemContainer").classList.add("d-none");
        document.getElementById("junair1SystemContainer").classList.remove("d-none");
    }}
    
    if ( document.getElementById("junair2StateDisplay")){    
        document.getElementById("junair2StateDisplay").onclick = function() {
        document.getElementById("homePage").classList.add("d-none");
        document.getElementById("settingsPage").classList.add("d-none");
        document.getElementById("chartSelector").classList.add("d-none");
        document.getElementById("systemsPage").classList.remove("d-none");
        document.getElementById("junair2SystemContainer").classList.remove("d-none");
        document.getElementById("junair1SystemContainer").classList.add("d-none");
    }}
})
$(document).ready(function () {
    /**
     * this makes sure that when the nitrogen or junair button is active and clicked, we get the home page, settings page  
     * and chart selector option on the main nav out of the way. we then show the nitrogen systems page and close junairs 
     * for a nitrogen button click. for a junair click we do the opposite
     */
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
    /**
     * wait for either compressor to go off then call systemsCompStateUpdate[@functions.js]
     */
    var junairDisplayStateObserver = new MutationObserver(systemsCompStateUpdate);
    var nitrogenDisplayStateObserver = new MutationObserver(systemsCompStateUpdate);
    var displayStateConfig = { attributes: true};
    var junairObserverTarget= document.getElementById("junairStateDisplay");
    var nitrogenObserverTarget = document.getElementById("nitrogenStateDisplay");
    junairDisplayStateObserver.observe(junairObserverTarget, displayStateConfig);
    nitrogenDisplayStateObserver.observe(nitrogenObserverTarget, displayStateConfig);

})
// ==UserScript==
// @name         AVM Fax Multiple Pictures
// @namespace    http://tampermonkey.net/
// @version      2024-09-27
// @description  try to take over the world!
// @author       Stephan aus dem Hause h.
// @match        http*://fritz.box/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funttion, create timestamp
    function logWithTimestamp(message) {
        const timestamp = new Date().toLocaleString(); // get date and time
        console.log(`[${timestamp}] ${message}`);
    }

    // function, add the "multiple"-Attribut
    function addMultipleAttribute() {
        var fileInput = document.getElementById("uiFile");

        if (fileInput) {
            // check, if the "multiple" Attribut exists
            if (!fileInput.hasAttribute("multiple")) {
                fileInput.setAttribute("multiple", "multiple");
                logWithTimestamp("Attribut 'multiple' added!");
            } else {
                logWithTimestamp("Attribut 'multiple' exists.");
            }
        } else {
            logWithTimestamp("Input-Element not found.");
        }
    }

    // function, track DOM changes
    function observeDOMChanges() {
        // select the attribute to track
        var targetNode = document.body;

        // configure the bbserver: track child objects
        var config = { childList: true, subtree: true };

        // callback-function, run by DOM-changes
        var callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    logWithTimestamp("DOM change. try, to add the Attribut 'multiple'.");
                    addMultipleAttribute(); // Versuche erneut, das Attribut hinzuzufügen
                }
            }
        };

        // create and run a mutation observer
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    // init script, if the page will loaded
    window.onload = function() {
        logWithTimestamp("Page loaded. Start Script.");

        // add the "multiple"-Attribut
        addMultipleAttribute();

        // watch the DOM-changes
        observeDOMChanges();
    };

})();

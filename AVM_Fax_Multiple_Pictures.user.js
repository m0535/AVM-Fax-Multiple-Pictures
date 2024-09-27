// ==UserScript==
// @name         AVM Fax Multiple Pictures
// @namespace    http://tampermonkey.net/
// @version      2024-09-27
// @description  try to take over the world!
// @author       Stephan aus dem Hause hafiz
// @match        http*://fritz.box/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion, um einen Zeitstempel zu erstellen
    function logWithTimestamp(message) {
        const timestamp = new Date().toLocaleString(); // Holt das aktuelle Datum und die Uhrzeit
        console.log(`[${timestamp}] ${message}`);
    }

    // Funktion, die das "multiple"-Attribut hinzufügt
    function addMultipleAttribute() {
        var fileInput = document.getElementById("uiFile");

        if (fileInput) {
            // Prüfe, ob das "multiple" Attribut bereits gesetzt ist
            if (!fileInput.hasAttribute("multiple")) {
                fileInput.setAttribute("multiple", "multiple");
                logWithTimestamp("Attribut 'multiple' hinzugefügt!");
            } else {
                logWithTimestamp("Attribut 'multiple' bereits vorhanden.");
            }
        } else {
            logWithTimestamp("Input-Element nicht gefunden.");
        }
    }

    // Funktion, um Änderungen im DOM zu überwachen
    function observeDOMChanges() {
        // Wähle das Element, dessen Änderungen beobachtet werden sollen
        var targetNode = document.body;

        // Konfiguriere den Observer: Wir beobachten Änderungen an Kindknoten und an der Struktur
        var config = { childList: true, subtree: true };

        // Callback-Funktion, die bei DOM-Änderungen ausgeführt wird
        var callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    logWithTimestamp("DOM hat sich geändert. Versuche, das Attribut 'multiple' hinzuzufügen.");
                    addMultipleAttribute(); // Versuche erneut, das Attribut hinzuzufügen
                }
            }
        };

        // Erstelle einen MutationObserver und starte ihn
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    // Initialisiere das Skript, wenn die Seite geladen ist
    window.onload = function() {
        logWithTimestamp("Seite geladen. Starte Skript.");

        // Füge das "multiple"-Attribut beim ersten Laden hinzu
        addMultipleAttribute();

        // Beobachte DOM-Änderungen
        observeDOMChanges();
    };

})();

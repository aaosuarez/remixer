"use strict";

function Remixer(options) {
    this.config = this.mergeSettings(options);
    this.selector = (typeof this.config.selector == "string") ? document.querySelector(this.config.selector) : this.config.selector;
    this.init();
}

Remixer.prototype.mergeSettings = function(userSettings) {
    var settings = {
        selector: ".remixer"
    };
    for (var attribute in userSettings) {
        settings[attribute] = userSettings[attribute]
    }
    return settings;
}

Remixer.prototype.init = function() {
    if (this.selector === null) {
        throw new Error("Selector not present or misconfigured.");
    }
    if (this.tracks === null) {
        throw new Error("Track information not provided.");
    }
    this.render();
    this.player.addEventListener("timeupdate", this.timeupdateHandler.bind(this));
}

Remixer.prototype.render = function() {
    var audio = document.createElement("audio");
    audio.src = this.config.tracks[0].src;
    audio.className = "remixer__player";
    audio.controls = "controls";
    
    var trackInfo = document.createElement("div");
    trackInfo.className = "remixer__component";
    trackInfo.textContent = "---";
    
    this.selector.appendChild(audio);
    this.selector.appendChild(trackInfo);

    this.player = document.querySelector(".remixer__player");
}

Remixer.prototype.timeupdateHandler = function(e) {
    var currentTime = e.srcElement.currentTime;
    var currentTrack = this.getCurrentTrackFromTimestamp(currentTime);
    this.setTrackInfo(currentTrack.title + " - " + currentTrack.artist);
}

Remixer.prototype.getCurrentTrackFromTimestamp = function(timestamp) {
    var timestamps = this.config.tracks[0].components.map(function(component) {
        return component.timestamp;
    });
    
    var componentIndex = 0;
    for (var i = 0; i < timestamps.length; i++) {
        if (timestamp > timestamps[i]) {
            componentIndex = i;
        }
    }
    return this.config.tracks[0].components[componentIndex];
}

Remixer.prototype.setTrackInfo = function(text) {
    var trackInfo = document.querySelector(".remixer__component");
    trackInfo.textContent = text;
}
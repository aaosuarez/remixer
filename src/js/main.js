"use strict";

function Remixer(options) {
    this.mergeOptions(options);
    this.selector = (typeof this.selector == "string") ? document.querySelector(this.selector) : this.selector;
    this.init();
}

Remixer.prototype.mergeOptions = function(options) {
    var defaults = {
        selector: ".remixer"
    };
    for (var attribute in defaults) {
        this[attribute] = defaults[attribute];
    }
    for (var attribute in options) {
        this[attribute] = options[attribute];
    }
}

Remixer.prototype.init = function() {
    if (!this.selector) {
        throw new Error("Selector not present or misconfigured.");
    }
    if (!this.tracks) {
        throw new Error("Track information not provided.");
    }
    this.tracks = this.tracks.map(function(track){
        return new Track(track);
    });
    this.render();
    this.player.addEventListener("timeupdate", this.timeupdateHandler.bind(this));
}

Remixer.prototype.render = function() {
    var audio = document.createElement("audio");
    audio.src = this.tracks[0].src;
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
    var currentComponent = this.getCurrentTrackFromTimestamp(currentTime);
    this.setTrackInfo(currentComponent.title + " - " + currentComponent.artist);
}

Remixer.prototype.getCurrentTrackFromTimestamp = function(timestamp) {
    var timestamps = this.tracks[0].components.map(function(component) {
        return component.timestamp;
    });

    var componentIndex = 0;
    for (var i = 0; i < timestamps.length; i++) {
        if (timestamp > timestamps[i]) {
            componentIndex = i;
        }
    }
    return this.tracks[0].components[componentIndex];
}

Remixer.prototype.setTrackInfo = function(text) {
    var trackInfo = document.querySelector(".remixer__component");
    trackInfo.textContent = text;
}

function Track(options) {
    this.mergeOptions(options);
    this.init();
}

Track.prototype.mergeOptions = function(options) {
    var defaults = {
        src: "",
        components: []
    };
    for (var attribute in options) {
        this[attribute] = options[attribute] || defaults[attribute];
    }
}

Track.prototype.init = function() {
    this.components = this.components.map(function(component) {
        return new Component(component);
    }).sort(function(a, b) {
        return a.timestamp > b.timestamp;
    });
}

function Component(options) {
    var defaults = {
        title: "unknown title",
        artist: "unknown artist",
        timestamp: 0
    };
    for (var attribute in defaults) {
        this[attribute] = options[attribute] || defaults[attribute]
    }
}
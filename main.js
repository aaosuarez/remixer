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
    audio.src = this.config.src;
    audio.className = "remixer__player";
    audio.controls = "controls";
    
    var trackInfo = document.createElement("div");
    trackInfo.className = "remixer__track-info";
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
    var timestamps = this.config.tracks.map(function(track) {
        return track.timestamp;
    });
    
    var trackIndex = 0;
    for (var i = 0; i < timestamps.length; i++) {
        if (timestamp > timestamps[i]) {
            trackIndex = i;
        }
    }
    return this.config.tracks[trackIndex];
}

Remixer.prototype.setTrackInfo = function(text) {
    var trackInfo = document.querySelector(".remixer__track-info");
    trackInfo.textContent = text;
}

var tracks = [
    {
        "title": "You Can Do It (Jar Jar Kinx Remix)",
        "artist": "Ice Cube",
        "timestamp": 0
    },
    {
        "title": "Jook Gal (Head Gawn Remix)",
        "artist": "Elephant Man ft. Twista",
        "timestamp": 47
    },
    {
        "title": "Pony (eSenTRIK Remix)",
        "artist": "Ginuwine",
        "timestamp": 71
    },
    {
        "title": "Bad Girls (Switch Remix)",
        "artist": "M.I.A. ft Missy Elliott & Rye Rye",
        "timestamp": 110
    },
    {
        "title": "I Get Lonely (DJ Hoodboi Remix)",
        "artist": "Janet Jackson",
        "timestamp": 147
    }
];

var r = new Remixer({
    tracks: tracks,
    src: "moremix_2.mp3"
});
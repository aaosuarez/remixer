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

var remixer = document.getElementById("remixer");

remixer.addEventListener("timeupdate", function(e) {
    var currentTime = e.srcElement.currentTime;
    var currentTrack = getCurrentTrackFromTimestamp(currentTime);
    setTrackInfo(currentTrack.title + " - " + currentTrack.artist);
});

function getCurrentTrackFromTimestamp(timestamp) {
    var timestamps = tracks.map(function(track) {
        return track.timestamp;
    });

    var trackIndex = 0;
    for (var i = 0; i < timestamps.length; i++) {
        if (timestamp > timestamps[i]) {
            trackIndex = i;
        }
    }
    return tracks[trackIndex];
}

function setTrackInfo(text) {
    var trackInfo = document.getElementsByClassName("remixer__track-info")[0];
    trackInfo.textContent = text;
}

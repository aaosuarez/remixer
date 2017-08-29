# Remixer

Remixer is a lightweight, configurable JavaScript library that allows you to display the current playing song in a mix.

## Defaults

Remixer will use the following default values. All values can be overwritten (see Configuration).

### Remixer
| Attribute | Default Value |
| --------- | ------------- |
| selector | ".remixer" |

### Track

| Attribute | Default Value |
| --------- | ------------- |
| src | "" |
| components | [] |

### Component

| Attribute | Default Value |
| --------- | ------------- |
| title | "unknown title" |
| artist | "unknown artist" |
| timestamp | 0 |

## Configuration

To configure Remixer, simply specify the track source, and for each song in the mix, its title, artist, and the timestamp in which the song starts playing. For example:
```
var tracks = [{
    src: "moremix_2.mp3",
    components: [{
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
    }]
}];
```

To load this configuration, run:
```
var r = new Remixer({
    tracks: tracks
});
```
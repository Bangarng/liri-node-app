//get dem keys
var keys = require("./keys.js");
//get dem twitters
var Twitter = require('twitter');
//get dem spotifies
var Spotify = require('node-spotify-api');
//get dem requests
var request = require('request');
//get the fs
var fs = require("fs");

var getTweets = function() {
    var client = new Twitter(keys.Twitter);
    var params = {
        screen_name: 'BTMComic'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

var getArtistNames = function(artist) {
    return artist.name;
}

var getSpotify = function() {
    var spotify = new Spotify(keys.Spotify);    
    spotify.search({ type: 'track', query: 'Hit me baby one more' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(JSON.stringify(data,null, 2)); 
    });
}
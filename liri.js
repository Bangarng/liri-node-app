//dotenv instsall
require("dotenv").config();
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

//Get Tweets
var getTweets = function() {
    //NPM Instructions + push data
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: "BTMComic"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("");
            }
        } else {
            console.log("An error occured");
            console.log("Response: ", response);
        }
    });
};

//Get Spotify
var getSpotify = function(songName) {
    //Code via NPM Instructions
    var spotify = new Spotify(keys.spotify);

    if (songName === undefined) {
    songName = "What's my age again";
    }

    spotify.search({
        type: "track",
        query: songName
    },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            //spit out the data
            var spotifyData = data.tracks.items;
            for (var i = 0; i < spotifyData.length; i++) {
                //console.log(spotifyData[i].artists[i]);
                console.log("-----------------------------------");
                console.log(i);
                console.log("Artist(s): " + spotifyData[i].artists[0].name);
                console.log("Song Name: " + spotifyData[i].name);
                console.log("Preview Song: " + spotifyData[i].preview_url);
                console.log("Album: " + spotifyData[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

//Get Movie
var getMovie = function(movieName) {
    if (movieName === undefined) {
        movieName = "Predator";
    }
    //Build API Call
    var OMDBLookup = "http://www.omdbapi.com/?t=" + movieName + "&apikey=c7c1637c";
    //Request NPM Instructions
    request(OMDBLookup, function(error, response, body) {
        if (!error) {
        var movieData = JSON.parse(body);
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Rottem Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
        } else {
            console.log("error:", error);
            console.log("statusCode:", response && response.statusCode);
        }
    });
  };

//Read the random.txt file
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        var dataArr = data.split(",");
        if (dataArr.length === 2) {
            runApp(dataArr[0], dataArr[1]);
        }
        else if (dataArr.length === 1) {
            runApp(dataArr[0]);
        }
    });
};

//Execute the command
var runApp = function(request, lookup) {
    switch (request) {
        case "my-tweets":
        getTweets();
        break;

        case "spotify-this-song":
        getSpotify(lookup);
        break;

        case "movie-this":
        getMovie(lookup);
        break;

        case "do-what-it-says":
        doWhatItSays();
        break;
        
        default:
        console.log("LIRI doesn't know that");
    }
};

//reads command line and starts the application
var runThis = function(argOne, argTwo) {
    runApp(argOne, argTwo);
};

//starting the app
runThis(process.argv[2], process.argv[3]);
  
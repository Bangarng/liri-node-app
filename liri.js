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
    var client = new Twitter(keys.twitterKeys);
    var params = {
        screen_name: "BTMComic"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);
            }
        }
    });
};

//Adding Spotify Keys via NPM Instructions
var spotify = new Spotify({
    id: "1e1db30f7a9f42f0a3ad6c72bee7648e",
    secret: "d4cdd98a96f54b418478c06731be58b8"
});

//Get Spotify
var getSpotify = function(songName) {
    if (songName === undefined) {
    songName = "What's my age again";
    }

    //NPM Instructions
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
    var OMDBLookup = "http://www.omdbapi.com/?t=" + movieName + "&apikey=c7c1637c";
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

  // Function for running a command based on text file
  var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
      var dataArr = data.split(",");
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      }
      else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };
  // Function for determining which command is executed
  var pick = function(caseData, functionData) {
    switch (caseData) {
      case "my-tweets":
        getTweets();
        break;
      case "spotify-this-song":
        getSpotify(functionData);
        break;
      case "movie-this":
        getMovie(functionData);
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        console.log("LIRI doesn't know that");
    }
  };
  // Function which takes in command line arguments and executes correct function accordigly
  var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  // MAIN PROCESS
  // =====================================
  runThis(process.argv[2], process.argv[3]);
  
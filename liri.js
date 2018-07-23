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

// FUNCTIONS
// =====================================
// Writes to the log.txt file
var getArtistNames = function(artist) {
    return artist.name;
  };
  // Function for running a Spotify search
  var getSpotify = function(songName) {
    if (songName === undefined) {
      songName = "What's my age again";
    }
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };
  // Function for running a Twitter Search
  var getTweets = function() {
    var client = new Twitter(keys.twitterKeys);
    var params = {
      screen_name: "kiddycads"
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
  // Function for running a Movie Search
  var getMovie = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
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
  
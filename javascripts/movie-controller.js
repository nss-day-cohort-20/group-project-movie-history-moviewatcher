'use strict';

let songCon = require('./movie-factory');
let searchNew = document.getElementById("search-new-movies")

module.exports.loadSongsToDom = () => {
  songCon.getMovies()
  .then( (movieData) => {
  	console.log("results?", movieData)
    // let songList = templates.makeSongList(songData);
    // $container.html(songList);
  });
};

$("search-new-movies").click(function() {
	console.log("search button working")
	module.exports.loadSongsToDom();
})
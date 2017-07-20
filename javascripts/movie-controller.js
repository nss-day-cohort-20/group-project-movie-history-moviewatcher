"use strict";

let $ = require('jquery');
let movieFactory = require('./movie-factory.js');
let builder = require('./template-builder.js');

module.exports.buildMovieObj = (title, year, movieId, currentUser, castArr, poster_path) => {
	let movieObj = {
		title: title,
		release_date: year,
        id: movieId,
		userId: currentUser,
        poster_path: poster_path,
        cast: castArr,
        watched: false
	};
    console.log("movieObj", movieObj);
	return movieObj;
};

module.exports.searchForNewMovies = function () {
	console.log("search working");
    var moviesToUse = [];
    movieFactory.getMovies()
        .then((movies) => {
            moviesToUse = movies;
            let promiseArr = [];
            movies.results.forEach((movie) => {
                promiseArr.push(movieFactory.getCast(movie.id));
            });
            return Promise.all(promiseArr);
        })
        .then((cast)=>{
        	console.log("moviesToUse", moviesToUse);
        	for(let i = 0; i < 20; i++) {
        		moviesToUse.results[i].cast = cast[i];
                moviesToUse.results[i].release_date = moviesToUse.results[i].release_date.substring(0,4);
        	}
            let searchMovies = builder.searchMoviesToDOM(moviesToUse.results);
            $("#DOM-element").html(searchMovies);
        });
};

$("#search-movies").keypress((e)=>{
    if(e.which == 13){
        module.exports.searchForNewMovies();
        $("#search-movies").val("");
        $("#subtitle-search").removeClass("hideIt");
    }
});

module.exports.noResults = function() {
	if ($("#search-movies:empty").val) {
		alert("You must enter text to search");
	}
};

// $(document).on("click", ".add-watchlist", function() {
//     let movieObj = module.exports.buildMovieObj();
//     movieFactory.addMovie(movieObj);
//     console.log("working", movieObj);
//     // .then( (songId) => {
//         // module.exports.loadSongsToDom();
//     // });
// });

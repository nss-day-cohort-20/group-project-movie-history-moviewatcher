"use strict";

let $ = require('jquery');
let movieFactory = require('./movie-factory.js');
let builder = require('./template-builder.js');

//in progress

// module.exports.buildMovieObj = (title, year, userId, movieId) => {
// 	let movieObj = {
// 		title: title,
// 		year: year,
// 		userId: userId,
// 		movieId: movieId,
// 	};
// 	return movieObj;
// };

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


$("#search-new-movies").click(function() {
	// console.log("search button working", moviesToUse);
	module.exports.searchForNewMovies();
});


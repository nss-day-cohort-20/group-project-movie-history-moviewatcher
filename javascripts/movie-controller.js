"use strict";

let $ = require('jquery');
let movieFactory = require('./movie-factory.js');
let builder = require('./template-builder.js');

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
        	}
            // templatebuilder!!!!
        });
};


$("#search-new-movies").click(function() {
	// console.log("search button working", moviesToUse);
	module.exports.searchForNewMovies();
});
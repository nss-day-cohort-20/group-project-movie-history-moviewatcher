"use strict";

let $ = require('jquery');
let movieFactory = require('./movie-factory.js');
let builder = require('./template-builder.js');

module.exports.buildMovieObj = (key, title, year, movieId, currentUser, castArr, poster_path) => {
	let movieObj = {
		key: key,
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
        .then((cast)=> {
        	// console.log("moviesToUse", moviesToUse);
            let lengthToUse = moviesToUse.results.length < 20 ? moviesToUse.results.length : 20;
            // console.log("moviesToUseLength", );
        	for(let i = 0; i < lengthToUse; i++) {
        		moviesToUse.results[i].cast = cast[i];
                moviesToUse.results[i].release_date = moviesToUse.results[i].release_date.substring(0,4);
        	}
            // console.log("moviesToUse", moviesToUse.results);
        
        	movieFactory.getUserMovies()
        	.then((firebaseMovies) => {

        		// let reg = new RegExp($("#search-movies").val(), "i");
        		let matchedMovies = [];

        		$.each(firebaseMovies, (index, movie) => {

	      			// console.log("firebase title", movie.title);
	      			// console.log("user search", $("#search-movies").val());

					if(movie.title.toLowerCase().includes($("#search-movies").val().toLowerCase())) {
						// console.log("match made", movie.title, $("#search-movies").val());
						// console.log(movie);
						matchedMovies.push(movie);
			   		 }
						let completedTemplate = builder.searchMoviesToDOM(matchedMovies);
		          		$("#DOM-element").html(completedTemplate);
						
		    });



        		// console.log("firebase", firebaseMovies);
        		// console.log("api", moviesToUse.results);
        		// filter firebaseMovies out of moviesToUse
        		// let searchMovies = builder.searchMoviesToDOM(firebaseMovies);
          // 		$("#DOM-element").html(searchMovies);
        	});
        	
        });
};

$("#search-movies").keypress((e)=>{
    if(e.which == 13){
        module.exports.searchForNewMovies();
        // $("#search-movies").val("");
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

"use strict";

let $ = require('jquery');
window.jQuery = require('jquery');
let bootstrap = ('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
let userFactory = require('./user-factory');
let firebase = require("./firebaseConfig");
let movieController = require("./movie-controller");
let movieFactory = require('./movie-factory.js');
let builder = require('./template-builder.js');

$("#logItIn").click( function() {
	$("#logItIn").addClass("hideIt");
	$(".messagePreLogin").addClass("hideIt");
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("user", user);
		// movieController.loadSongsToDom(); when users have movies in their watchlist and watched it
		$("#logItOut").removeClass("hideIt");
		$(".messagePostLogin").removeClass("hideIt");
	});
});

$("#logItOut").click( function() {
	$("#logItOut").addClass("hideIt");
	console.log("log-out clicked");
	firebase.auth().signOut()
	.then(function() {
	location.reload(true);
	$("#logItIn").removeClass("hideIt");
	$(".messagePreLogin").removeClass("hideIt");
	}).catch(function(error) {
		console.log("an error happened");
	});
});


// when user clicks Add to Watchlist link on movie card
$(document).on("click", ".add-watchlist", function() {
	console.log("clicked add to Watchlist");
	let castArr = [];
	// let key = Object.keys();
	let movieId = $(this).data("add-watch");
	let title = $(`#${movieId}-title`).text();
	let year = $(`#${movieId}-date`).text();
	let currentUser = firebase.auth().currentUser.uid;
	$(`.${movieId}-cast`).each( function() {
		castArr.push($(this).text());
	});
	let poster_path = $(`img[alt=${movieId}-image]`).attr("src").split("http://image.tmdb.org/t/p/w154/").pop();
	movieFactory.addMovie(movieController.buildMovieObj(title, year, movieId, currentUser, castArr, poster_path));
	$(`#${movieId}-add-watchlist`).addClass("hideIt");
	$(`#${movieId}-star-container`).removeClass("hideIt");
	console.log("is this movie id", movieId);

});

//when user clicks show watchlist link
$("#show-unwatched").click(function() {
	movieFactory.getUserMovies()
		.then((movieData) => {
			console.log("movieData", movieData);
			console.log("object key?", Object.keys(movieData));
			$.each(movieData, (index, movie) => {
				if(movie.watched === false) {
					console.log("movie", movie.cast);
					// console.log("watched?", movie.watched);
					let searchWatchlist = builder.searchMoviesToDOM(movieData);
			        $("#DOM-element").html(searchWatchlist);
		   		 }
		    });
		});
	// movieController.buildMovieObj(title, year, movieId, currentUser, castArr, poster_path);
});

$(document).on("click", ".star", function() {
	let thisStarIndex = $(this).attr("id").split("-");
	let starMovieId = thisStarIndex[0];
	for (let i = 1; i <= thisStarIndex[2]; i++) {
		document.getElementById(`${thisStarIndex[0]}-star-${i}`).classList.add("rated");
	}
	movieFactory.getUserMovies()
		.then((movieData) => {
			// console.log("movieData", movieData);
			$.each(movieData, (index, movie) => {
				if(movie.id === starMovieId) {
					// console.log("movie id", movie.id);
					// console.log("star movie id", starMovieId);
					// console.log("star index", thisStarIndex[2]);
					movie.rating = thisStarIndex[2];
					movie.watched = true;

					movieFactory.updateMovie();
					// // console.log("watched?", movie.watched);
					// let searchWatchlist = builder.searchMoviesToDOM(movieData);
			  //       $("#DOM-element").html(searchWatchlist);
					
		   		 }
		    });
	});
});













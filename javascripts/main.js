"use strict";

let $ = require('jquery');
window.jQuery = require('jquery');
let bootstrap = ('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
let userFactory = require('./user-factory');
let firebase = require("./firebaseConfig");
let movieController = require("./movie-controller");

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
	let movieId = $(this).data("add-watch");
	let title = $(`#${movieId}-title`).text();
	let year = $(`#${movieId}-date`).text();
	let currentUser = firebase.auth().currentUser.uid;
	$(`.${movieId}-cast`).each( function() {
		castArr.push($(this).text());
	});
	let poster_path = $(`img[alt=${movieId}-image]`).attr("src").split("http://image.tmdb.org/t/p/w154/").pop();
	movieController.buildMovieObj(title, year, movieId, currentUser, castArr, poster_path);
});










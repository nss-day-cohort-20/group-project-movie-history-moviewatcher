"use strict";

let $ = require('jquery');
window.jQuery = require('jquery');
let bootstrap = ('../lib/node_modules/bootstrap/dist/js/bootstrap.min.js');
let userFactory = require('./user-factory');
let firebase = require("./firebaseConfig");

$("#logItIn").click( function() {
	$("#logItIn").addClass("hideIt");
	$(".messagePreLogin").addClass("hideIt");
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("user", user);
		// songController.loadSongsToDom();
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
	// An error happened.
	});
});
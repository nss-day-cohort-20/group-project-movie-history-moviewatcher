"use strict";

let $ = require('jquery');
let movieCardTemplate = require('../templates/movie-card.hbs');

module.exports.searchMoviesToDOM = (movieList) => {
	return movieCardTemplate({movies: movieList});
};
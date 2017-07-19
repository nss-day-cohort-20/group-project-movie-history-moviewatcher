"use strict";

let $ = require('jquery');

module.exports.getMovies = () => {
  return new Promise( ( resolve, reject) => {
    // let currentUser = firebase.auth().currentUser.uid;
    // songFormObj.uid = currentUser;
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=f04cbfd7e2adddef9a2663080b7fe168&query=Jack+Reacher"`
    }).done( (movieData) => {
      // let amendedSongData = addIds(songData);
      resolve(movieData);
    });
  });
};

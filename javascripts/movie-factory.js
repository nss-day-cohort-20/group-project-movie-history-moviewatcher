"use strict";

let $ = require('jquery');
let mdbConfig = require('./mdbGetter')();

module.exports.getMovies = () => {
  return new Promise( ( resolve, reject) => {
    // let currentUser = firebase.auth().currentUser.uid;
    // songFormObj.uid = currentUser;
    let userSearch = $("#search-movies").val().replace(/ /g, "%20");
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${mdbConfig.key}&query=${userSearch}"`
    }).done( (movieData) => {
      resolve(movieData);
    });
  });
};

module.exports.getCast = function (movieId){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${mdbConfig.key}`
        }).done((movieCast)=>{
 			let temp = movieCast.cast.slice(-3);
 			let castNames = [];
 			temp.forEach(function(cast){
            	castNames.push(cast.name);
            });
            resolve(castNames);
        });
    });
};
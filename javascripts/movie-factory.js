"use strict";

let $ = require('jquery');
let mdbConfig = require('./mdbGetter')();
let fbURL = 'https://moviewatcher-movie-history.firebaseio.com';
let firebase = require("./firebaseConfig");

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

module.exports.addMovie = (movieFormObj) => {
  return new Promise ((resolve, reject) => {
    // let currentUser = firebase.auth().currentUser.uid;
    // songFormObj.uid = currentUser;
    $.ajax({
      url: `${fbURL}/movies.json`, 
      type: "POST", 
      data: JSON.stringify(movieFormObj),
      dataType: "json"
    }).done((movieId) => {
      resolve(movieId);
    });
  });
};

module.exports.getUserMovies = () => {
  return new Promise( ( resolve, reject) => {
    let currentUser = firebase.auth().currentUser.uid;
    $.ajax({
      url: `${fbURL}/movies.json?orderBy="userId"&equalTo="${currentUser}"`
    }).done( (movieData) => {
      resolve(movieData);
    });
  });
};

// module.exports.getSearchedUserMovies = () => {
//   return new Promise( ( resolve, reject) => {
//     let currentUser = firebase.auth().currentUser.uid;
//     // songFormObj.uid = currentUser;
//     let userSearch = $("#search-movies").val();
//     $.ajax({
//       url: `${fbURL}/movies.json?orderBy="userId"&equalTo="${currentUser}"&equalTo="${userSearch}"`
//     }).done( (movieData) => {
//       resolve(movieData);
//     });
//   });
// };






// module.exports.updateMovie = (movie, ) => {
// 	return new Promise( ( resolve, reject) => {
//     let currentUser = firebase.auth().currentUser.uid;
//     $.ajax({
//       url: `${fbURL}/movies.json?orderBy="userId"&equalTo="${currentUser}"`,
//       type: 'PATCH',
//       data: JSON.stringify(rating, watchStatus),
//       dataType: "json"
//     }).done( (movieData) => {
//       resolve(movieData);

//     });
//   });
// };
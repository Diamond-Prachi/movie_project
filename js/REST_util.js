"use strict";
getMovies();
// getMovieFromOMDB("Friday");

function getMovies() {
    const url = `https://movie-project-diamond-prachi.glitch.me/movies`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(url, options)
        .then(response => response.json()
        ).then(data => {
        $("#loader").hide(500);
        showMovies(data)
    })
        /* Movie was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

function getMovie(id) {
    const url = `https://movie-project-diamond-prachi.glitch.me/movies/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(url, options)
        .then(response => console.log(response.json())) /* Movie was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

function postMovie(movie) {
    const url = `https://movie-project-diamond-prachi.glitch.me/movies`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)

    };
    fetch(url, options)
        .then(response => response.json()) /* Movie was created successfully */
        .then(_ => getMovies())
        .catch(error => console.error(error)); /* handle errors */

}

function deleteMovie(id) {
    $("#loader").hide(500);
    const url = `https://movie-project-diamond-prachi.glitch.me/movies/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch(url, options)
        .then(response => console.log(response.json())) /* Movie was created successfully */
        .then(_ => getMovies())
        .catch(error => console.error(error)); /* handle errors */
}

function updateMovie(id, movie) {
    const url = `https://movie-project-diamond-prachi.glitch.me/movies/${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)

    };
    fetch(url, options)
        .then(response => console.log(response.json())) /* Movie was created successfully */
        .then(_ => getMovies())
        .catch(error => console.error(error)); /* handle errors */
}

function getMovieFromOMDB(omdbId){
    const url = `http://www.omdbapi.com/?apikey=9c10a4ab&i=${omdbId}`;
    console.log(url);
    const options = {
        method: 'GET'
    };
    fetch(url, options)
        .then(response => response.json()) /* Movie was created successfully */
        .then(data => creatOMDBMovieObj(data))
        .catch(error => console.error(error)); /* handle errors */
}

function searchMovieFromOMDB(movieName){
    const url = `http://www.omdbapi.com/?apikey=9c10a4ab&s=${movieName}`;
    console.log(url);
    const options = {
        method: 'GET'
    };
    fetch(url, options)
        .then(response => response.json()) /* Movie was created successfully */
        .then(data => showMovieSearchResult(data))
        .catch(error => console.error(error)); /* handle errors */
}
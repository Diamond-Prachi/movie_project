"use strict";
showLoading();
getMovies();

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
        $("#loader").hide(500);//h
        showMovies(data)
    })
        /* Movie was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

function showLoading() {

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
        .then(response => console.log(response.json())) /* Movie was created successfully */
        .then(_ => getMovies())
        .catch(error => console.error(error)); /* handle errors */

}

function deleteMovie(id) {
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

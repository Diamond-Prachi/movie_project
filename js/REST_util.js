"use strict";
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
        .then(response => console.log(response.json())) /* Movie was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}
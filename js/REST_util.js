"use strict";
getMovies();
//postMovie();
deleteMovie();

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

function postMovie() {
    let movie = {
        "title": "Harry Potter and the Sorceror's Stone 8",
        "rating": "5",
        "year": "2004",
        "genre": "fantasy, adventure, narrative",
        "director": "Alfonso Cuarón",
        "plot": "Harry Potter's (Daniel Radcliffe) third year at Hogwarts starts off badly when he learns deranged killer Sirius Black",
        "actors": "DANIEL RADCLIFFE, EMMA WATSON, RUPERT GRINT, MAGGIE SMITH, ALAN RICKMAN, GARY OLDMAN, FIONA SHAW, TIMOTHY SPALL, EMMA THOMPSON"
    }

    const url = `https://movie-project-diamond-prachi.glitch.me/movies`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(movie)

    };
    fetch(url, options)
        .then(response => console.log(response.json())) /* Movie was created successfully */
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
        .catch(error => console.error(error)); /* handle errors */
}
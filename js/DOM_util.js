"use strict";

let movies

function refreshPage() {
    $("#moviesDiv").empty();
    //getMovies();
}

//Display Movies

function showMovies(movies) {
    let filteredMovies = filterMovies(movies);
    //let MoviesPerPage = addPages(filteredMovies);
    console.log(filteredMovies)
    filteredMovies.reverse().forEach(function (movie, index) {
        let movieCard =
            `<div class="movie-card col mb-3">
                <div class=" card shadow-sm">
                    <div id="banner">${showBanner(movie.isEditorChoice)}</div>
                    <img class="poster card-img-top" src="${movie.poster}" alt="${movie.title}" style="min-height:485px; max-height: 485px">
                    <div class="card-body hide" style="min-height: 485px">
                        <h5 id="movieName" contenteditable="false" placeholder="Add Movie Name" class="card-title overflow-auto">${movie.title}</h5>
                        <h6 id="year" contenteditable="false" placeholder="Add Year" class=" card-subtitle mb-2 text-muted">${movie.year}</h6>
                        <h6 id="director" contenteditable="false" placeholder="Add Director" class=" card-subtitle mb-2 text-muted overflow-auto">${movie.director}</h6>
                        <p id="actors" contenteditable="false" placeholder="Add Cast" class="card-text overflow-auto" >${movie.actors}</p>
                        <p id="language" contenteditable="false" placeholder="Add Language" class="card-text overflow-auto" >${movie.language}</p>
                        <h5 id="genre" contenteditable="false" placeholder="Genre" class="card-title overflow-auto">${movie.genre}</h5>
                        <p id="plot" contenteditable="false" placeholder="Add Plot" class="h-50 card-text overflow-auto" >${movie.plot}</p>
                        <div class="isEditorChoiceDiv pl-3 mb-2 d-none">
                            <input class="isEditorChoice form-check-input pl-2 text-muted " data-id="${movie.id}"  
                                    type="checkbox" ${movie.isEditorChoice ? "checked" : ""}>Editor's Choice
                        </div>
                        <div class="ctr-grp d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" data-id="${movie.id}" class="editBtn btn btn-sm btn-outline-secondary">
                                    Edit
                                </button>
                                <button type="button" data-id="${movie.id}" class="deleteBtn btn btn-sm btn-outline-secondary">Delete
                                </button>
                            </div>
                            <div class="editableStars">
                                ${appendRating(movie.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        $("#moviesDiv").append(movieCard);
    });
    addListeners();
}

function appendRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += ` <span class="fa fa-star checked"></span>`
        } else {
            stars += ` <span class="fa fa-star "></span>`
        }
    }
    return stars;
}

function addListeners() {
    cardHoverEventListener();
    deleteCancelClickEventListener();
    editSaveClickEventListener();
}

function cardHoverEventListener() {
    //alert("hi")
    let hoverIn = function () {
        //alert("Hi")
        $(this).find(".card-body").toggleClass("hide")
        $(this).find(".poster").toggleClass("hide")
    }
    let hoverOut = function () {
        $(this).find(".card-body").toggleClass("hide")
        $(this).find(".poster").toggleClass("hide")
    }
    $(".movie-card").hover(hoverIn, hoverOut)
}

function deleteCancelClickEventListener() {
    $(".deleteBtn").click(function () {
        if ($(this).text().trim() === 'Delete') {
            let choice = confirm("Do you want to delete the movie?")
            if (choice) {
                deleteMovie($(this).data('id'));
                refreshPage();
            }
        } else {
            //On Cancel
            // change all editable fields to labels
            let editableFields = ($(this).parentsUntil(".card").children("[contenteditable ='true']"))
            editableFields.attr("contenteditable", "false");
            editableFields.toggleClass("form-control")

            // Change button names
            $(this).text('Delete')
            $(this).siblings(".editBtn").text("Edit")

            // Show banner
            $("#banner").toggleClass("d-none", false);
            // Hide editor choice checkbox
            $(".isEditorChoiceDiv").toggleClass("d-none", true);
        }
    })
}

function editSaveClickEventListener() {
    $(".editBtn").click(function () {
        $(".fa-star").click(function () {
            $(this).toggleClass("checked");
        })

        let editableFields = ($(this).parentsUntil(".card").children("[contenteditable]"))
        // On Edit
        if ($(this).text().trim() === 'Edit') {
            //Change all the field to editable
            editableFields.attr("contenteditable", "true");
            editableFields.toggleClass("form-control")

            // Set the value of checkbox
            $(".isEditorChoiceDiv").toggleClass("d-none");

            //change names of the button
            $(this).text("Save");
            $(this).siblings(".deleteBtn").text("Cancel")

        } else {
            console.log($('.isEditorChoice').is("checked"))
            // on Save
            let movie = {
                title: editableFields.filter("#movieName").text(),
                year: editableFields.filter("#year").text(),
                director: editableFields.filter("#director").text(),
                plot: editableFields.filter("#plot").text(),
                actors: editableFields.filter("#actors").text(),
                rating: $(this).parentsUntil(".card-body").find(".checked").length,
                isEditorChoice: $('.isEditorChoice').prop("checked"),
                genre: editableFields.filter("#genre").text()
            }
            console.log(movie)
            // Show banner
            $("#banner").toggleClass("d-none", false);
            // Hide editor checkbox
            $(".isEditorChoiceDiv").toggleClass("d-none", true);

            updateMovie($(this).data('id'), movie);
            refreshPage();
        }
    })
}

function showBanner(isEditorChoice) {
    if (isEditorChoice) {
        return `<div id="banner" class="top-left">Editor's Choice</div>`
    } else {
        return ''
    }
}

// function addPages(movies){
//     let pages = movies.length / 6;
//     let start = 0;
//     let to = 1
//     for(let i=0; i< pages; i++){
//         start = i + pages*i
//         to = start + 5;
//         $("#pagesSelect").append(`<option>${start}-${to}</option>`)
//     }
//
//
// }

// Add and save new movie

$("#cancelNewMovie").click(function () {
    $("#addMovieForm").toggleClass("d-none");
    refreshPage();
    getMovies();
})

$("#saveNewMovie").click(function (e) {
    e.preventDefault();
    let movie = {
        title: $("#movieNameInput").val(),
        year: $("#yearInput").val(),
        director: $("#directorInput").val(),
        actors: $("#castInput").val(),
        rating: $("#ratingSelect").val(),
        genre: $("#genreMultiSelect").val().toString(),
        plot: $("#plotTextArea").val(),
        isEditorChoice: $('.isEditorChoice').prop(":checked")
    }
    $("#addMovieForm").toggleClass("d-none");
    postMovie(movie);
    refreshPage();
})

$("#langSelect").change(function () {
    getMovies();
})

$("#genreSelect").change(function () {
    getMovies();
})

$("#sortSelect").change(function () {
    getMovies();
})

$("#pagesSelect").change(function () {
    getMovies();
})

// Filter and Sort

function filterMovies(movies) {
    let langFilteredMovies = [];
    let genreFilteredMovies = [];
    let sortedMovies = [];
    let filteredMovies = movies;
    let language = '';
    let genre = '';
    let sort = '';
    if ($("#langSelect").val() !== 'Language') {
        language = $("#langSelect").val();
        langFilteredMovies = movies.filter(function (movie) {
            if (movie.language === undefined) return false;
            return movie.language.includes(language);
        });
        filteredMovies = langFilteredMovies;
    }

    console.log(langFilteredMovies)
    if ($("#genreSelect").val() !== 'Genre') {
        genre = $("#genreSelect").val();
        genreFilteredMovies = filteredMovies.filter(function (movie) {
            if (movie.genre === undefined) return false;
            return movie.genre.includes(genre);
        });
        filteredMovies = genreFilteredMovies;
    }

    if ($("#sortSelect").val() !== 'Sort') {
        sort = $("#sortSelect").val();
        if (sort === 'Title (A-Z)') {
            sortedMovies = filteredMovies.sort(function (a, b) {
                if (a.title > b.title) {
                    return -1;
                }
                if (a.title < b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (sort === 'Title (Z-A)') {
            sortedMovies = filteredMovies.sort(function (a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (sort === 'Newest-Oldest') {
            sortedMovies = filteredMovies.sort(function (a, b) {
                return a.year - b.year
            })
        } else if (sort === 'Oldest-Newest') {
            sortedMovies = filteredMovies.sort(function (a, b) {
                return b.year - a.year
            })
        }
        filteredMovies = sortedMovies;
    }
    refreshPage();
    return filteredMovies;
}

//Search

$("#searchBtn").click(function () {
    searchMovieFromOMDB($("#searchInput").val());
})

function creatOMDBMovieObj(OMDBmovie) {
    console.log(OMDBmovie)
    if (!OMDBmovie.Error) {
        let movie = {
            title: OMDBmovie.Title ? OMDBmovie.Title : "",
            year: OMDBmovie.Year ? OMDBmovie.Year : "",
            director: OMDBmovie.Director ? OMDBmovie.Director : "",
            actors: OMDBmovie.Actors ? OMDBmovie.Actors : "",
            imdbID: OMDBmovie.imdbID ? OMDBmovie.imdbID : "",
            poster: OMDBmovie.Poster,
            genre: OMDBmovie.Genre ? OMDBmovie.Genre : "",
            plot: OMDBmovie.Plot ? OMDBmovie.Plot : "",
            language: OMDBmovie.Language ? OMDBmovie.Language : "",
            rating: ((OMDBmovie.imdbRating) / 2).toFixed(0)
        };
        console.log(movie)
        postMovie(movie)
        refreshPage()
    } else {
        alert(OMDBmovie.Error)
    }

}

function showMovieSearchResult(movieResults) {
    console.log(movieResults.Search)
    //let moviesFromGlitch = getMoviesForFilter()
    let movieSearchResult = movieResults.Search;
    let movieResultDiv =
        ` <div  class="border text-left px-3 bg-light border-top-0">`

    movieSearchResult.forEach(function (movie) {
        console.log(movie)
        movieResultDiv +=
            `<div class="addMovieFromOMDB d-flex justify-content-between" 
                    data-name="${movie.Title}" data-year="${movie.Year}" data-id="${movie.imdbID}">
                <p class="d-inline mb-0">${movie.Title} (${movie.Type}-${movie.Year})</p>
                <a  href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </a>
            </div>`

    })
    // TODO : SHOW MOVIES IN DATABASE WITH SHOW OPTION
    movieResultDiv +=
        // `<div class="d-flex justify-content-between ">
        //     <p class="d-inline mb-0">Harry Potter</p>
        //     <a href="">Show</a>
        // </div>
        `<div class="d-flex justify-content-between ">
            <p class="d-inline mb-0">Don't see your favorite movie...</p>
            <a id="addMovieLink" href="#">Add Movie</a>
        </div>
    </div>`
    $("#searchResults").append(movieResultDiv);
    addAddMovieEventListener();
}

function addAddMovieEventListener() {
    $(".addMovieFromOMDB").click(function () {
        let id = $(this).data('id');
        if (confirm(`Would you like to ${$(this).data('name')}, year: ${$(this).data('year')}?`)) {
            getMovieFromOMDB(id);
            refreshPage()
            $("#searchResults").hide(500);
            $("#searchResults").empty();
            $("#searchInput").val("");
        }

    });

    $("#addMovieLink").click(function () {
        $("#searchResults").empty();
        $("#searchInput").val("");
        $("#addMovieForm").toggleClass("d-none");
        refreshPage();
    })
}

// WIP

function showBollywoodMovies(movies) {
    console.log(movies)
    let bollywoodMovies = []
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].language !== undefined) {
            if (movies[i].language.includes("Hindi")) {
                bollywoodMovies.push(movies[i])
            }
        }
    }
    refreshPage();
    showMovies(bollywoodMovies);
}

function sortMovies(movies) {
    let sortedMovies = [];
    // sortedMovies = movies.sort(function (a, b){
    //     return b.year - a.year
    // })

    sortedMovies = movies.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    })
    console.log(sortedMovies)
}

function showMoviesByPage(movies) {
    console.log(movies.slice(3, 9));
}
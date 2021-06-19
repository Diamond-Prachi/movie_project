"use strict";

let movies

function showMovies(movies) {
    movies.reverse().forEach(function (movie, index) {
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
                        <h5 id="genre" contenteditable="false" placeholder="Genre" class="card-title overflow-auto">${movie.genre}</h5>
                        <p id="plot" contenteditable="false" placeholder="Add Plot" class="card-text overflow-auto" >${movie.plot}</p>
                        <div id="isEditorChoiceDiv" class="pl-3 mb-2 d-none">
                            <input class="form-check-input pl-2 text-muted " data-id="${movie.id}" type="checkbox" id="isEditorChoice" checked="${movie.isEditorChoice}">Editor's Choice
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

function refreshPage() {
    $("#moviesDiv").empty();
    //getMovies();
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

$("#addMovie").click(function () {
    $("#addMovieForm").toggleClass("d-none");
    refreshPage();
})

$("#cancelNewMovie").click(function () {
    $("#addMovieForm").toggleClass("d-none");
    refreshPage();
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
        isEditorChoice: $('#isEditorChoice').is(":checked")
    }
    $("#addMovieForm").toggleClass("d-none");
    postMovie(movie);
    refreshPage();
})

function addListeners() {
    cardHoverEventListener();
    deleteCancelClickEventListener();
    editSaveClickEventListener();
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
            $("#isEditorChoiceDiv").toggleClass("d-none", true);
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
            $("#isEditorChoice").attr("checked", $("#isEditorChoiceDiv").hasClass("d-none"))
            // Hide banner
            $("#banner").toggleClass("d-none", true);
            // Show editor's choice checkbox
            $("#isEditorChoiceDiv").toggleClass("d-none", false);

            //change names of the button
            $(this).text("Save");
            $(this).siblings(".deleteBtn").text("Cancel")

        } else {
            // on Save
            let movie = {
                title: editableFields.filter("#movieName").text(),
                year: editableFields.filter("#year").text(),
                director: editableFields.filter("#director").text(),
                plot: editableFields.filter("#plot").text(),
                actors: editableFields.filter("#actors").text(),
                rating: $(this).parentsUntil(".card-body").find(".checked").length,
                isEditorChoice: $('#isEditorChoice').is(":checked"),
                genre: editableFields.filter("genre").text()
            }

            // Show banner
            $("#banner").toggleClass("d-none", false);
            // Hide editor checkbox
            $("#isEditorChoiceDiv").toggleClass("d-none", true);

            updateMovie($(this).data('id'), movie);
            refreshPage();
        }
    })
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

$("#searchBtn").click(function () {
    getMovieFromOMDB($("#searchInput").val());
})

function showBanner(isEditorChoice) {
    if (isEditorChoice) {
        return `<div id="banner" class="top-left">Editor's Choice</div>`
    } else {
        return ''
    }
}

function creatOMDBMovieObj(data) {
    console.log(data)
    let OMDBmovie = data
    let movie = {
        title: OMDBmovie.Title ? OMDBmovie.Title : "",
        year: OMDBmovie.Year ? OMDBmovie.Year : "",
        director: OMDBmovie.Director ? OMDBmovie.Director : "",
        actors: OMDBmovie.Actors ? OMDBmovie.Actors : "",
        imdbID: OMDBmovie.imdbID ? OMDBmovie.imdbID : "",
        poster: OMDBmovie.Poster,
        genre: OMDBmovie.Genre ? OMDBmovie.Genre : "",
        plot: OMDBmovie.Plot ? OMDBmovie.Plot : "",
        language: OMDBmovie.Language ? OMDBmovie.Language : ""
    };
    console.log(movie)
    postMovie(movie)
    refreshPage()
}
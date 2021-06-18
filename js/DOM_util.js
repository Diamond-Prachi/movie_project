"use strict";

let movies

function showMovies(movies) {
    movies.forEach(function (movie, index) {
        let movieCard = `<div class="movie-card col mb-3">
                           
                                <div class=" card shadow-sm">
                                    <img class="poster card-img-top" src="${movie.poster}" style="min-height:485px; max-height: 485px">
                                    <div class="card-body hide" style="min-height: 485px">
                                        <h5 id="movieName" contenteditable="false" placeholder="Add Movie Name" class="card-title overflow-auto">${movie.title}</h5>
                                        <h6 id="year" contenteditable="false" placeholder="Add Year" class=" card-subtitle mb-2 text-muted">${movie.year}</h6>
                                        <h6 id="director" contenteditable="false" placeholder="Add Director" class=" card-subtitle mb-2 text-muted overflow-auto">${movie.director}</h6>
                                        <p id="actors" contenteditable="false" placeholder="Add Actors" class="card-text overflow-auto" >${movie.actors}</p>
                                        <p id="plot" contenteditable="false" placeholder="Add Plot" class="card-text overflow-auto" >${movie.plot}</p>
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

$("#saveNewMovie").click(function (e) {
    e.preventDefault();
    let movie = {
        title: $("#movieNameInput").val(),
        year: $("#yearInput").val(),
        director: $("#directorInput").val(),
        actors: $("#castInput").val(),
        rating: $("#ratingSelect").val(),
        genre: $("#genreMultiSelect").val().toString(),
        plot: $("#plotTextArea").val()
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

function deleteCancelClickEventListener(){
    $(".deleteBtn").click(function (e) {
        if ($(this).text().trim() === 'Delete') {
            let choice = confirm("Do you want to delete the movie?")
            if (choice) {
                deleteMovie($(this).data('id'));
                refreshPage();
            }
        } else {
            let editableFields = ($(this).parentsUntil(".card").children("[contenteditable ='true']"))
            editableFields.attr("contenteditable", "false");
            $(this).text('Delete')
            $(this).siblings(".editBtn").text("Edit")
            editableFields.toggleClass("form-control")
        }
    })
}

function editSaveClickEventListener(){
    $(".editBtn").click(function () {
        $(".fa-star").click(function () {
            $(this).toggleClass("checked");
        })
        let editableFields = ($(this).parentsUntil(".card").children("[contenteditable]"))
        // On Edit
        if ($(this).text().trim() === 'Edit') {
            editableFields.attr("contenteditable", "true");
            editableFields.toggleClass("form-control")
            $(this).text("Save");
            $(this).siblings(".deleteBtn").text("Cancel")
        } else { // on Save
            let movie = {
                title: editableFields.filter("#movieName").text(),
                year: editableFields.filter("#year").text(),
                director: editableFields.filter("#director").text(),
                plot: editableFields.filter("#plot").text(),
                actors: editableFields.filter("#actors").text(),
                rating: $(this).parentsUntil(".card-body").find(".checked").length
            }
            updateMovie($(this).data('id'), movie);
            refreshPage();
        }
    })
}

function cardHoverEventListener(){
    //alert("hi")
    let hoverIn = function (){
        //alert("Hi")
        $(this).find(".card-body").toggleClass("hide")
        $(this).find(".poster").toggleClass("hide")
    }
    let hoverOut = function (){
        $(this).find(".card-body").toggleClass("hide")
        $(this).find(".poster").toggleClass("hide")
    }
    $(".movie-card").hover(hoverIn, hoverOut)
}
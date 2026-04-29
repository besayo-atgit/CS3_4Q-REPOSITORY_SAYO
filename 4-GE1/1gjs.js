let rating = 0;
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function() {
        rating = this.getAttribute("data-value");
        updateRating(rating)
    });
});

function updateRating(starsValue) {
    document.querySelectorAll(".star").forEach(star => {
        star.classList.remove("selected");
        if (star.getAttribute("data-value") <= starsValue) {
            star.classList.add("selected");
        }
    })
}

function addMovie() {
    event.preventDefault();
    const form = document.querySelector('form');
    const data = new FormData(form);

    const obj = Object.fromEntries(data.entries());
    obj.rating = rating;

    let objList = JSON.parse(localStorage.getItem("movies")) || [];
    objList.push(obj)
    localStorage.setItem("movies", JSON.stringify(objList));
    console.log(obj);

    displayMovies();
    form.reset();
    updateRating(0);
    rating = 0;
}

function displayMovies() {   
    const listValue = document.getElementById("movieList");
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    listValue.innerHTML = "";
    movies.forEach((movie) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${movie.title}, released on ${movie.yr} is a ${movie.genre} movie. Rating: <span class="starRating">${"★".repeat(movie.rating)}</span>
        `
        listValue.appendChild(li);
    })
}

window.onload = displayMovies();

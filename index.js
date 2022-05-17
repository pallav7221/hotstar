let timer;
function debounce(fetchData, delay) {
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(fetchData, delay)

}
document.querySelector("#search").addEventListener("input", () => {
    debounce(fetchData, 1000)
})

async function fetchData() {
    let value = document.querySelector("#search").value;
    let res = await fetch(`http://www.omdbapi.com/?apikey=502195f4&s=${value}`)
    let data = await res.json();
    if (data.Search) {
        document.querySelector("#MovieDetail").innerHTML = "";

        displaySearchResult(data.Search);
    }
    console.log(data.Search);
}
function displaySearchResult(data) {
    document.querySelector("#searchResult").innerHTML = "";
    data.forEach(movieTitle => {

        document.querySelector("#searchResult").style.overflow = "scroll";
        let title = document.createElement("p");
        title.innerHTML = movieTitle.Title;

        title.addEventListener("click", () => {

            showDetail(movieTitle.Title)
        });

        document.querySelector("#searchResult").append(title);
    });
}

function showDetail(movie) {
    fetchMovie(movie);


}


async function fetchMovie(movie) {
    let res = await fetch(`http://www.omdbapi.com/?apikey=502195f4&t=${movie}`)
    let data = await res.json();
    ShowMovieData(data);
    console.log(data);

}

function ShowMovieData(data) {
    document.querySelector("#MovieDetail").innerHTML = "";

    document.querySelector("#MovieDetail").style.padding = "3px";
    let title = document.createElement("h3");
    title.innerHTML = `Movie : ${data.Title}`;

    let poster = document.createElement("img");
    poster.src = data.Poster;

    let releseDate = document.createElement("p");
    releseDate.innerHTML = `Release Year : ${data.Year}`;

    let rating = document.createElement("p");
    rating.innerHTML = `imdb Rating : ${data.imdbRating}`

    let actors = document.createElement("p");
    actors.innerHTML = `Actors : ${data.Actors}`


    document.querySelector("#MovieDetail").append(title, poster, releseDate, rating, actors)

}
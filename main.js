//Элементы
const body = document.querySelector("body");
const search = document.getElementById("search");
const main = document.querySelector(".main");
const movieTitle = document.querySelectorAll(".movieTitle");
const movie = document.querySelector(".movie");
const movieImg = document.querySelector(".movieImg");
const movieDesc = document.querySelector(".movieDescription");
const similarMovie = document.querySelector(".similarMovie");
const similarCard = document.querySelectorAll(".similarCard");

//Кнопки
const themeBtn = document.querySelector("#themeChange");
const searchBtn = document.querySelector("#searchBtn");

//Слушатели событий
themeBtn.addEventListener("click", themeChange);
searchBtn.addEventListener("click", findMovie);

function themeChange() {
  body.classList.toggle("dark");
}

async function findMovie() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";

  const data = { apikey: "1b7ff984", t: search.value };
  const response = await sendRequest("https://www.omdbapi.com", "GET", data);
  loader.style.display = "none";

  if (response.Response === "False") {
    main.style.display = "block";
    movie.style.display = "none";
    movieTitle[0].style.display = "block";
    movieTitle[0].innerHTML = "Введите название фильма"
  } else {
    showMovie(response);
  }
}

function showMovie(data) {
  main.style.display = "block";
  movieTitle[0].style.display = "block";
  movie.style.display = "flex";
  movieImg.style.backgroundImage = `url(${data.Poster})`;
  movieTitle[0].innerHTML = data.Title;

  let params = [
    "imdbRating",
    "Year",
    "Released",
    "Genre",
    "Country",
    "Language",
    "Director",
    "Writer",
    "Actors",
  ];

  movieDesc.innerHTML = ""
  params.forEach((elem)=>{
    movieDesc.innerHTML += `
                <div class="desc">
                  <p>${elem}</p>
                  <p>${data[elem]}</p>
                </div>
                `;
  })
}

async function sendRequest(url, method, data) {
  if (method == "POST") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    return response;
  } else if (method == "GET") {
    url = url + "?" + new URLSearchParams(data);
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return response;
  }
}

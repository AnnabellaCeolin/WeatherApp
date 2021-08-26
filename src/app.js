function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  getSearchCity(searchInput.value);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

function currentPos(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "16d805ea3f0ea23ec726614d3d0e6912";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getSearchCity(city) {
  let apiKey = "16d805ea3f0ea23ec726614d3d0e6912";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`
  ;
  document.querySelector ("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`
  document.querySelector ("#description").innerHTML = response.data.weather[0].description;
  document.querySelector ("#date").innerHTML = formatDate(response.data.dt * 1000);

console.log (response.data)}
function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPos);
}

let currentCityWeather = document.querySelector("#current-location-button");
currentCityWeather.addEventListener("click", navigation);

let searchedCity = document.querySelector(".search-form");
searchedCity.addEventListener("submit", search);
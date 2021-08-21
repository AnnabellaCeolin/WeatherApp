let now = new Date();

let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

/*
function convertToCelsius(event) {
  event.preventDefault();
  let temperature = currentTemperture;
  document.querySelector("#temperature").innerHTML = temperature;
}

function convertToFahrenheit() {
  let temperature = currentTemperture;
  temperature = Math.round((temperature * 9) / 5 + 32);
  document.querySelector("#temperature").innerHTML = temperature;
}
*/

function currentPos(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "16d805ea3f0ea23ec726614d3d0e6912";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocation);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPos);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

function showLocation(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function getSearchCity(event) {
  event.preventDefault();
  let userSearchedCity = document.querySelector("input#search-input").value;
  let apiKey = "23422500afd990f6bd64b60f46cf509a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSearchedCity}&appid=${apiKey}&units=${unit}`;
  axios(apiUrl).then(showWeatherSearchedData);
}

function showWeatherSearchedData(response) {
  let city = response.data.name;
  currentTemperture = Math.round(response.data.main.temp);
  let humidity = `Humidity: ${response.data.main.humidity}%`;
  let wind = `Wind: ${response.data.wind.speed} m/s`;
  


function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCity);
}

let currentCityWeather = document.querySelector("current-location-button");
currentCityWeather.addEventListener("click", navigation);

let currentTemperture;
let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", getSearchCity);

  let defaultCity = document.querySelector("#current-city");
  let defaultTemperature = document.querySelector("#temperature");
  let defaultHumidity = document.querySelector("#humidity");
  let defaultWind = document.querySelector("#wind");
 

  defaultCity.innerHTML = city;
  defaultTemperature.innerHTML = currentTemperture;
  defaultHumidity.innerHTML = humidity;
  defaultWind.innerHTML = wind;
}
let dateGen = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dateGen.getDay()];
let hour = dateGen.getHours();
if (hour <= 9) {
  hour = "0" + hour;
}
let min = dateGen.getMinutes();
if (min <= 9) {
  min = "0" + min;
}

let dayTime = document.querySelector("li#date");
dayTime.innerHTML = `${day}, ${hour}:${min} `;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
        src= "https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png"        
        alt=""
        width="42"
      />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  var apiKey = "03cc9b8479bb5a2db9ec53fe58f6ab8a";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(GetTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#city-input").value;
  searchCity(city);
}

function GetForecast(coordinates) {
  let apiKey = "03cc9b8479bb5a2db9ec53fe58f6ab8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function GetTemp(response) {
  let showCity = document.querySelector("#city");
  showCity.innerHTML = response.data.name;

  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = Math.round(response.data.main.temp);

  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = Math.round(response.data.main.humidity);

  let showWind = document.querySelector("#wind");
  showWind.innerHTML = Math.round(response.data.wind.speed);

  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  GetForecast(response.data.coord);
}

searchCity("Kyiv");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

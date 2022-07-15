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

function GetnameCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  let heading = document.querySelector("h1#city");
  heading.innerHTML = `${cityName.value}`;
}

let form = document.querySelector("form.search-form");
form.addEventListener("submit", GetnameCity);

function Getcelsius(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("span#temperature");
  temperatureValue.innerHTML = 17;
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

function GetTemp(response) {
  let city = response.data.name;
  let showCity = document.querySelector("#city");
  showCity.innerHTML = city;

  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${wind}`;

  let description = response.data.weather[0].main;
  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = `${description}`;
}

function Getfahrenheit(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("span#temperature");
  temperatureValue.innerHTML = 17;
  temperatureValue.innerHTML = Math.round(
    Number(temperatureValue.innerHTML) * 1.8 + 35
  );
}

let fahrenheitType = document.querySelector("a#fahrenheit-link");
fahrenheitType.addEventListener("click", Getfahrenheit);

let celsiusType = document.querySelector("a#celsius-link");
celsiusType.addEventListener("click", Getcelsius);

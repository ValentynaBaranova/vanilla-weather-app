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

//function GetnameCity(event) {
// event.preventDefault();
// let cityName = document.querySelector("#city-input");
// let heading = document.querySelector("h1#city");
//// heading.innerHTML = `${cityName.value}`;
//}

////let form = document.querySelector("form.search-form");
//form.addEventListener("submit", GetnameCity);

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
  let showCity = document.querySelector("#city");
  showCity.innerHTML = response.data.name;

  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = Math.round(response.data.main.temp);

  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = Math.round(response.data.main.humidity);

  let showWind = document.querySelector("#wind");
  showWind.innerHTML = Math.round(response.data.wind.speed);

  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = response.data.weather[0].main;
  console.log(response.data);
}

function Getfahrenheit() {
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = Math.round(Number(fahrenheit.innerHTML) * 1.8 + 35);
}

let fahrenheitType = document.querySelector("a#fahrenheit-link");
fahrenheitType.addEventListener("click", Getfahrenheit);

var form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

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
  temp = Math.round(response.data.main.temp);
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
  document.querySelector("#temperature").innerHTML = Math.round(
    Number(temp) * 1.8 + 35
  );
}

function Getcelsius() {
  document.querySelector("#temperature").innerHTML = temp;
}

let fahrenheitType = document.querySelector("a#fahrenheit-link");
fahrenheitType.addEventListener("click", Getfahrenheit);

let celsiusType = document.querySelector("a#celsius-link");
celsiusType.addEventListener("click", Getcelsius);

var form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

var temp = 19;

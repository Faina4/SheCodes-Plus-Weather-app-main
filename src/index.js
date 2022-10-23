let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentWeekDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let year = now.getFullYear();

let actualDay = document.querySelector("#actualDay");
let actualWeekDay = document.querySelector("#actualWeekDay");
actualDay.innerHTML = `Today: ${currentMonth} ${currentDate}, ${year}`;
actualWeekDay.innerHTML = `${currentWeekDay} ${currentHours}:${currentMinutes}`;

function displayWeatherConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#currentPressure").innerHTML =
    response.data.main.pressure;
  document.querySelector("#currentWind").innerHTML = response.data.wind.speed;
}
function searchCity(city) {
  let apiKey = "d08b5ff65675f4663f3c5d9f116c9748";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function enterCity(event) {
  event.preventDefault();
  //let cityInput = document.querySelector("#city-input");
  //let city = cityInput.value;
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "d08b5ff65675f4663f3c5d9f116c9748";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
}
function getGeolocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let enterForm = document.querySelector("#search-city");
enterForm.addEventListener("submit", enterCity);

let geolocationButton = document.querySelector("#geolocation-btn");
geolocationButton.addEventListener("click", getGeolocation);

//default city+default conditions
searchCity("London");
//function geolocationTemperature(response) {
//let geolocationName = document.querySelector("#city");
//geolocationName.innerHTML = response.data.name;
//let geolocationTemperature = document.querySelector("#currentTemperature");
//geolocationTemperature.innerHTML = Math.round(response.data.main.temp);}

//let buttonElement = document.querySelector("#geolocation-btn");
//buttonElement.addEventListener("click", showTemrerature);

//function retrievePosition(position) {
// let latitude = position.coords.latitude;
//let longitude = position.coords.longitude;
/// let units = "metric";
//let apiKey = "d08b5ff65675f4663f3c5d9f116c9748";
//let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
//let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
// console.log(position);
///axios.get(apiUrl).then(geolocationTemperature);}

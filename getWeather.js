// Path: public/getWeather.js
// <!--This file contains the code to get the weather information from the API and display it on the website-->
// <!--The API key is stored in a variable-->
// <!--The search button is selected and an event listener is added to it-->
// <!--The event listener calls the function getWeather() when the button is clicked-->
// <!--The function getWeather() gets the city name from the input field and stores it in a variable-->
// <!--The function getWeather() calls the function getWeatherData() and passes the city name as a parameter-->
// <!--The function getWeatherData() makes a GET request to the API and passes the city name and API key as parameters-->
// <!--The function getWeatherData() gets the response from the API and converts it to JSON format-->
// <!--The function getWeatherData() calls the function displayWeather() and passes the response as a parameter-->
// <!--The function displayWeather() displays the weather information on the website-->
// <!--The function displayWeather() gets the city name, temperature, description and icon from the response and stores them in variables-->
// <!--The function displayWeather() displays the city name, temperature, description and icon on the website-->
// <!--The function displayWeather() calls the function getForecast() and passes the city name as a parameter-->
// <!--The function getForecast() makes a GET request to the API and passes the city name and API key as parameters-->
// <!--The function getForecast() gets the response from the API and converts it to JSON format-->
// <!--The function getForecast() calls the function displayForecast() and passes the response as a parameter-->
// <!--The function displayForecast() displays the forecast information on the website-->
// <!--The function displayForecast() gets the date, temperature, description and icon from the response and stores them in variables-->
// <!--The function displayForecast() displays the date, temperature, description and icon on the website-->

const API_KEY = "1d02662aeb82fa13db9dc559a869edec";

const searchButton = document.getElementById("search");
searchButton.addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("city").value;
    getWeatherData(city)
        .then((response) => {
            displayWeather(response);
            return getForecast(city);
        })
        .then((response) => {
            displayForecast(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function getWeatherData(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}

function displayWeather(response) {
    const city = response.name;
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    const icon = response.weather[0].icon;

    document.querySelector(".weather-info__city").innerHTML = city;
    document.querySelector(".weather-info__temp").innerHTML = temperature + "°C";
    document.querySelector(".weather-info__description").innerHTML = description;
    document.querySelector(".weather-info__icon").innerHTML = `<img src="icons/${icon}.png"/>`;
}

async function getForecast(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}


function displayForecast(response) {
    const date1 = response.list[0].dt_txt;
    const temperature1 = response.list[0].main.temp;
    const description1 = response.list[0].weather[0].description;
    const icon1 = response.list[0].weather[0].icon;

    const date2 = response.list[1].dt_txt;
    const temperature2 = response.list[1].main.temp;
    const description2 = response.list[1].weather[0].description;
    const icon2 = response.list[1].weather[0].icon;

    const date3 = response.list[2].dt_txt;
    const temperature3 = response.list[2].main.temp;
    const description3 = response.list[2].weather[0].description;
    const icon3 = response.list[2].weather[0].icon;

    document.querySelector(".forecast-info__day1__date").innerHTML = date1;
    document.querySelector(".forecast-info__day1__temp").innerHTML = temperature1 + "°C";
    document.querySelector(".forecast-info__day1__description").innerHTML = description1;
    document.querySelector(".forecast-info__day1__icon").innerHTML = `<img src="icons/${icon1}.png"/>`;

    document.querySelector
        (".forecast-info__day2__date").innerHTML = date2;
    document.querySelector(".forecast-info__day2__temp").innerHTML = temperature2 + "°C";
    document.querySelector(".forecast-info__day2__description").innerHTML = description2;
    document.querySelector(".forecast-info__day2__icon").innerHTML = `<img src="icons/${icon2}.png"/>`;

    document.querySelector(".forecast-info__day3__date").innerHTML = date3;
    document.querySelector(".forecast-info__day3__temp").innerHTML = temperature3 + "°C";
    document.querySelector(".forecast-info__day3__description").innerHTML = description3;
    document.querySelector(".forecast-info__day3__icon").innerHTML = `<img src="icons/${icon3}.png"/>`;
}
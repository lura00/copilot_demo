// create a rest api that calls an open weather api and fetches the weather data for a city filtered by temperature and returns the data in the browser
// 1. create a server
// 2. create a route
// 3. create a fetch request
// 4. filter the data
// 5. return the data

// How do I add data for wind speed and humidity?!

import express from "express";
import fetch from "node-fetch";
const app = express();

app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const api_key = "1d02662aeb82fa13db9dc559a869edec";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    const temp = data.main.temp;
    const tempInCelsius = temp - 273.15;
    res.send({ tempInCelsius });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

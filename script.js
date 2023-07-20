const apikey = "fee687141be101f93bd6498449976311";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEL = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityValue = cityInputEL.value;

  /* console.log(cityValue); */

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );
    if (!response.ok) {
      throw new Errow("Network response was not ok");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    /*  console.log(data); */

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,

      `Humidity: ${data.main.humidity}%`,

      `Wind Speed: ${data.wind.speed} m/s`,
    ];
    /* console.log(`Wind Speed`); */
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;
    /* console.log(temperature); */
    weatherDataEl.querySelector(".temperature").innerHTML = `${temperature}`;

    weatherDataEl.querySelector(".description").innerHTML = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {}
}

/* fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("PLease Enter Right City Name");
    }); */

const Weatherform = document.querySelector(".weatherForm");
const CityInput = document.querySelector(".cityInput");
const Card = document.querySelector(".card");
const apiKey = "121060963e05f6abb8bc655922cdd385";

Weatherform.addEventListener("submit", async event => {
  event.preventDefault();
  const city = CityInput.value;
  if (city) {
    try {
      const weatherData = await getweatherData(city);
      displayweatherInfo(weatherData);
    }
    catch (error) {
      console.error(error);
      displayError(error.message || error);
    }
  }
  else {
    displayError("Please Enter a City");
  }
});

async function getweatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiurl);
  if (!response.ok) {
    throw new Error("Could not fetch Weather data");
  }
  return await response.json();
}

function displayweatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  Card.textContent = "";
  Card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp * 9 / 5 + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getweatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  Card.appendChild(cityDisplay);
  Card.appendChild(tempDisplay);
  Card.appendChild(humidityDisplay);
  Card.appendChild(descDisplay);
  Card.appendChild(weatherEmoji);
}

function getweatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId > 800) return "☁️";
  return "❓";
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  Card.textContent = "";
  Card.style.display = "flex";
  Card.appendChild(errorDisplay);
}
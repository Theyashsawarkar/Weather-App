// API key for Weatherbit.io
const apiKey = "900cff11553d45c0bc3e098f27dcb4a0";

// Get the submit button and add a click event listener to it
const submitBtn = window.document.getElementById("submitBtn");
submitBtn.addEventListener("click", getWeather);

// Function to fetch weather data and update the DOM
function getWeather() {
  // Get the city input value from the user
  const cityInput = window.document.getElementById("city");
  const city = cityInput.value;

  // Construct the URL for the Weatherbit API call using the API key and city input value
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

  // Fetch the weather data from the Weatherbit API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Get the element that will display the weather information
      const weatherInfo = window.document.getElementById("weatherInfo");

      // Destructure the weather data object to get the relevant information
      const { temp, weather, wind_spd, wind_dir, precip, rh, uv, vis } =
        data.data[0];

      // Get the weather description and icon code
      const description = weather.description;
      const iconCode = weather.icon;

      // Construct the URL for the weather icon using the icon code
      const iconUrl = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;

      // Update the DOM with the weather information
      weatherInfo.innerHTML = `
        <div class="weather-icon">
          <img src="${iconUrl}" alt="Weather icon">
        </div>
        <div class="weather-details">
          <p class="temperature">${temp}&deg;C</p>
          <p class="description">${description}</p>
          <p class="wind">Wind: ${wind_spd} m/s ${wind_dir}</p>
          <p class="precipitation">Precipitation: ${precip} mm</p>
          <p class="humidity">Humidity: ${rh}%</p>
          <p class="uv-index">UV Index: ${uv}</p>
          <p class="visibility">Visibility: ${vis} km</p>
        </div>
      `;
    })
    .catch((error) => console.log(error));
}

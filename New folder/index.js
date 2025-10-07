const stateName = "North Carolina";
const tempDisplay = document.getElementById("temp-display");
const weather_code = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  4: "Fog",
  5: "Depositing rime fog",
  6: "Light drizzle",
  7: "Moderate drizzle",
  8: "Dense drizzle",
  9: "Light freezing drizzle",
  10: "Dense freezing drizzle",
  11: "Slight rain",
  12: "Moderate rain",
  13: "Heavy rain",
  14: "Light freezing rain",
  15: "Heavy freezing rain",
  16: "Slight snow fall",
  17: "Moderate snow fall",
  18: "Heavy snow fall",
  19: "Snow grains",
  20: "Slight rain showers",
  21: "Moderate rain showers",
  22: "Violent rain showers",
  23: "Slight snow showers",
  24: "Heavy snow showers",
  25: "Thunderstorm",
  26: "Thunderstorm with slight hail",
  27: "Thunderstorm with heavy hail",
};

fetch(
  "https://archive-api.open-meteo.com/v1/archive?latitude=79.0193&longitude=35.7596&start_date=2025-09-01&end_date=2025-09-30&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,sunrise,sunset,weather_code&hourly=rain,apparent_temperature,temperature_2m,weather_code&timezone=America%2FNew_York"
)
  .then((response) => response.json())
  .then((data) => {
    const maxTemp = data.daily.temperature_2m_max[0];
    const minTemp = data.daily.temperature_2m_min[0];
    const meanTemp = data.daily.temperature_2m_mean[0];
    tempDisplay.innerHTML =
      `
            <h2>Weather Data for ${stateName} (September 2025)</h2>
            <p>Max Temperature: ${maxTemp}°C</p>` +
      `<p>Min Temperature: ${minTemp}°C</p>` +
      `<p>Mean Temperature: ${meanTemp}°C</p>`;
    console.log(data);
    console.log(
      `Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Mean Temp: ${meanTemp}°C`
    );
    console.log(
      `Weather Code: ${data.daily.weather_code[0]} - ${
        weather_code[data.daily.weather_code[0]]
      }`
    );
    console.log(
      `Sunrise: ${data.daily.sunrise[0]}, Sunset: ${data.daily.sunset[0]}`
    );
    console.log(`Hourly Temperature: ${data.hourly.temperature_2m}`);
    console.log(`Hourly Weather Codes: ${data.hourly.weather_code}`);
  })

  .catch((error) => {
    console.error("Error fetching weather data:", error);
    tempDisplay.innerHTML = "<p>Failed to load weather data.</p>";
  });

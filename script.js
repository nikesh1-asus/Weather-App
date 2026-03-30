async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  try {
    // Step 1: Get coordinates from city name
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      document.getElementById("result").innerHTML = "City not found!";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get weather data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const weatherData = await weatherRes.json();
    const weather = weatherData.current_weather;

    // Step 3: Display result
    document.getElementById("result").innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>🌡️ Temperature: ${weather.temperature}°C</p>
      <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
    `;

  } catch (error) {
    console.error(error);
    document.getElementById("result").innerHTML = "Error fetching weather data.";
  }
}
const API_key = "1eee8e82a4919a1967d1534df24f9bfe"; 
const input = document.getElementById("inp");
const button = document.getElementById("btn");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const type = document.getElementById("type");
const icon = document.getElementById("icon");
const weatherBox = document.getElementById("weatherBox");

async function getWeather(search) {
  if (!search) {
    alert("Please enter a city");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`
    );
    const data = await res.json();

    if (data.cod === "404") {
      alert("City not found. Try again!");
      return;
    }

    // Update UI
    city.innerText = data.name;
    temp.innerText = Math.floor(data.main.temp) + "°C";
    type.innerText = data.weather[0].main;

    // Weather icon
    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherBox.style.display = "block";
    input.value = "";
  } catch (error) {
    alert("Error fetching weather data!");
    console.error(error);
  }
}

// Search button click
button.addEventListener("click", () => getWeather(input.value));

// Press Enter to search
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(input.value);
  }
});

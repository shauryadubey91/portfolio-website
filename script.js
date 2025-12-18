document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector(".contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message Sent Successfully!");
  e.target.reset();
});

const menu = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    errorMsg.innerText = "Please enter city name!";
    return;
  }

  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();
    const weather = data.current_condition[0];

    cityName.innerText = city;
    temp.innerText = `Temperature: ${weather.temp_C}°C`;
    humidity.innerText = `Humidity: ${weather.humidity}%`;
    condition.innerText = `Condition: ${weather.weatherDesc[0].value}`;

    aiSuggestion.innerText =
      "🤖 AI Suggestion: " +
      getAISuggestion(weather.weatherDesc[0].value, weather.temp_C);

    errorMsg.innerText = "";
    changeBackground(weather.weatherDesc[0].value);

  } catch {
    errorMsg.innerText = "City not found!";
  }
}

function getAISuggestion(condition, temp) {
  condition = condition.toLowerCase();

  if (condition.includes("rain")) {
    return "Carry an umbrella ☔ and avoid outdoor activities.";
  }
  if (condition.includes("sun") && temp > 35) {
    return "Very hot 🔥 Stay hydrated and avoid sunlight.";
  }
  if (condition.includes("sun")) {
    return "Pleasant weather 🌞 Good for outdoor activities.";
  }
  if (condition.includes("cloud")) {
    return "Cloudy ☁️ Nice weather for a walk.";
  }
  return "Weather looks normal 👍 Have a great day!";
}

cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") getWeather();
});

window.addEventListener("scroll", () => {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    bar.style.width = bar.getAttribute("style").split(":")[1];
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Message Sent Successfully!");
    this.reset();
});

const menu = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    
    if(city === "") {
        alert("Please enter a city!");
        return;
    }

    const url = `https://wttr.in/${city}?format=j1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        let weather = data.current_condition[0];

        document.getElementById("cityName").innerText = city;
        document.getElementById("temp").innerText = `Temperature: ${weather.temp_C}°C`;
        document.getElementById("humidity").innerText = `Humidity: ${weather.humidity}%`;
        document.getElementById("condition").innerText = `Condition: ${weather.weatherDesc[0].value}`;

        changeBackground(weather.weatherDesc[0].value);

    } catch (error) {
        alert("City not found!");
    }
}

function changeBackground(condition) {
    let body = document.body;

    if(condition.includes("Rain")) {
        body.style.background = "url('https://i.ibb.co/4MR90F3/rain.gif')";
    } else if(condition.includes("Sunny")) {
        body.style.background = "url('https://i.ibb.co/mJqfrLh/sunny.gif')";
    } else if(condition.includes("Cloud")) {
        body.style.background = "url('https://i.ibb.co/s2f4QhG/cloud.gif')";
    } else {
        body.style.background = "#000";
    }

    body.style.backgroundSize = "cover";
}

document.getElementById("cityInput").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    document.getElementById("errorMsg").innerText = "Please enter city name!";
    return;
  }

  const url = `https://wttr.in/${city}?format=j1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    let weather = data.current_condition[0];

    document.getElementById("cityName").innerText = city;
    document.getElementById("temp").innerText = `Temperature: ${weather.temp_C}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${weather.humidity}%`;
    document.getElementById("condition").innerText =
      `Condition: ${weather.weatherDesc[0].value}`;

    document.getElementById("errorMsg").innerText = "";

  } catch (error) {
    document.getElementById("errorMsg").innerText = "City not found!";
  }
}


window.addEventListener("scroll", () => {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    bar.style.width = bar.getAttribute("style").split(":")[1];
  });
});

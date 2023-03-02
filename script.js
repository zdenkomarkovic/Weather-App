const cityName = document.querySelector(".location");
const localTemp = document.querySelector(".temperature");
const description = document.querySelector(".description");
const iconLocation = document.querySelector("#icon-location");

const input = document.querySelector("input");
const divCity = document.getElementById("div-city");
const btn = document.querySelector("button");
const msg = document.getElementById("error");

async function getCurrentWeather() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const { latitude, longitude } = position.coords;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${"4d8fb5b93d4af21d66a2948710284366"}&units=metric`
  );
  const data = await response.json();

  const { main, name, sys, weather } = data;

  cityName.innerHTML = `${name} - <span>${sys.country}</span>`;
  localTemp.innerHTML = `${Math.round(main.temp)}<sup> C</sup>`;
  description.innerHTML = weather[0].description;
  iconLocation.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
}

getCurrentWeather();

btn.addEventListener("click", async function () {
  msg.textContent = "";
  const inputValue = input.value;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${"4d8fb5b93d4af21d66a2948710284366"}&units=metric`
    );

    const data = await response.json();

    const { main, name, sys, weather } = data;
    const icon = `http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

    const newDiv = document.createElement("div");
    newDiv.classList.add("new-city");
    divCity.appendChild(newDiv);

    const city = document.createElement("h3");
    city.innerHTML = `${name} - <span>${sys.country}</span>`;
    newDiv.appendChild(city);

    const temperature = document.createElement("h2");
    temperature.innerHTML = `${Math.round(main.temp)}<sup> C</sup>`;
    newDiv.appendChild(temperature);

    const image = document.createElement("img");
    image.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    image.alt = weather[0].icon;
    newDiv.appendChild(image);

    const description = document.createElement("h4");
    description.innerHTML = weather[0].description;
    newDiv.appendChild(description);
  } catch (error) {
    msg.innerHTML = `Wrong input, try again`;
  }

  input.value = "";
  input.focus();
});

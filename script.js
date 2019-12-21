const appkey = "22405ce5da2cddab844560df08049ff4";
// 22405ce5da2cddab844560df08049ff4
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(e) {
  if (e.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (searchInput.value === "") {
  } else {
    const searchLink =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput.value +
      "&appid=" +
      appkey;
    httpRequestAsync(searchLink, theResponse);
  }
}

function theResponse(res) {
  const jsonObject = JSON.parse(res);
  cityName.innerHTML = jsonObject.name;
  icon.src =
    "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      callback(httpRequest.responseText);
    }
  };
  httpRequest.open("GET", url, true);
  httpRequest.send();
}

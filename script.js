const homeBtn = document.getElementById("home-btn")
var prevNavElement = homeBtn
const aboutBtn = document.getElementById("about-btn")
const container = document.getElementById("weather-page-container")
const search = document.getElementById("search-btn");
const weatherBox = document.getElementById("weather-box");
const weatherDetails = document.getElementById("weather-details");
const error404 = document.getElementById("not-found");

search.addEventListener("click", function () {
    let APIkey = "5c8f4e1dfd1f83b77d0917161a2e4197"
    let city = document.getElementById("search-bar").value

    if (city == "") {
        return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                container.style.height = "400px"
                weatherBox.style.display = "none"
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fade-in');
                return;
            }

            error404.style.display = "none"
            error404.classList.remove("fade-in")

            let image = document.querySelector('#weather-box img');
            let temperature = document.querySelector('#weather-box #temperature');
            let description = document.querySelector('#weather-box #description');
            let humidity = document.querySelector('#weather-details #humidity span');
            let wind = document.querySelector('#weather-details #wind-speed span');

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.png"
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');
            container.style.height = '590px';
        })
})

aboutBtn.addEventListener("click", () => {
    if (prevNavElement == aboutBtn) {
        return
    }
    container.classList.add("fly-out-left")
    container.classList.remove("fly-in-left")
    aboutBtn.classList.add("active")
    prevNavElement.classList.remove("active")
    prevNavElement = aboutBtn
})

homeBtn.addEventListener("click", () => {
    if (prevNavElement == homeBtn) {
        return
    }
    container.classList.add("fly-in-left")
    container.classList.remove("fly-out-left")
    homeBtn.classList.add("active")
    prevNavElement.classList.remove("active")
    prevNavElement = homeBtn
})
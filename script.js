const container = document.querySelector(".container")
const search = document.querySelector(".bx-search")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector(".not-found")


search.addEventListener("click", (e) => {
    e.preventDefault()

    const APIKEY = "5c8a19995423787634ce1263936a034f"
    const city = document.getElementById("city").value

    if (city === "")
        return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                container.style.height = "430px"
                weatherBox.classList.remove("active")
                weatherDetails.classList.remove("active")
                error404.classList.add("active")
                return
            }
            container.style.height = "550px"
            weatherBox.classList.add("active")
            weatherDetails.classList.add("active")
            error404.classList.remove("active")

            const image = document.querySelector(".weather-box img")
            const temperature = document.querySelector(".weather-box .temperature")
            const description = document.querySelector(".weather-box .description")
            const humidity = document.querySelector(".weather-details .humidity span")
            const windSpeed = document.querySelector(".weather-details .wind span")

            switch (data.weather[0].main) {
                case "Clear":
                    image.src = "./images/clear.png"
                    break;

                case "Rain":
                    image.src = "./images/rain.png"
                    break;

                case "Snow":
                    image.src = "./images/snow.png"
                    break;

                case "Clouds":
                    image.src = "./images/clouds.png"
                    break;

                case "Mist":
                    image.src = "./images/mist.png"
                    break;

                case "Haze":
                    image.src = "./images/mist.png"
                    break;

                default:
                    image.src = "./images/clouds.png"
                    break;
            }

            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
            description.innerHTML = `${data.weather[0].description}`
            humidity.innerHTML = `${data.main.humidity} <em>%</em>`
            windSpeed.innerHTML = `${parseInt(data.wind.speed)} <em>Km/h</em>`

        })
})
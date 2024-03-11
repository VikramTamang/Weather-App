// Student Name: Subash Bikram Tamang
// Student ID: 2407749

document.addEventListener("DOMContentLoaded", () => {
    // Weather API information
    const apikey = "5f3cf908f308c870abda0c6b43c41540";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
    
    // Elements from the HTML
    const searchBtn = document.getElementById("searchBtn");
    const weatherIcon = document.querySelector(".Weather-icon");
    const cityInput = document.querySelector(".city-input");
    const errorDiv = document.querySelector(".error");

    // Default city
    const defaultCity = "Purna";
    cityInput.value = defaultCity;


    // Function to check weather based on the city
    async function checkWeather(city) {
        // Check if weather data exists in local storage
        const storedWeatherData = localStorage.getItem(city.toLowerCase());
        if (storedWeatherData) {
            const data = JSON.parse(storedWeatherData);
            displayWeatherData(data);
        } else {
        
        // Fetch weather data from the API
        try {
            const response = await fetch(apiurl + city + `&appid=${apikey}`);

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
              // Store weather data in local storage
                localStorage.setItem(city.toLowerCase(), JSON.stringify(data));

                displayWeatherData(data);
            } catch (error) {
                console.error("Error fetching or deisplaying weather data:", error);
                errorDiv.textContent = 'Error: City not found';
                document.querySelector(".weather").style.display = "none";
            }
        }
    }
        function displayWeatherData(data){

            // Display weather information
            document.querySelector(".City").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Set weather icon based on weather conditions
            const weatherMain = data.weather[0].main;
              // Show weather information and hide error
        const weatherElement = document.querySelector(".weather");
        if (weatherElement) {
            weatherElement.style.display = "block";
        }
    }

    function setWeatherIcon(weatherMain) {
            //here switch works if the cases are mate if they are mate the break fucntion execute 
            switch (weatherMain) {
               case "Clouds":
                    weatherIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"; 
                    break;
                case "Clear":
                    weatherIcon.src = "https://static-00.iconduck.com/assets.00/weather-clear-symbolic-icon-511x512-zfj6vb21.png"; 
                    break;
                case "Rain":
                    weatherIcon.src = "https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4837/4837678.png";
                    break;
                case "humidity":
                    weatherIcon.src = "https://e7.pngegg.com/pngimages/314/726/png-clipart-moisture-computer-icons-humidity-others-desktop-wallpaper-weather-icon.png";
                    break;
                case "Snow":
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1291/1291679.png";
                    break;
                case "wind":
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1247/1247767.png";
                    break;
                case "Mist":
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/175/175872.png";
                    break;
                case "light rain":
                    weatherIcon.src = "https://ssl.gstatic.com/onebox/weather/64/rain_heavy.png";
                    break;
                case "sunrise":
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/8179/8179067.png";
                    break;
                case "sunset":
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/365/365239.png";
                    break;
                default:
                    weatherIcon.src = "https://static-00.iconduck.com/assets.00/weather-clear-symbolic-icon-511x512-zfj6vb21.png"; 
                    break;
            }            
    }

    // Call checkWeather function with the default city
    checkWeather(defaultCity);

    // Function to update date and time
    function updateDateTime() {
        const dateTimeElement = document.getElementById("datetime");
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const dateTimeString = now.toLocaleString('en-US', options);
        dateTimeElement.textContent = dateTimeString;
    }

    // Update date and time initially
    updateDateTime();

    // Update date and time every second
    setInterval(updateDateTime, 1000);

    // Event listener for the search button
    searchBtn.addEventListener("click", async () => {
    const city = cityInput.value;
    await checkWeather(city);

        // Send weather data to server
    });
});
async function insert_past_data() {
  try {
    const response = await fetch('database.php')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    const divs = document.querySelectorAll('.past_data div')

    if (data.length > 0) {
      divs.forEach((div, i) => {
        div.innerHTML = `
        <p style = 'text-align:center'>Date: ${data[i].date}</p>
        <p><img src="http://openweathermap.org/img/wn/02d@2x.png", height="30px", width="30px">Temperature: ${data[i].temperature}°C </p>
        <p><img src="https://cdn.iconscout.com/icon/free/png-512/free-humidity-1423995-1204211.png?f=webp&w=256", height="30px", width="30">Humidity: ${data[i].humidity}%</p>
        <p><img src="https://cdn-icons-png.flaticon.com/512/2945/2945800.png", height="30px", width="30">Pressure: ${data[i].pressure}%</p>
        <p><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/wind-speed-2295713-1939049.png?f=webp", height="30px", width="30">Wind_speed: ${data[i].windSpeed}%</p>
        `
      })
    } else {
      divs.forEach(
        (div) =>
          (div.innerHTML ='<h1 style = "padding-top: 30px; text-align: center">No data available</h1>')
      )
    }
  } catch (error) {
    console.error('Error fetching or parsing data:', error)
  }
}

 insert_past_data()







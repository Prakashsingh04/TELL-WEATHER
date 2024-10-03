function getWeather() {
    const apiKey = 'a5addeb65e33eb0516c931b6603b515d'; 
    const city = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const body = document.querySelector('body');
    
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weather = data.weather[0].main.toLowerCase();
                    weatherInfo.innerHTML = `
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                    `;
                    
                  
                    document.querySelectorAll('.rain, .sun, .clouds').forEach(el => el.remove());

                 
                    if (weather.includes('rain')) {
                        const rain = document.createElement('div');
                        rain.className = 'rain';
                        body.appendChild(rain);
                    } else if (weather.includes('clear')) {
                        const sun = document.createElement('div');
                        sun.className = 'sun';
                        body.appendChild(sun);
                    } else if (weather.includes('clouds')) {
                        const clouds = document.createElement('div');
                        clouds.className = 'clouds';
                        body.appendChild(clouds);
                    }

                } else {
                    weatherInfo.innerHTML = '<p>City not found. Please try again.</p>';
                }
            })
            .catch(error => {
                weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
                console.error('Error:', error);
            });
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
}

            async function fetchWeather() {
                try {
                    const response = await fetch("https://goweather.herokuapp.com/weather/americana");
                    const weatherData = await response.json();
                    
                    document.getElementById("temperature").textContent = weatherData.temperature;
                    document.getElementById("wind").textContent = weatherData.wind;
                    document.getElementById("description").textContent = weatherData.description;
                    
                    const forecastContainer = document.getElementById("forecast");
                    forecastContainer.innerHTML = "";
                    
                    weatherData.forecast.forEach((day, index) => {
                        const dayElement = document.createElement("div");
                        dayElement.classList.add("day");
                        dayElement.innerHTML = `<i class="bi bi-calendar"> <strong>Dia ${index + 1}:</strong> <i class="bi bi-thermometer-half"> ${day.temperature}, <i class="bi bi-wind"></i> ${day.wind}`;
                        forecastContainer.appendChild(dayElement);
                    });
                } catch (error) {
                    console.error("Erro ao buscar os dados do clima", error);
                }
            }
            
            fetchWeather();

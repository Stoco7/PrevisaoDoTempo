document.addEventListener("DOMContentLoaded", () => {
    const city = "Americana"; // Cidade padrão
    const apiUrl = `https://goweather.herokuapp.com/weather/${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => updateWeather(data))
        .catch(error => console.error("Erro ao obter os dados:", error));
});

function updateWeather(data) {
    // Atualiza temperatura e sensação térmica
    document.getElementById("temp").innerHTML = data.temperature;
    document.getElementById("feels-like").innerHTML = `Sensação de ${data.temperature}`;

    // Atualiza umidade e vento
    document.getElementById("humidity").innerHTML = `<i class="bi bi-moisture"></i> 5%`;
    document.getElementById("wind").innerHTML = `<i class="bi bi-wind"></i> ${data.wind}`;

    // Atualiza previsão semanal
    const weeklyForecast = document.getElementById("weekly-forecast");
    weeklyForecast.innerHTML = ""; // Limpa antes de adicionar os dados

    data.forecast.forEach(day => {
        const dayElement = document.createElement("span");
        dayElement.innerHTML = `${day.day} <i class="bi bi-cloud"></i> ${day.temperature}`;
        weeklyForecast.appendChild(dayElement);
    });
}

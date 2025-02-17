// Função para carregar a previsão da cidade informada
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
        const weatherData = await response.json();

        // Atualiza o nome da cidade no título
        document.getElementById("cidade-nome").innerHTML = `<i class="bi bi-geo-alt"></i> ${capitalize(city.replace("+", " "))}`;

        // Exibindo os dados da cidade pesquisada
        document.getElementById("temperature-americana").textContent = weatherData.temperature;
        document.getElementById("wind-americana").textContent = weatherData.wind;
        document.getElementById("description-americana").textContent = weatherData.description;
        fnMudarIcones(weatherData.description);

        // Atualizando a previsão do tempo para os próximos dias
        updateForecast(weatherData.forecast);
    } catch (error) {
        console.error("Erro ao buscar os dados do clima", error);
    }
}

// Função para capitalizar o nome da cidade mantendo as letras acentuadas corretas
function capitalize(str) {
    return str
        .split(" ")
        .map(word => {
            if (word.length > 1) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else {
                return word.toUpperCase();
            }
        })
        .join(" ");
}

// Função para mudar os ícones
function fnMudarIcones(description) {
    const iconElement = document.getElementById("icone-americana");
    if (description === "Partly cloudy") {
        iconElement.className = "bi bi-cloud-sun";
    } else if (description === "Sunny") {
        iconElement.className = "bi bi-sun";
    } else if (description === "Light rain") {
        iconElement.className = "bi bi-cloud-rain";
    }
}

// Função para atualizar a previsão para os próximos dias
function updateForecast(forecastData) {
    const forecastContainer = document.getElementById("forecast-americana");
    forecastContainer.innerHTML = ""; // Limpa a previsão anterior
    forecastData.forEach((day, index) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerHTML = `<strong>Dia ${index + 1} <br> </strong> ${day.temperature}<br> ${day.wind} <i class="bi bi-wind"></i>`;
        forecastContainer.appendChild(dayElement);
    });
}

// Função para pesquisar a cidade
function pesquisarCidade() {
    const cidade = document.getElementById("cidade").value.trim().toLowerCase();
    if (cidade) {
        // Limpa os dados antigos da previsão
        document.getElementById("forecast-americana").innerHTML = "";

        // Carregar previsão da cidade digitada
        fetchWeather(cidade.replace(" ", "+"));
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
}

// Carregar a previsão para Americana ao carregar a página
fetchWeather("americana");

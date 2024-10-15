const apiKey = 'dfa90a1c396d4580bd145259241510';  // API key yang Anda dapatkan
const city = 'Jakarta';

// URL untuk API WeatherAPI
const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

// Fetch data dari WeatherAPI
fetch(apiURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        // Menampilkan cuaca hari ini
        const currentWeatherDiv = document.getElementById('current-weather');
        const currentWeather = data.current;
        currentWeatherDiv.innerHTML = `
            <p style="font-weight: bold; font-size: 33px; color: #eee7e7; text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);">${city}</p>
            <p style="font-weight: 600; font-size: 18px; color: #eee7e7; text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);">${currentWeather.temp_c}°C | ${currentWeather.condition.text}</p>
            <img src="${currentWeather.condition.icon}" alt="${currentWeather.condition.text}"/>
            <p style="font-weight: 500; font-size: 17px; text-decoration: underline; color: #eee7e7; text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);">Kecepatan Angin: ${currentWeather.wind_kph} km/h</p>
            <p style="font-weight: 500; font-size: 17px; text-decoration: underline; color: #eee7e7; text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);">Kelembapan: ${currentWeather.humidity}%</p>
        `;

        // Menampilkan ramalan cuaca 7 hari ke depan
        const forecastDiv = document.getElementById('weather-forecast');
        let forecastHTML = '';
        data.forecast.forecastday.forEach((day) => {
            const date = new Date(day.date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('id-ID', options);

            forecastHTML += `
                <div class="day">
                    <h4>${formattedDate}</h4>
                    <p>Suhu Siang: ${day.day.maxtemp_c}°C</p>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}"/>
                    <p>Suhu Malam: ${day.day.mintemp_c}°C</p>
                    <p style="font-weight: bold;">${day.day.condition.text}</p>
                </div>
            `;
        });
        forecastDiv.innerHTML = forecastHTML;
    })
    .catch(error => {
        console.error('Error:', error); 
        document.getElementById('current-weather').innerHTML = '<p style="font-size: 24px; font-weight: bolder; text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);">Terjadi kesalahan saat mengambil data cuaca.</p>';
        document.getElementById('weather-forecast').innerHTML = '<p style="font-size: 24px; font-weight: bolder; text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);">Ramalan cuaca tidak dapat ditampilkan.</p>';
    });
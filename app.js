// STEP 1: Get elements from HTML
const cityInput = document.getElementById("city-input");
const button = document.getElementById("get-weather-btn");
const result = document.getElementById("weather-result");


// STEP 2: Add event listener to button
button.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    const apiKey = "cb7391c8ae8f4347ca26bbc45a1b974f"; // keep yours here

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    result.innerHTML = "Loading... ⏳";

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            if (data.cod === 401) {
                result.innerHTML = "⚠ Invalid API key.";
                return;
            }

            if (data.cod === "404") {
                result.innerHTML = "❌ City not found!";
                return;
            }

            // 🌡 Extract data
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const cityName = data.name;

            // 🌈 NEW: Get condition
            const condition = data.weather[0].main.toLowerCase();

            // 🌈 NEW: Change background
            if (condition.includes("cloud")) {
                document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
            } 
            else if (condition.includes("clear")) {
                document.body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
            } 
            else if (condition.includes("rain")) {
                document.body.style.background = "linear-gradient(135deg, #314755, #26a0da)";
            } 
            else if (condition.includes("mist") || condition.includes("haze")) {
                document.body.style.background = "linear-gradient(135deg, #3e5151, #decba4)";
            } 
            else {
                document.body.style.background = "linear-gradient(135deg, #2b5876, #4e4376)";
            }

            // 📊 Display result
            result.innerHTML = `
                <h3>${cityName}</h3>
                <p style="font-size: 32px; font-weight: bold;">🌡 ${temperature}°C</p>
                <p style="text-transform: capitalize;">☁ ${description}</p>
            `;

            cityInput.value = "";
        })
        .catch(error => {
            result.innerHTML = "⚠ Something went wrong!";
            console.error(error);
        });
});


// 🔥 Press Enter key support
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
});
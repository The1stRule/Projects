import { useState } from 'react';

const WeatherApp = () => {
    const [weather, setWeather] = useState({});
    const [tempUnit, setTempUnit] = useState("Celsius");
    const [errorText, setErrorText] = useState("")

    const fetchData = async (cityName) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c2ca2241522becb3a020db0ad9922955`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cityName = e.target.city.value;

        const data = await fetchData(cityName);
        e.target.reset();
        setWeather(data);
        setErrorText("City not found");
    }

    const handleClikc = () => {
        if(tempUnit === "Celsius") {
            setTempUnit("Fahrenheit");
        } else {
            setTempUnit("Celsius");
        }
    }

    console.log(weather)

    return (
        <main>
            <p id="main-p">Weather Search</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="city" placeholder="Enter a city" required />
                <button id="btn">Search</button>
            </form>
            <div id="result-div">
                {
                    weather.cod === 200 ? (
                        <div id="div1">  
                            <h2>{weather.name}</h2>
                            <p>Weather: {weather.weather[0].description}</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                            <div id="temp-div">
                                <p>Temperature: {
                                tempUnit === "Celsius"?
                                `${Math.round(weather.main.temp - 273.15)}°C`:
                                `${Math.round((weather.main.temp - 273.15) * 9/5 + 32)}°F`
                                }</p>

                                <button onClick={handleClikc}>Temp unit</button>
                            </div>
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        </div>
                    ) : <p id="error-message">{errorText}</p>
                }
            </div>
        </main>
    );
}

export default WeatherApp;

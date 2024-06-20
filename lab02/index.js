const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const env = require('dotenv').config();
const app = express();
const port = 3000;
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partial');

const weather_api_key = process.env.WEATHER_API_KEY;
const geolocation_api_key = process.env.GEOLOCATION_API_KEY;

async function getUserLocation() {
    try {
        const response = await axios.get(`https://api.maptiler.com/geolocation/ip.json?key=${geolocation_api_key}`);
        const locationData = response.data;
        console.log(locationData.city);
        return locationData.city;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving user location');
    }
}

app.get('/', (req, res) => {
    res.render('index');
    }
);

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city || await getUserLocation();
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather_api_key}`);
        const weatherData = response.data;
        const sunrise = new Date(weatherData.sys.sunrise * 1000);
        const sunriseHours = sunrise.getHours();
        const sunriseMinutes = sunrise.getMinutes();
        const sunset = new Date(weatherData.sys.sunset * 1000);
        const sunsetHours = sunset.getHours();
        const sunsetMinutes = sunset.getMinutes();
        weatherData.sunrise = `${sunriseHours}:${sunriseMinutes}`;
        weatherData.sunset = `${sunsetHours}:${sunsetMinutes}`;
        res.render('weather', { weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving weather data');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
);


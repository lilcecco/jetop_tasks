const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/weather', async (req, res) => {
  const { city, date } = req.query;

  // parse date
  const dt = `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}`;

  const fetchCoordinates = async () => {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.API_KEY}`);
    const data = await res.json();
    return data[0];
  }

  const { lat, lon } = await fetchCoordinates();

  const fetchForecasts = async () => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
    const data = await res.json();
    return data['list'];
  }

  let forecasts = await fetchForecasts();
  forecasts = forecasts.filter(forecast => forecast.dt_txt.substring(0, 10) === dt)[0];
  forecasts = { main: forecasts['main'], weather: forecasts['weather'] }

  console.log(forecasts);
  res.send(forecasts);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
const axios = require('axios');
const { response } = require('express');

const getWeather = async (req, res = response) => {
    const { lat, lon, lang, units } = req.query;

    try {
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    lat,
                    lon,
                    "appid": process.env.OW_APIKEY,
                    lang,
                    units
                }
            });
        const json = resp.data

        const dataWeather = {
            weather: json.weather[0],
            temp:{
                temp: json.main.temp,
                temp_min: json.main.temp_min, 
                temp_max: json.main.temp_max, 
            },
            wind:{
                speed: json.wind.speed,
                deg: json.wind.deg,
            },
            humidity: json.main.humidity,
            visibility: json.visibility,
            pressure: json.main.pressure,
            id: json.id,
            name: json.name,
            cod: json.cod
        }

        res.status(200).json(
            dataWeather
        )
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: `No se encontro datos`
        });
    }

}
module.exports = {
    getWeather
}
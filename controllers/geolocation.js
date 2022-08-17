
const axios = require('axios');
const { response } = require('express');


const getPlaces = async (req, res = response) => {
    const { place } = req.params;
    const {limit, lang} = req.query;
    
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`;
    try {
        const resp = await axios.get(url,{
            params:{
                limit,
                'proximity':'ip',
                'language':lang,
                'access_token':process.env.MAPBOX_TOKEN
            }
        })
        const data = resp.data;
        const features = data.features.map(f => {
            const lon = f.geometry.coordinates[0];
            const lat = f.geometry.coordinates[1];
            return {
                place_name: f[`place_name_${lang}`],
                lon,
                lat
            }
        });

      
        res.status(200).json(
            features,
        );
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: `No se encontro ${place}`
        });
    }
}

module.exports = {
    getPlaces
}
const {Router} = require('express');
const { getWeather } = require('../controllers/weather');
const router = Router();

router.get('/', getWeather)

module.exports = router;
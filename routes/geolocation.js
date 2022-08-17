const {Router} = require('express');
const { getPlaces } = require('../controllers/geolocation');

const router = Router();



router.get('/:place',getPlaces);

module.exports = router;

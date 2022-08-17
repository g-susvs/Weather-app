require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.use(cors());

// routes
app.use('/api/geo', require('./routes/geolocation'));
app.use('/api/weather', require('./routes/weather'));

app.listen(port, () => {
    console.log('Server running');
})
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;


app.use(express.json());
const OWM_TOKEN = 'bd5e378503939ddaee76f12ad7a97608';

// Endpoints
app.get('/api/get-pollution-data', async (req, res) => {
    if (!req.query.lat || !req.query.lon || !req.query.appid) {
        res.status(400).json("Error: Missing parameter for lat, lon, or appid.")
    }
    else {
        try {
            const { data } = await axios.get(
                'http://api.openweathermap.org/data/2.5/air_pollution', {
                params: {
                    // Constants for testing
                    // lat: 39.9598876,
                    // lon: -75.1664401,
                    lat: req.query.lat,
                    lon: req.query.lon,
                    appid: OWM_TOKEN
                }
            });

            const pollutiondata = data.list[0];
            const response = {
                aqi: pollutiondata.main.aqi,
                ...pollutiondata.components
            };

            res.json(response);
        } catch (error) {
            res.status(500).json(`Error fetching pollution data from OWM: ${error}`
            );
        }
    }
});

app.listen(port, () => {
    console.log(`Microservice listening on port ${port}...`);
});

// Export the Express API
module.exports = app;

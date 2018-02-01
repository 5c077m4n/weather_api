const https = require('https');
const api = require('./api.json');
// import http for the STATUS_CODES
const http = require('http');

let getWeather = (query) =>
{
    try
    {
        // Connect to the API URL
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, (response) => {
            // console.log(response.statusCode);
            // Read the data
            if(response.statusCode === 200)
            {
                let body = '';
                response.on('data', (data) => {
                    body += data.toString();
                });
                response.on('end', () => {
                    try
                    {
                        // Parse the data
                        const weather = JSON.parse(body);
                        // Print the data
                        console.log(`Current temperature in ${weather.location.city} is ${weather.current_observation.temp_c}C`);
                    }
                    catch(e)
                    {
                        console.log(e.message);
                    }
                })
            }
            else
            {
                const message = `There was a problem in fetching the weather (${http.STATUS_CODES[response.statusCode]}).`;
                const statusCodeError = new Error(message);
                console.error(statusCodeError.message);
            }
        });
        request.on('error', e => {
            console.error(`There was a problem with the request: ${e.message}`);
        });
    }
    catch(error)
    {
        console.error(error.message);
    }
}

module.exports.get = getWeather;
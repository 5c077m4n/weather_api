const https = require('https');
const api = require('./api.json');
// const file = require('fs');
// import http for the STATUS_CODES
const http = require('http');

let getWeather = (query) =>
{
    const readableQuery = query.replace('_', ' ');
    try
    {
        // Connect to the API URL
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, (response) => {
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
                        // let stream = file.createWriteStream('weather.json');
                        // stream.write(body);
                        // stream.on('finish', e => {
                        //     if(e) console.error(e.message);
                        //     else console.log('The .json file was created successfully.')
                        // })
                        // Print the data
                        if(weather.location) console.log(`Current temperature in ${weather.location.city} is ${weather.current_observation.temp_c}C`);
                        else console.error(`The location ${readableQuery} was not found.`);
                    }
                    catch(e)
                    {
                        console.log(e.message);
                    }
                })
            }
            else console.error(`There was a problem in fetching the weather for ${readableQuery} (${http.STATUS_CODES[response.statusCode]}).`);
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
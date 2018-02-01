const weather = require('./weather.js')
// Join the inputted arguments and replace the ' ' by '_'
const query = process.argv.slice(2).join('_').replace(' ', '_');

// query: 90210
// query: Cleveland_OH
// query: London_England
weather.get(query);
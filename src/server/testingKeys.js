const dotenv = require('dotenv');

dotenv.config();

function apiKeys(varname) {
    const geoUsername = process.env.GEO_USERNAME;
    const weatherKey = process.env.WEATHER_KEY;
    const pixaKey = process.env.PIXABAY_KEY;
    return varname;
}

export { apiKeys };
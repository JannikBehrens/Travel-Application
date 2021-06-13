const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const { request, response } = require('express');
const { POINT_CONVERSION_COMPRESSED } = require('constants');


//declare API credentials
// GeoNames
const geoUsername = {username: process.env.GEO_USERNAME};
const GeoApiUrl = 'http://api.geonames.org/searchJSON?q';
// Weatherbit
const weatherKey = {key: process.env.WEATHER_KEY}
const weatherForecastApiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherCurrentApiUrl = "https://api.weatherbit.io/v2.0/current?"
// Pixabay
const pixaKey = { key : process.env.PIXABAY_KEY};
const pixaApiUrl = 'https://pixabay.com/api/?key=';



const app = express()
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8095, function () {
    console.log('Example app listening on port 8095!')
})

app.get('/all', (request, response) => {
    //response.send('Hello World')
    response.send(apiKey)
    
    
});

// fetch url
app.post('/add', function(request, response){
    projectData = request.body;
    console.log(projectData);
    response.send({message: 'received'})
})

app.post('/serverapi', async function(req,res){
    //console.log(req.body)
    userInput = req.body.userUrl;
    //console.log(userInput)
    //console.log('Input Url: ', userInput);
    const apiUrl = `${url}${apiKey.key}&lang=auto&url=${userInput}`
    //console.log(apiUrl)
    const respone = await fetch(apiUrl)
    const data = await respone.json()
    //console.log('MeaningCloud data :', data);
    res.send(data)
})

// Geonames API Call
app.post('/geoApi', async function(request, response){
    //console.log('Getting Geo Data for: ', request.body.dest_key)
    try {
    const destination = encodeURI(request.body.dest_key)
    const url = `${GeoApiUrl}=${destination}&maxRows=1&username=${geoUsername.username}`;
    const fetchGeoApi = await fetch(url);
    //console.log("fetch Geo API: ",fetchGeoApi)
    const location = await fetchGeoApi.json();
    //console.log("Location: ",location)
    response.send(location);
    } catch(error){
        console.log("Error in /geoApi: ", error)
    }
})

// WeatherBit API Call
app.post('/weatherApi', async function(request, response){
    try {
    const lat = request.body.lat;
    const lon = request.body.lon;
    console.log('lat: ', lat)
    console.log('lon: ', lon)
    const forecastUrl = `${weatherForecastApiUrl}&lat=${lat}&lon=${lon}&days=16&key=${weatherKey.key}`
    const currentUrl = `${weatherCurrentApiUrl}&lat=${lat}&lon=${lon}&key=${weatherKey.key}`
    console.log("Forcast URL: ",forecastUrl)
    console.log("Curren URL: ",currentUrl)
    const fetchForecastApi = await fetch (forecastUrl)
    const fetchcurrentApi = await fetch (currentUrl)
    const forecast = await fetchForecastApi.json();
    const current = await fetchcurrentApi.json();
    console.log("Forecast: ",forecast);
    console.log("Current : ", current)
    response.send([forecast, current])
    } catch(error){
        console.log("Error in /weatherApi: ",error)
    }
})

// Pixabay API Call - Producing Cors Error
app.post('/pictureApi', async function(request, response){
    console.log('Getting Pixa Data for: ', request.body.city)
    try {
    const destination = encodeURI(request.body.dest_key)
    const url = `${pixaApiUrl}${pixaKey.key}&q=${destination}&image_type=photo&order=popular&page=1&per_page=3`;
    const fetchPixaApi = await fetch(url);
    console.log("fetch Pixa API: ",fetchPixaApi)
    const pixa = await fetchPixaApi.json();
    console.log("Pixa: ",pixa)
    response.send(pixa);
    } catch(error){
        console.log("Error in /pictureApi: ", error)
    }
})


// Geonames API Call
app.post('/doubleApi', async function(request, response){
    //console.log('Getting Geo Data for: ', request.body.dest_key)
    try {
    const destination = encodeURI(request.body.dest_key)
    const url = `${GeoApiUrl}=${destination}&maxRows=1&username=${geoUsername.username}`;
    const pixUrl = `${pixaApiUrl}${pixaKey.key}&q=${destination}&category=places&image_type=photo&order=popular&page=1&per_page=3`;
    const fetchGeoApi = await fetch(url);
    const fetchPixaApi = await fetch(pixUrl);
    //console.log("fetch Geo API: ",fetchGeoApi)
    const location = await fetchGeoApi.json();
    const pixa = await fetchPixaApi.json();
    //console.log("Location: ",location)
    response.send([location,pixa]);
    } catch(error){
        console.log("Error in /doubleApi: ", error)
    }
})
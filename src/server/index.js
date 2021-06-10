const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

//declare API credentials
const apiKey = {key: process.env.API_KEY};
const url = "https://api.meaningcloud.com/sentiment-2.1?key=";
const cors = require('cors');


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
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
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
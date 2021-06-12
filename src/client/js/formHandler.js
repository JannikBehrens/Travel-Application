import fetch from "node-fetch";
import {updateUI} from "./updateUI"


export const handleSubmit = async e => {
    e.preventDefault()
        
    // safe form inputs
    const destination = document.getElementById('destination').value;
    console.log(destination)
    const tripStart = document.querySelector("#start").value
    console.log(tripStart);
    const tripEnd = document.querySelector("#tripend").value;
    console.log(tripEnd);
    const today = new Date()
    const iso = today.toISOString()
    const isoCut = iso.substring(0, 10)
    
    console.log("isoCut: ",isoCut)
    // Introdice data objects for API calls
    let location = {};
    let weatherForecast = {}
    let weatherCurrent = {}
    let locPic = {}
    
    // Date Calculations
    
    const startDate = new Date(tripStart);
    
    const endDate = new Date(tripEnd);
    //const today = new Date()
    const stay = Math.round((endDate.getTime()-startDate.getTime()) / (1000 * 3600 * 24))
    console.log("Stay: ", stay)
    const daysToStart = Math.round((startDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    console.log("Time to start: ", daysToStart)


    // Check for logical startDate & endDate
    checkDates(daysToStart, startDate, endDate)
    

        
        // --------------Get the coordinates and picture of destination to ----------------------
        // Getting coordinates and picture in one fetch to avoid the cors error from the picture fetch request.
        const geoApiCall = await fetch('http://localhost:8095/doubleApi', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dest_key: destination }),
        });
        try {
            const res = await geoApiCall.json();
            const locationData = res[0]
            const pixa = res[1]
            locPic = pixa.hits[0].webformatURL
            console.log(locationData)
            console.log("Pixa response: ",pixa)
            location = {
                city: locationData.geonames[0].name,
                country: locationData.geonames[0].countryName,
                lat: locationData.geonames[0].lat,
                lon: locationData.geonames[0].lng,
            };
            console.log('Location Coordinates after geoAPICall: ', location);
            
           
        } catch (error) {
            console.error("Error in geoAPICall", error);
            alert('Sorry, did not find the destination.')
        } 
        //---------------------------------------------------------
     //location is an object with the four keys city / country / lat / long
    console.log("Updated location Object: ",location)
    // locPic is an object
    console.log("Updated locPic Object: ", locPic)

    // --------------Get Weather forecast for destination------------
    const weatherApiCall = await fetch('http://localhost:8095/weatherApi', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify( location ),
    });
    try {
		const weatherData = await weatherApiCall.json();
		weatherForecast = weatherData[0];
        weatherCurrent = weatherData[1];
        console.log('Updated weatherforecast Object: ', weatherForecast)
        console.log('Updated weatherCurrent Object: ', weatherCurrent)
	} catch (error) {
		console.error("Error in weatherApiCall: ",error);
	}    
    //-----------------------------------------------------
    
    updateUI(location, weatherForecast, weatherCurrent, locPic, destination, tripStart, daysToStart, stay)
  
	}

    
    function checkDates(daysToStart, startDate, endDate) {
        if (daysToStart <= -1){
            alert('Date for start of your trip must be greater than today')
            throw new Error("Date for start of your trip must be greater than today");  
            return
        } else if (endDate < startDate){
            alert('Date for end of your trip can not be earlier than the start')
            throw new Error("Date for end of your trip can not be earlier than the start");
            return
        } else {
            return true
        }
    }
    export{ checkDates }



   
























import fetch from "node-fetch";

export const handleSubmit = async e => {
    e.preventDefault()
        
    // safe form inputs
    const destination = document.getElementById('destination').value;
    console.log(destination)
    const tripStart = document.querySelector("#start").value
    console.log(tripStart);
    const tripEnd = document.querySelector("#tripend").value;
    console.log(tripEnd);
    
    // Date Calculations
    const startDate = new Date(tripStart);
    const endDate = new Date(tripEnd);
    const today = new Date()
    
    const daysToStart = Math.round((startDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    console.log("Time to start: ", daysToStart)


    // Check for logical startDate & endDate
    if (today > startDate){
        alert('Date for start of your trip can not be in the past');
        return;
    } else if (endDate < startDate){
        alert('Date for end of your trip can not be earlier than the start');
        return;
    }

    // Introdice data objects for API calls
    let location = {};
    let weatherData = {}
    let locPic = {}

    
        const geoApiCall = await fetch('http://localhost:8095/geoApi', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dest_key: destination }),
        });
        try {
            const locationData = await geoApiCall.json();
            location = {
                city: locationData.geonames[0].name,
                country: locationData.geonames[0].countryName,
                lat: locationData.geonames[0].lat,
                lon: locationData.geonames[0].lng,
            };
            console.log('Location Coordinates after geoAPICall: ', location);
            
           
        } catch (error) {
            console.error("Error in geoAPICall", error);
        } 
     //location is a object with the four keys city / country / lat / long
    console.log("Updated location: ",location)

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
		const WeatherResponse = await weatherApiCall.json();
		console.log('Weather from Weatherbit: ', WeatherResponse);
	} catch (error) {
		console.error("Error in weatherApiCall: ",error);
	}
}



   
























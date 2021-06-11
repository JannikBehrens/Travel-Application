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

    // Introdice data objects for API calls
    let location = {};
    let weather = {}
    let locPic = {}
    
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
		weather = weatherData;
        console.log('Updated weather Object: ', weather)
	} catch (error) {
		console.error("Error in weatherApiCall: ",error);
	}

    
    //-----------------------------------------------------

  
	}





   
























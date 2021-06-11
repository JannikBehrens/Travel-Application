// ---------------Get Picture of destination--------------------------
const pictureApiCall = await fetch('http://localhost:8095/pictureApi', {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    
    body: JSON.stringify( c ),
});
try {
    const pixaData = await pictureApiCall.json();
    
    console.log('PixaData: ', pixaData)
} catch (error) {
    console.error("Error in pictureApiCall: ",error);



    // --------------Get the coordinates of destination----------------------
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
        console.log(locationData)
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
function updateUI (location, weather, locPic, destination, tripStart, daysToStart, stay) {
    console.log("Location in updateUI: ", location)
    console.log("weather in updateUI: ", weather)
    console.log("Locpic in updateUI: ", locPic)
    console.log("Stay: ",stay)
    // DOM
    // Picture
    document.getElementById('picture').innerHTML = `<img src="${locPic}" alt="Picture of ${location.city},${location.country}"></img>`
    // Message
    if (daysToStart === 0){
        document.getElementById('cityCountry').innerHTML = `Hurry up, your trip to ${location.city}, ${location.country} starts in the next 24 hours!`
    } else if (daysToStart === 1){
        document.getElementById('cityCountry').innerHTML = `Start your engine, your trip to ${location.city}, ${location.country} starts in the next 48 hours!`
    } else {
    document.getElementById('cityCountry').innerHTML = `In only ${daysToStart} days you'll be in ${location.city}, ${location.country}!`
    }
    // Stay
    if (stay <= 1){
        document.getElementById('stay').innerHTML = `You'll stay for 1 day.`
    } else {
    document.getElementById('stay').innerHTML = `You'll stay for ${stay} days.`
    }
    // Weather Forecast
    if (daysToStart <=7){
        // Current weather
        document.getElementById('weather').innerHTML = `Current Weather`
    } 



}

export { updateUI }
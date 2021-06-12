function updateUI (location, weatherForecast, weatherCurrent, locPic, destination, tripStart, daysToStart, stay) {
    console.log("Location in updateUI: ", location)
    console.log("weather Forecast in updateUI: ", weatherForecast.data)
    console.log("weather Current in updateUI: ", weatherCurrent.data[0])
    console.log("Locpic in updateUI: ", locPic)
    console.log("Stay: ",stay)
    // DOM
    // Empty the dynamic Part of the DOM in case of changed inputs
    document.getElementById('picture').innerHTML = ''
    document.getElementById('cityCountry').innerHTML = ''
    document.getElementById('stay').innerHTML =''
    document.getElementById('weatherCurrent').innerHTML =''
    document.getElementById('weatherForecast').innerHTML =''
    // Picture
    document.getElementById('picture').innerHTML = `<img src="${locPic}" alt="Picture of ${location.city},${location.country}"></img>`
    // Message
    if (daysToStart === 0){
        document.getElementById('cityCountry').innerHTML = `Hurry up, your trip to ${location.city}, ${location.country} starts today!`
    } else if (daysToStart === 1){
        document.getElementById('cityCountry').innerHTML = `Start your engine, your trip to ${location.city}, ${location.country} starts tomorrow!`
    } else {
    document.getElementById('cityCountry').innerHTML = `In only ${daysToStart} days you'll be in ${location.city}, ${location.country}!`
    }
    // Stay
    if (stay <= 1){
        document.getElementById('stay').innerHTML = `You'll stay for 1 day, have a great time.`
    } else {
    document.getElementById('stay').innerHTML = `You'll stay for ${stay} days, have a great time.`
    }
    // Weather Forecast
    if (daysToStart <=7){
        console.log("<=7 running")
        if (daysToStart < 1){
        // Current weather
        document.getElementById('weatherCurrent').innerHTML = `<ul>Live weather in ${location.city}:<li>Temerature: ${weatherCurrent.data[0].temp}°C</li><li>${weatherCurrent.data[0].weather.description}</li><li><img src="https://www.weatherbit.io/static/img/icons/${weatherCurrent.data[0].weather.icon}.png" alt="Icon of ${weatherCurrent.data[0].weather.description}"></img></li</ul>`
        
    } else {
            document.getElementById('weatherCurrent').innerHTML = `<ul>Live weather in ${location.city}:<li>Temerature: ${weatherCurrent.data[0].temp}°C</li><li>${weatherCurrent.data[0].weather.description}</li><li><img src="https://www.weatherbit.io/static/img/icons/${weatherCurrent.data[0].weather.icon}.png" alt="Icon of ${weatherCurrent.data[0].weather.description}"></img></li</ul>`
            for(let i = 0; i<=8; i++){
                if (tripStart === weatherForecast.data[i].datetime){
                    console.log(`It's the ${weatherForecast.data[i].datetime}`)
                }
            document.getElementById('weatherForecast').innerHTML = `<ul>Live forecast for day of arrival:<li>Temerature: ${weatherForecast.data[i].temp}°C</li><li>${weatherForecast.data[i].weather.description}</li><li><img src="https://www.weatherbit.io/static/img/icons/${weatherForecast.data[i].weather.icon}.png" alt="Icon of ${weatherForecast.data[i].weather.description}"></img></li</ul>`    
        }}
    } else if (daysToStart <=16) {
        for(let i = 0; i<=15; i++){
            if (tripStart === weatherForecast.data[i].datetime){
                document.getElementById('weatherForecast').innerHTML = `<ul>Weather forecast for day of arrival:<li>Temerature: ${weatherForecast.data[i].temp}°C</li><li>${weatherForecast.data[i].weather.description}</li><li><img src="https://www.weatherbit.io/static/img/icons/${weatherForecast.data[i].weather.icon}.png" alt="Icon of ${weatherForecast.data[i].weather.description}"></img></li</ul>`
            }
        }
    } else {
        document.getElementById('weatherForecast').innerHTML = `<ul>Latest weather forecast (${weatherForecast.data[15].datetime}):<li>Temerature: ${weatherForecast.data[15].temp}°C</li><li>${weatherForecast.data[15].weather.description}</li><li><img src="https://www.weatherbit.io/static/img/icons/${weatherForecast.data[15].weather.icon}.png" alt="Icon of ${weatherForecast.data[15].weather.description}"></img></li</ul>`
    }



}

export { updateUI }
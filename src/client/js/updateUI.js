function updateUI (location, weatherForecast, weatherCurrent, locPic, destination, tripStart, daysToStart, stay) {
    console.log("Location in updateUI: ", location)
    console.log("weather Forecast in updateUI: ", weatherForecast.data)
    console.log("weather Current in updateUI: ", weatherCurrent.data[0])
    console.log("Locpic in updateUI: ", locPic)
    console.log("Stay: ",stay)
    // DOM
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
        document.getElementById('stay').innerHTML = `You'll stay for 1 day.`
    } else {
    document.getElementById('stay').innerHTML = `You'll stay for ${stay} days.`
    }
    // Weather Forecast
    if (daysToStart <=7){
        console.log("<=7 running")
        if (daysToStart < 1){
        // Current weather
        document.getElementById('weatherCurrent').innerHTML = `<ul>Current Weather in ${location.city}:<li>Temerature: ${weatherCurrent.data[0].temp}°</li><li>Condition: ${weatherCurrent.data[0].weather.description}<img src="https://www.weatherbit.io/static/img/icons/${weatherCurrent.data[0].weather.icon}.png" alt="Icon of ${weatherCurrent.data[0].weather.description}"></img></li</ul>`
        } else {
            document.getElementById('weatherCurrent').innerHTML = `<ul>Current Weather in ${location.city}:<li>Temerature: ${weatherCurrent.data[0].temp}°</li><li>Condition: ${weatherCurrent.data[0].weather.description}<img src="https://www.weatherbit.io/static/img/icons/${weatherCurrent.data[0].weather.icon}.png" alt="Icon of ${weatherCurrent.data[0].weather.description}"></img></li</ul>`
            for(let i = 0; i<=8; i++){
                if (tripStart === weatherForecast.data[i].datetime){
                    console.log(`It's the ${weatherForecast.data[i].datetime}`)
                }
            document.getElementById('weatherForecast').innerHTML = `<ul>Weather forecast for day of arrival:<li>Temerature: ${weatherForecast.data[i].temp}°</li><li>Condition: ${weatherForecast.data[i].weather.description}<img src="https://www.weatherbit.io/static/img/icons/${weatherForecast.data[i].weather.icon}.png" alt="Icon of ${weatherForecast.data[i].weather.description}"></img></li</ul>`    
        }}
    } else if (daysToStart <=16) {
        for(let i = 0; i<=15; i++){
            if (tripStart === weatherForecast.data[i].datetime){
                document.getElementById('weatherForecast').innerHTML = `<ul>Weather forecast for day of arrival:<li>Temerature: ${weatherForecast.data[i].temp}°</li><li>Condition: ${weatherForecast.data[i].weather.description}<img src="https://www.weatherbit.io/static/img/icons/${weatherForecast.data[i].weather.icon}.png" alt="Icon of ${weatherForecast.data[i].weather.description}"></img></li</ul>`
            }
        }
    } else {
        document.getElementById('weatherForecast').innerHTML = `<ul>Latest weather forecast (${weatherForecast.data[15].datetime}):<li>Temerature: ${weatherForecast.data[15].temp}°</li><li>Condition: ${weatherForecast.data[15].weather.description}<img src="https://www.weatherbit.io/static/img/icons/${weatherForecast.data[15].weather.icon}.png" alt="Icon of ${weatherForecast.data[15].weather.description}"></img></li</ul>`
    }



}

export { updateUI }
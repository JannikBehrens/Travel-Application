# Travel Application

## Udacity Capstone Project

This web app takes as input a destination, a start date and a end date. It returns (if found) a picture of the loaction based on the first result from a API Call to Pixabay. It also shows:

- Current weather, if the start date is today.
- current weather and weather on start day, if the trip is within a week.
- weather on startday, if the trip is within the next 16 days(max of forecast).
- latest forecast, if the trip is in more than 16 days.
- Length of stay
- Days to start day

## Key Components of this Project

- Webserver
- Express
- Webpack as a build tool
- 3 API Calls (weatherbit, geonames, pixabay)
- Offline Functionality (workbox plugin)
- DOM manipulation

## Key Commands

- npm run test
- npm run build-dev
- npm run build-prod
- npm start

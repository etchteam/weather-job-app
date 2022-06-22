# Weather (job) application

## Set up

First cd into weather-app-backend and run **npm i** followed by **npm start** - You can navigate to http://localhost:3001/api/weather-data to view the API outcome.

Then cd into weather-app and run **npm i** followed by **npm start** - Navigate to http://localhost:3000/ to view the final product.

## About

This is my first time using Node.js as a backend - after working primarily in PHP for server-side this was definitely stepping outside of my comfort zone!

The backend is powered by Express.js which so far has proved pretty easy to use. It is split up into 2 controllers, one to determine the user's location based off their IP and the other to pull through the weather for that location. The resulting data is displayed in JSON format ready to be consumed by the frontend.

The frontend is built with React, again something I have used a few times but still have a lot of learning to be done. We have the home page which is responsible for fetching the data from the backend API and splitting it up into datasets for today and tomorrow's weather. For both displays the 'Table' component is rendered, with a 'Table Item' component nested within it for each hour of the day.


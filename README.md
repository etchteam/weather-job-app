# Notes

## Back-end
- Before running, a .env file should be added containing a valid token for IPInfo to use: `IPINFO_TOKEN = 'valid token'`.
- The data from the weather API gets cached using the node-cache npm module to avoid repeatedly asking for the same data. The data is stored until it expires (based on the date/time in the Expires header returned by the API).

## Front-end
- The current location, date/time and weather are shown in a panel on the left, while the right shows the weather for the rest of the day in a table with expandable rows for additional detail. There are also tabs to view tomorrow's weather or the next 10 days.
- I used Bootstrap for the style to quickly produce a responsive and clean front-end, and create-react-app to form the React app structure.
- The weather icons were obtained from the MET weather API service, and I have used additional icons from FontAwesome.

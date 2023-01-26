# Strive Blog Template

## before Deploying to the cloud

- `npm i dotenv`
- create .evn file and set '`REACT_APP_BE_URL = http://localhost:3001`' "`REACT_APP`" is a must while seting the variable
- when fetching data from the API `const Url = process.env.REACT_APP_BE_URL;` use the variable as an endpoint
- set all the keys in the `.env` file

## To the Cloud

- `https://vercel.com/`
- From the pletform where the app is being hosted set envirment varibales
- If there is any errors while building the app set the E-Variable `CI` as `false`
- project > settings > Environment Variable > NAME: `REACT_APP_BE_URL`: VALUE: in here as a value use the API urls (Url of the backend where it is from hosted) `https://${App-Name}.herokuapp.com`

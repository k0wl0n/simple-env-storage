###Simple Express JS Environment Storage Server

This simple server will allow you to create your API to store your Environment as a json file

###Installing & Running
To install and run simply follow these steps:

1)  Clone this repo

2)  Open your terminal and run `node server.js`

3)  Your server is now available at `http://localhost:8080/`

4)  You can run a quick test by entering this in your browser: `http://localhost8080/environment`

5)  You can get list, save new ENV and delete the ENV :
    Get list ENV: `curl --location --request GET '127.0.0.1:8080/environment'`
    Save ENV : `curl --location --request POST '127.0.0.1:8080/environment' --header 'Content-Type: application/json' --data-raw {"env":"JOB_PORT","value": "2222"}'`
    Edit ENV : `curl --location --request PUT '127.0.0.1:8080/environment' --header 'Content-Type: application/json' --data-raw {"env":"JOB_PORT","value": "2222"}'`

###Run With Docker
To run with docker follow these steps:
1)  build the image: `docker build -f dockerfile.alpine_slim -t <docker username>/express-alpine-slim .`
2)  run the image: `docker run -p 8080:8080 <docker username>/express-alpine-slim`

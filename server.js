var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
const fs = require('fs')

var app = express();
var server = http.createServer(app);

//Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var environment = require('./config.json')
app.get('/', function (req, res) {
    res.status(200).send("hello e-fishery");
});

app.route('/environment')
    .get(function (req, res) {
        console.log(environment);
        res.send(environment);
    })
    .post(function (req, res) {
        var env = req.body;
        environment.push(env);
        console.log(environment);

        write(environment);
        res.status(200).send(environment);
    })
    .put(function (req, res) {
        console.log(req.body.env);
        if (req.body.env && req.body.value) {
            for (let i = 0; i < environment.length; i++) {
                const e = environment[i];
                if (e.env == req.body.env) {
                    environment[i]['value'] = req.body.value;
                    console.log('environment', environment);
                }
            }

            write(environment);
            console.log(environment);
            res.send(environment);
        } else {
            res.send('Failed to Update ENV');
        }
    });

function write(environment) {
    const jsonString = JSON.stringify(environment)
    fs.writeFile('./config.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

server.listen(8080, '0.0.0.0');
console.log('Server Running ....');
// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var fs = require('fs');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
    var constants = require(__dirname + '/constants.js');

var api = new ParseServer({
    databaseURI: constants.MONGODB_URL,
    cloud: constants.CLOUD_PATH,
    appId: constants.APP_ID,
    masterKey: constants.MASTER_KEY,
    clientKey: constants.CLIENT_KEY,
    restAPIKey: constants.REST_API_KEY,
    javascriptKey: constants.JAVASCRIPT_KEY,
    dotNetKey: constants.DOTNET_KEY,
    serverURL: constants.SERVER_URL,
    push: {
        ios: {
            token: {
                key: constants.APNS_FILE_NAME,
                keyId: constants.APNS_KEY_ID,
                teamId: constants.iOS_TEAM_ID
            },
            topic: constants.iOS_BUNDLE,
            production: constants.IS_PRODUCTION
        },
        android: {
            apiKey: 'AIzaSyBcr0GWlksgcg7UO5croVWKa-5PFuw3igw'
        }
    },
    supportedPushLocales: ["en", "tr"],
    liveQuery: {
        classNames: []
    }
});

var dashboard = new ParseDashboard({
    "apps": [
        {
            "appId": constants.APP_ID,
            "appName": constants.APP_NAME,
            "clientKey": constants.CLIENT_KEY,
            "dotNetKey": constants.DOTNET_KEY,
            "javascriptKey": constants.JAVASCRIPT_KEY,
            "masterKey": constants.MASTER_KEY,
            "restAPIKey": constants.REST_API_KEY,
            "serverURL": constants.SERVER_REMOTE_URL
        }
    ],
    "users": [
        {
            "user": "ulas",
            "pass": "201015ulas"
        }
    ]
}, constants.IS_SECURE);

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

app.use('/dashboard', dashboard);

// Serve static assets from the /public folder
//app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = '/sportable';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
//app.get('/', function (req, res) {
//    res.status(200).send('Go away! :P');
//});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
//app.get('/test', function (req, res) {
//    res.sendFile(path.join(__dirname, '/public/test.html'));
//});

var httpServer = require('http').createServer(app);
if (constants.IS_SECURE) {
    var options = {
        key: fs.readFileSync('privkey.pem'),
        cert: fs.readFileSync('fullchain.pem'),
        requestCert: false,
        rejectUnauthorized: true
    };
    httpServer = require('https').createServer(options, app);
}

httpServer.listen(constants.PORT, function(){
    console.log("Listening on port " + constants.PORT)
});

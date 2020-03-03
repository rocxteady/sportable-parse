/**
 * Created by ulas on 03/08/16.
 */

let os = require("os");
let hostname = os.hostname();
console.log('hostname = '+hostname);
let mongoDBURL = null;
let serverURL = null;
let serverRemoteURL = null;
let isSecure = false;
let isProduction = false;

if (hostname === 'tweetsquare') {
    mongoDBURL = 'mongodb://ulas:201015ulas@tweetsquare.me:27017/pitho?ssl=true';
    serverURL = 'https://localhost:8081/pitho';
    serverRemoteURL = 'https://tweetsquare.me:8081/pitho';
    isSecure = true;
    isProduction = true;
 }
 else {
    mongoDBURL = 'mongodb://ulas:201015ulas@localhost:27017/pitho';
    serverURL = 'http://localhost:8081/pitho';
    serverRemoteURL = 'http://localhost:8081/pitho';
 }

module.exports = Object.freeze({
    MONGODB_URL: mongoDBURL,
    SERVER_URL: serverURL,
    SERVER_REMOTE_URL: serverRemoteURL,
    IS_SECURE: isSecure,
    IS_PRODUCTION: isProduction,
    APNS_FILE_NAME: 'AuthKey_HC3M2JQU49.p8',
    APNS_KEY_ID: 'HC3M2JQU49',
    PORT: 8081,
    APP_NAME: 'Pitho',
    APP_ID: 'me.pitho',
    iOS_TEAM_ID: '3U82SFTT2K',
    iOS_BUNDLE: 'me.tweetsquare.ios',
    CLOUD_PATH: 'cloud/main.js',
    MASTER_KEY: 'gT8XXacaGdzMK6uzeQCyOZPs4wBimNuv',
    CLIENT_KEY: 'gOUh2TrfXVabvegNUh0NJnbgWfHo8lM5',
    REST_API_KEY: 'HcLPKIJXWjHRTN89RkSdWR5w61XCukGd',
    JAVASCRIPT_KEY: 'LNebjNin6EYQ9TWe9LdXJGVEXcYoCyxd',
    DOTNET_KEY: '8OD2VJ10ffzEG46MgqHhy8iCWVcj7aN2',
    TWITTER_API_KEY: 'JYdJlKafRZIqAz8hi7RxPPDDt',
    TWITTER_API_SECRET: 'voa8YPpcnX6FL7rlGpozWysVOUkKmOk6fLgyOupWooG1z7f5Va',
    CERT_PASS: '201015ulas'
});
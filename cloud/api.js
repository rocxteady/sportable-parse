const DateUtils = require("./dateutils.js");

const constants = {
    baseURL: "https://apiv2.apifootball.com",
    apiKey: "a3c29489b68db8f0145d9087e843768232ac49ade993681c576e97955da31742"
}

const endpoints = {
    events: {
        name: "Events",
        interval: 10,
        type: 5,
        action: "get_events"
    }
};

const makeLiveEventsRequest = function() {
    return Parse.Cloud.httpRequest({
        url: constants.baseURL,
        params: {
            APIkey: constants.apiKey,
            action: endpoints.events.action,
            timezone: 'Europe/Istanbul',
            from: DateUtils.function(new Date()),
            to: DateUtils.function(new Date())
        }
    });
};

module.exports = {
    constants,
    endpoints,
    makeLiveEventsRequest
}
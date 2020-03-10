const api = require('./api.js');
Parse.Cloud.define("liveEvents", async (request) => {
    let result = await getLiveEventsFromParse();
    return result;
});

function getLiveEventsFromParse() {
    return new Promise((resolve, reject) => {
        let endpoint = null;
        let liveEvents = null;
        let contents = null;
        getEndpoint(api.endpoints.events.type).then(function (receivedEndpoint) {
            endpoint = receivedEndpoint;
            const Contents = Parse.Object.extend("Contents");
            const query = new Parse.Query(Contents);
            const Endpoint = Parse.Object.extend("Endpoint");
            query.equalTo("endpoint", endpoint);
            return query.first();
        }).then(function (receivedContents) {
            contents = receivedContents;
            if (isLiveEventsOld(contents)) {
                return getLiveEventsFromAPI();
            }
            else {
                resolve(contents.get("data"));
            }
        }).then(function (liveEventsFromAPI) {
            if (liveEventsFromAPI !== undefined) {
                liveEvents = liveEventsFromAPI;
                if (contents === undefined) {
                    const Contents = Parse.Object.extend("Contents");
                    contents = new Contents();
                    contents.set("endpoint", endpoint);
                }
                contents.set("data", liveEventsFromAPI);
                return contents.save();
            }
        }).then(function (contents) {
            if (liveEvents !== undefined) {
                resolve(liveEvents);
            }
        }).catch(function (error) {
            reject(error);
        });
    });
}

function getLiveEventsFromAPI() {
    return new Promise((resolve, reject) => {
        api.makeLiveEventsRequest().then(function (httpResponse) {
            const jsonResponse = JSON.parse(httpResponse.text);
            const status = jsonResponse.error;
            if (status !== undefined) {
                reject(jsonResponse);
            }
            else {
                resolve(jsonResponse);
            }
        }, function (httpResponse) {
            reject(httpResponse.text);
            console.error('Request failed with response code ' + httpResponse.status);
        });
    });
}

function isLiveEventsOld(liveEvents) {
    const updatedDate = liveEvents.updatedAt.getTime();
    const currentDate = new Date().getTime();
    const difference = (currentDate - updatedDate) / 1000;
    const max = 61;
    if (difference > max) {
        return true;
    }
    return false;
}

function getEndpoint(type) {
    const Endpoint = Parse.Object.extend("Endpoint");
    const query = new Parse.Query(Endpoint);
    query.equalTo("type", type);
    return query.first();
}
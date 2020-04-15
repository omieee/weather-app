const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1Ijoib21uZXdpIiwiYSI6ImNrOHd6eDNhczAxcGwzZ2s0bWRscDRldW4ifQ.e15yRqWEvEBHcSTUR7VdjQ"
    request({ url, json: true }, (error, { body }) => {
            if(error) {
                    callback("Unable to connect to geolocation service", undefined)
            } else if(body.features.length === 0) {
                    callback("Unable to find coordinates for passed location", undefined)
            } else {
                    response = {
                            latitude: body.features[0].center[1],
                            longitude: body.features[0].center[0],
                            location: body.features[0].place_name
                    }
                    callback(undefined, response)
            }

    })
}

const weather = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3ab5802f223f64648b159629e08b5ccd&query="+latitude+","+longitude+""
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather services", undefined)
        } else if(body.current.length === 0) {
            callback("Unable to fetch forecase for passed location", undefined)
        } else {
            response = {
                description:  body.current.weather_descriptions[0],
                temperature:  body.current.temperature,
                feelslike:  body.current.feelslike,
                humidity: body.current.humidity   
            }
            callback(undefined, response)
        }
    })
}

module.exports = {geocode, weather}
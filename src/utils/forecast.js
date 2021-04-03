const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a5f2b7a72879bbc5a29a47aa2ce2c609&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out...`
      );
    }
  });
};

module.exports = forecast;

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (err, resp, body) => {
    if (err) return callback(err, null);

    if (resp.statusCode !== 200) {
      callback(`Status Code ${resp.statusCode} when fetching IP. Response: ${body}`, null);
      return;
    }
    
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (err, resp, body) => {
    if (err) return callback(err, null);

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coordsObj = JSON.parse(body);

    if (!coordsObj.success) {
      callback(`Success status was ${coordsObj.success}. Server message says: ${coordsObj.message} when fetching for IP ${coordsObj.ip}`, null);
      return;
    }
    
    callback(null, coordsObj);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const myLong = coords.longitude;
  const myLat = coords.latitude;

  request(`https://iss-flyover.herokuapp.com/json/?lat=${myLat}&lon=${myLong}`, (err, resp, body) => {
    if (err) return callback(err, null);

    if (resp.statusCode !== 200) {
      callback(`Status Code ${resp.statusCode} when fetching coordinates. Response: ${body}.`, null);
      return;
    }

    const riseTimes = JSON.parse(body);
    callback(null, riseTimes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
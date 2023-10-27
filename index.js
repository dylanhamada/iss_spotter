const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

const myIP = "70.27.172.114";
const myCoords = {
  latitude: "43.7315479",
  longitude: "-79.7624177"
};

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP(myIP, (error, coord) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! Returned coordinates: ${coord.longitude}, ${coord.latitude}`);
// });

// fetchISSFlyOverTimes(myCoords, (error, riseTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("Here is a list of upcoming rise times to view the ISS, based on your coordinates.")
//   for (let time of riseTimes.response) {
//     console.log(`Rise time: ${time.risetime}, Duration: ${time.duration}`);
//   }
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
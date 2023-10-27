const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("70.27.172.114", (error, coord) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! Returned coordinates: ${coord.longitude}, ${coord.latitude}`);
// });
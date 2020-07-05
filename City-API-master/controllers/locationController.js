const catchAsync = require("../utils/catchAsync.js");
const AppError = require("./../utils/AppError");
const { distanceBetweenPoints } = require("./../utils/calculateDistance");
const { getAllUsers } = require("./../externalAPI/externalAPI");

// We can add as many cities as required - just add the city latitude and longitude below
const latLngValues = {
  london: [51.509865, -0.118092],
  madrid: [40.416775, -3.70379],
};

exports.fetchUsersWithinLocation = catchAsync(async (req, res, next) => {
  // PLEASE NOTE: Check to make sure users coordinates are saved as (lng,lat) and not (lat,lng) in the database.

  // 1) Get city of params
  const { city } = req.params;

  // Get lat, lng for city
  const [cityLat, cityLng] = latLngValues[city];

  // Max distance from city location
  const distance = 50;

  try {
    // Fetch data from external API
    const data = await getAllUsers("users");

    // Distance less than or equal to 50 miles from city
    const allUsers = data.filter(
      ({ latitude, longitude }) =>
        distance >=
        Math.ceil(distanceBetweenPoints(latitude, longitude, cityLat, cityLng))
    );

    res.status(200).json({
      status: "success",
      results: allUsers.length,
      users: allUsers,
    });
  } catch (error) {
    next(new AppError("Third-party server is down.", 500));
  }
});

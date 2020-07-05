const express = require("express");
const locationController = require("../controllers/locationController");

const router = express.Router();

router.route("/:city/users").get(locationController.fetchUsersWithinLocation);

module.exports = router;

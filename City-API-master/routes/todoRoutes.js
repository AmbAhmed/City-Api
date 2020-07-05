const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.route("/").get(todoController.fetchtodos);

module.exports = router;

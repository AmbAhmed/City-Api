const catchAsync = require("../utils/catchAsync.js");
const { getAllUsers } = require("./../externalAPI/externalAPI");

exports.fetchtodos = catchAsync(async (req, res, next) => {
  const data = await getAllUsers("instructions");

  res.status(200).json({
    status: "success",
    results: data.length,
    todos: data.todo,
    message: "Fetched all todos successfuly!",
  });
});

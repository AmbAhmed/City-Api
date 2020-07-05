const catchAsync = require("../utils/catchAsync.js");
const { getAllUsers } = require("./../externalAPI/externalAPI");

exports.fetchAllUsers = catchAsync(async (req, res, next) => {
  const users = await getAllUsers("users");

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
    message: "Fetched all users successfuly!",
  });
});

exports.fetchOneUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await getAllUsers(`user/${id}`);

  // Mongoose will return null if no docs are found, hence we create our own error message
  // PLEASE NOTE: We do not handle general mongoose errors like duplication or validation errors with the AppError class

  if (!user) {
    return next(new AppError("Error. Please check user ID and try again", 404));
  }
  res.status(200).json({
    status: "success",
    user,
    message: "User fetched successfuly!",
  });
});

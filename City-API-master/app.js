const express = require("express");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");
const usersRouter = require("./routes/usersRoutes");
const userRouter = require("./routes/userRoutes");
const locationRouter = require("./routes/locationRoutes");
const todosRouter = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

// Allow origin headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/instructions", todosRouter);
app.use("/api/v1/city", locationRouter);

// If a request is not consumed by any route, all verbs will result in a response with error
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find endpoint: ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;

const sendErrorProd = (error, res) => {
  //Operational, trusted error: send message to client

  const { isOperational, statusCode, status, message } = error;
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });

    // Programming or other unknown error: i,e third party package error
  } else {
    // Log the error

    //Send generic message
    res.status(500).json({
      status: "error",
      message:
        "We Apologise. Server is currently down. Please try again later.",
    });
  }
};

const sendErrorDev = (error, res) => {
  const { statusCode, status, message, stack } = error;
  res.status(statusCode).json({
    status,
    message,
    error,
    stack,
  });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    return sendErrorProd(error, res);
  }
};

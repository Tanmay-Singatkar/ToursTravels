const errorMiddleware = (err, req, res, next) => {
  const status = err.status||500;
  const message = err.message || "BACKEND ERROR";
  res.status(status).json({
    success: false,
    message,
  });
};

export default errorMiddleware;

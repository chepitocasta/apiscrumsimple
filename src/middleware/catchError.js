const catchErrors = (error, req, res, next) => {
  res.status(400).json({ message: error.message });
};

module.exports = catchErrors;

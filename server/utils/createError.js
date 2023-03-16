const createError = (statusCode, message) => {
  const err = new Error();
  err.status = statusCode;
  err.message = message;

  return err;
};

export default createError;

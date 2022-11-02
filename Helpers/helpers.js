const sendResponse = (res, data, code = 200, message = "") => {
  let response = {
    code: code,
    data: data,
    message: message,
  };

  res.status(code).json(response);
};

module.exports = {
  sendResponse: sendResponse,
};

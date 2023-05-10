// we can use the helper function from logger.js
const { logEvents } = require("./logger.js");

// this is going to overwrite the default express error handling
const errHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message, isError: true });
  // the isError: true is a flag that RTKQuery is going to require for any unexpected error
};

module.exports = errHandler;

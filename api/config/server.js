const express = require("express");
require("./db.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./corsOptions.js");
const routes = require("../src/routes/index.js");
const { logger } = require("../middleware/logger.js");
const errHandler = require("../middleware/errorHandler.js");

const server = express();

server.name = "API";

server.use(logger);
// cors restricts the origins that can access our REST API
// you can check this in the browser by opening any webpage, going to the console and
// do a fetch('http://3001')
server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Allows us to access static files like css images or files we would use in the server
// for example in public folder or views folder
server.use("/", express.static(path.join(__dirname, "..", "public")));

server.use("/", routes);

// The following takes care of 404 errors
// Everything that reaches "all" will be put through this catch-all
server.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    // if headers has an accepts response = html
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    // if headers has an accepts response = json
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

server.use(errHandler);

module.exports = server;

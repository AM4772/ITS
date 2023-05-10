const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./corsOptions.js");
const routes = require("../src/routes/index.js");
const { logger } = require("../middleware/logger.js");
const errHandler = require("../middleware/errorHandler.js");
// require("./db.js");
const server = express();
// const local = "http://localhost:3000";
// const vercel = "https://bookstore-rose.vercel.app";

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
// server.use((req, res, next) => {
//   const allowedOrigins = [local, vercel]; // when deployed
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

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

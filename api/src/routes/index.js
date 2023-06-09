const express = require("express");
const router = express.Router();

router.use("/", require("./rootRoutes.js"));
router.use("/auth", require("./authRoutes.js"));
router.use("/users", require("./usersRoutes.js"));
router.use("/tickets", require("./ticketsRoutes.js"));

module.exports = router;

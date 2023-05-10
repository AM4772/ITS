// This is to render a splash page for our backend
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "views", "index.html"));
});

module.exports = router;

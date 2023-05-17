const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsControllers.js");
const verifyJWT = require("../../middleware/verifyJWT.js");

router.use(verifyJWT);

router
  .route("/") // this will match the /tickets in the routes/index.js
  .get(ticketsController.getAllTickets)
  .post(ticketsController.createNewTicket)
  .put(ticketsController.updateTicket)
  .delete(ticketsController.deleteTicket);

module.exports = router;

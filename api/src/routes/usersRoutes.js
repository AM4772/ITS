const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers.js");
const verifyJWT = require("../../middleware/verifyJWT.js");

router.use(verifyJWT);

router
  .route("/") // this will match the /users in the routes/index.js
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;

// const router = require("express").Router();
// const { Users } = require("../../config/db.js");

// router.post("/", async (req, res) => {
//   console.log(req.body);

//   try {
//     await Users.create(req.body);

//     return res.status(201).json({ message: "Successfully registered" });
//   } catch (error) {
//     return res.status(400).json("Error creating new user");
//   }
// });

// module.exports = router;

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

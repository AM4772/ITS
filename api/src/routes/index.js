const express = require("express");
const router = express.Router();

router.use("/", require("./rootRoutes.js"));
router.use("/auth", require("./authRoutes.js"));
router.use("/users", require("./usersRoutes.js"));
router.use("/tickets", require("./ticketsRoutes.js"));
// router.get("/", (req, res) => {
//   res.send(
//     "<div>All users: <a href=/users>/users</a></div><div> Test user query: <a href=/users?username=test>/user?username=test</a></div><div> Test users by ID: <a href=/users/1 > /users/1</a></div> <div> Test username: <a href=/usernames> /usernames</a></div> <div> Test emails: <a href=/emails> /emails</a></div>"
//   );
// });

module.exports = router;

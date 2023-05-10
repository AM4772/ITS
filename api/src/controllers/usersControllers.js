const { Users, Tickets } = require("../../config/db.js");
const { Sequelize, Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from db
  const users = await Users.findAll({
    attributes: {
      exclude: ["password"],
    },
  });

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { name, surname, username, email, password, role, active } = req.body;

  // Confirm data
  if (!name || !surname || !username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await Users.findOne({
    where: {
      [Op.or]: [
        { username: { [Op.iLike]: `%${username}%` } },
        { email: email },
      ],
    },
  });

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = {
    name,
    surname,
    username,
    email,
    password: hashedPwd,
    role,
    active,
  };

  // Create and store new user
  const user = await Users.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route PUT /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email, password, role, active } = req.body;

  // Confirm data
  if (!id || !username || !email || typeof active !== "boolean") {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await Users.findOne({
    where: { username: { [Op.iLike]: `%${username}%` } },
  });

  // Allow updates to the original user
  if (duplicate && duplicate?.id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.role = role;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user have assigned tickets?
  const ticket = await Tickets.findOne({
    where: { userId: id },
  });
  if (ticket) {
    return res.status(400).json({ message: "User has assigned tickets" });
  }

  // Does the user exist to delete?
  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = user;
  await user.destroy();
  // const result = await user.destroy();

  const reply = `Username ${result.username} with ID ${result.id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};

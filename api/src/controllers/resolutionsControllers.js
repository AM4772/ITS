const { Resolutions } = require("../../config/db.js");
const { Sequelize, Op } = require("sequelize");
const asyncHandler = require("express-async-handler"); // helps avoid using try/catch handlers

// @desc Get all resolutions
// @route GET /resolutions
// @access Public
const getAllResolutions = asyncHandler(async (req, res) => {
  // Get all resolutions from db
  const resolutions = await Resolutions.findAll();

  // If no resolutions
  if (!resolutions?.length) {
    return res.status(400).json({ message: "No resolutions found" });
  }

  res.json(resolutions);
});

// @desc Create new ticket
// @route POST /resolutions
// @access Public
// const createNewTicket = asyncHandler(async (req, res) => {
//   const {
//     name,
//     details,
//     steps,
//     version,
//     priority,
//     severity,
//     nature,
//     status,
//     author,
//     userId,
//   } = req.body;

//   // Confirm data
//   if (!name || !details || !steps || !version) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check for duplicate ticket
//   const duplicate = await Resolutions.findOne({
//     where: { name: { [Op.iLike]: `%${name}%` } },
//   });

//   if (duplicate) {
//     return res.status(409).json({ message: "Duplicate ticket" });
//   }

//   // const userObject = {
//   //   name,
//   //   details,
//   //   steps,
//   //   version,
//   //   priority,
//   //   severity,
//   //   nature,
//   //   status,
//   //   author,
//   //   userId,
//   // };

//   // Create and store new ticket
//   const ticket = await Resolutions.create({
//     name,
//     details,
//     steps,
//     version,
//     priority,
//     severity,
//     nature,
//     status,
//     author,
//     userId,
//   });

//   if (ticket) {
//     //created
//     res.status(201).json({ message: `New ticket ${name} created` });
//   } else {
//     res.status(400).json({ message: "Invalid ticket data received" });
//   }
// });

// // @desc Update a ticket
// // @route PUT /resolutions
// // @access Public
// const updateTicket = asyncHandler(async (req, res) => {
//   const {
//     id,
//     name,
//     details,
//     steps,
//     version,
//     priority,
//     severity,
//     nature,
//     status,
//     author,
//     userId,
//   } = req.body;

//   // Confirm data
//   if (!name || !details || !steps || !version) {
//     return res.status(400).json({ message: "All fields with * are required" });
//   }

//   // Does the ticket exist to update?
//   const ticket = await Resolutions.findByPk(id);

//   if (!ticket) {
//     return res.status(400).json({ message: "Ticket not found" });
//   }

//   // Check for duplicate name
//   const duplicate = await Resolutions.findOne({
//     where: { name: { [Op.iLike]: `%${name}%` } },
//   });

//   // Allow renaming the original ticket
//   if (duplicate && duplicate?.id !== id) {
//     return res.status(409).json({ message: "Duplicate ticket name" });
//   }

//   ticket.name = name;
//   ticket.details = details;
//   ticket.steps = steps;
//   ticket.version = version;
//   ticket.priority = priority;
//   ticket.severity = severity;
//   ticket.nature = nature;
//   ticket.status = status;
//   ticket.userId = userId;

//   const updatedTicket = ticket;
//   await ticket.save();

//   res.json({ message: `Ticket ${updatedTicket.name} updated` });
// });

// // @desc Delete a ticket
// // @route DELETE /resolutions
// // @access Private
// const deleteTicket = asyncHandler(async (req, res) => {
//   const { id } = req.body;

//   // Confirm data
//   if (!id) {
//     return res.status(400).json({ message: "Ticket ID Required" });
//   }

//   // Does the ticket have assigned dev?
//   const user = await Resolutions.findOne({
//     where: { userId: id },
//   });
//   if (user) {
//     return res
//       .status(400)
//       .json({ message: "Ticket has been assigned to Developer" });
//   }

//   // Does the ticket exist to delete?
//   const ticket = await Resolutions.findByPk(id);

//   if (!ticket) {
//     return res.status(400).json({ message: "Ticket not found" });
//   }

//   const result = ticket;
//   await ticket.destroy();

//   const reply = `Ticket ${result.name} with ID ${result.id} deleted`;

//   res.json(reply);
// });

module.exports = {
  getAllResolutions,
  // createNewTicket,
  // updateTicket,
  // deleteTicket,
};

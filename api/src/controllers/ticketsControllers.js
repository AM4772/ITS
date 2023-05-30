const { Tickets } = require("../../config/db.js");
const { Sequelize, Op } = require("sequelize");
const asyncHandler = require("express-async-handler"); // helps avoid using try/catch handlers

// @desc Get all tickets
// @route GET /tickets
// @access Public
const getAllTickets = asyncHandler(async (req, res) => {
  // Get all tickets from db
  const tickets = await Tickets.findAll();

  // If no tickets
  if (!tickets?.length) {
    return res.status(400).json({ message: "No tickets found" });
  }

  res.json(tickets);
});

// @desc Create new ticket
// @route POST /tickets
// @access Public
const createNewTicket = asyncHandler(async (req, res) => {
  const {
    name,
    application,
    details,
    steps,
    version,
    priority,
    severity,
    nature,
    status,
    resolution,
    author,
    userId,
  } = req.body;

  // Confirm data
  if (!name || !details || !steps || !version) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate ticket
  const duplicate = await Tickets.findOne({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate ticket" });
  }

  // Create and store new ticket
  const ticket = await Tickets.create({
    name,
    application,
    details,
    steps,
    version,
    priority,
    severity,
    nature,
    resolution,
    author,
    userId,
  });

  if (ticket) {
    //created
    res.status(201).json({ message: `New ticket ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid ticket data received" });
  }
});

// @desc Update a ticket
// @route PUT /tickets
// @access Public
const updateTicket = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    application,
    details,
    steps,
    version,
    priority,
    severity,
    nature,
    status,
    resolution,
    userId,
  } = req.body;
  console.log(name);
  console.log(application);

  // Confirm data
  if (!name || !application || !details || !steps || !version) {
    return res.status(400).json({ message: "All fields with * are required" });
  }

  // Does the ticket exist to update?
  const ticket = await Tickets.findByPk(id);

  if (!ticket) {
    return res.status(400).json({ message: "Ticket not found" });
  }

  // Check for duplicate name
  const duplicate = await Tickets.findOne({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  // Allow renaming the original ticket
  if (duplicate && duplicate?.id !== id) {
    return res.status(409).json({ message: "Duplicate ticket name" });
  }

  ticket.name = name;
  ticket.application = application;
  ticket.details = details;
  ticket.steps = steps;
  ticket.version = version;
  ticket.priority = priority;
  ticket.severity = severity;
  ticket.nature = nature;
  ticket.status = status;
  ticket.resolution = resolution;
  ticket.userId = userId;

  const updatedTicket = ticket;
  await ticket.save();

  res.json({ message: `Ticket ${updatedTicket.name} updated` });
});

// @desc Delete a ticket
// @route DELETE /tickets
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Ticket ID Required" });
  }

  // Does the ticket have assigned dev?
  const user = await Tickets.findOne({
    where: { userId: id },
  });
  if (user) {
    return res
      .status(400)
      .json({ message: "Ticket has been assigned to Developer" });
  }

  // Does the ticket exist to delete?
  const ticket = await Tickets.findByPk(id);

  if (!ticket) {
    return res.status(400).json({ message: "Ticket not found" });
  }

  const result = ticket;
  await ticket.destroy();

  const reply = `Ticket ${result.name} with ID ${result.id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllTickets,
  createNewTicket,
  updateTicket,
  deleteTicket,
};

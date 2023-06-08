const { Tickets } = require("../../config/db.js");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler"); // helps avoid using try/catch handlers
// const { statusValue } = require("../../config/status.js");
// const { priorityValue } = require("../../config/priority.js");
// const { severityValue } = require("../../config/severity.js");

// @desc Get all tickets
// @route GET /tickets
// @access Public
const getTickets = asyncHandler(async (req, res) => {
  // Get sort params
  const { sortArg } = req.query;
  // Get all tickets from db
  const tickets = await Tickets.findAll({
    order: [["status", "ASC"]],
  });

  // If no tickets
  if (!tickets?.length) {
    return res.status(400).json({ message: "No tickets found" });
  }

  if (sortArg) {
    if (sortArg === "Priority ASC") {
      const priorityAsc = [...tickets].sort((a, b) => a.priority - b.priority);
      res.json(priorityAsc);
    } else if (sortArg === "Priority DESC") {
      const priorityDesc = [...tickets].sort((a, b) => b.priority - a.priority);
      res.json(priorityDesc);
    } else if (sortArg === "Severity ASC") {
      const severityAsc = [...tickets].sort((a, b) => a.severity - b.severity);
      res.json(severityAsc);
    } else if (sortArg === "Severity DESC") {
      const severityDesc = [...tickets].sort((a, b) => b.severity - a.severity);
      res.json(severityDesc);
    } else if (sortArg === "Nature ASC") {
      const natureAsc = [...tickets].sort((a, b) => {
        const nameA = a.nature.toUpperCase();
        const nameB = b.nature.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      res.json(natureAsc);
    } else if (sortArg === "Nature DESC") {
      const natureDesc = [...tickets].sort((a, b) => {
        const nameA = a.nature.toUpperCase();
        const nameB = b.nature.toUpperCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      res.json(natureDesc);
    } else if (sortArg === "App ASC") {
      const applicationAsc = [...tickets].sort((a, b) => {
        const nameA = a.application.toUpperCase();
        const nameB = b.application.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      res.json(applicationAsc);
    } else if (sortArg === "App DESC") {
      const applicationDesc = [...tickets].sort((a, b) => {
        const nameA = a.application.toUpperCase();
        const nameB = b.application.toUpperCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
      res.json(applicationDesc);
    } else if (sortArg === "Assignee ASC") {
      const AssigneeAsc = [...tickets].sort((a, b) => a.userId - b.userId);
      res.json(AssigneeAsc);
    } else if (sortArg === "Assignee DESC") {
      const AssigneeDesc = [...tickets].sort((a, b) => b.userId - a.userId);
      res.json(AssigneeDesc);
    } else if (sortArg === "Status") {
      const Status = [...tickets].sort((a, b) => a.status - b.status);
      res.json(Status);
    }
    // } else if (filterArg) {
    //   if (
    //     filterArg === "Urgent" ||
    //     filterArg === "High" ||
    //     filterArg === "Medium" ||
    //     filterArg === "Low"
    //   ) {
    //     const priorityFilter = [...tickets].filter(
    //       (s) => s.priority === priorityValue(filterArg)
    //     );
    //     res.json(priorityFilter);
    //   } else if (
    //     filterArg === "Critical" ||
    //     filterArg === "Major" ||
    //     filterArg === "Normal" ||
    //     filterArg === "Minor" ||
    //     filterArg === "Trivial" ||
    //     filterArg === "Enhancement"
    //   ) {
    //     const severityFilter = [...tickets].filter(
    //       (s) => s.severity === severityValue(filterArg)
    //     );
    //     res.json(severityFilter);
    //   } else if (filterArg === "Open" || filterArg === "Closed") {
    //     const statusFilter = [...tickets].filter(
    //       (s) => s.status === statusValue(filterArg)
    //     );
    //     res.json(statusFilter);
    //   }
  } else {
    res.json(tickets);
  }
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
  getTickets,
  createNewTicket,
  updateTicket,
  deleteTicket,
};

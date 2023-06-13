const { Users, Tickets } = require("./db.js");
const { users, tickets } = require("./initialDBdata.js");

const initialDBLoaderUsers = async () => {
  try {
    const records = await Users.findAll();
    if (records.length === 0) {
      users.map((u) => {
        Users.findOrCreate({
          where: {
            id: u.id,
            name: u.name,
            surname: u.surname,
            username: u.username,
            email: u.email,
            password: u.password,
            role: u.role,
            active: u.active,
          },
        });
      });
      console.log("Initial users loaded!");
    } else {
      console.log("Users already exist.");
    }
  } catch (error) {
    console.log(error);
  }
};

const initialDBLoaderTickets = async () => {
  try {
    const records = await Tickets.findAll();
    if (records.length === 0) {
      await tickets.map((t) => {
        Tickets.findOrCreate({
          where: {
            id: t.id,
            name: t.name,
            application: t.application,
            details: t.details,
            steps: t.steps,
            version: t.version,
            priority: t.priority,
            severity: t.severity,
            nature: t.nature,
            status: t.status,
            resolution: t.resolution,
            author: t.author,
            userId: t.userId,
          },
        });
      });
      console.log("Initial tickets loaded!");
    } else {
      console.log("Tickets already exist.");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initialDBLoaderUsers, initialDBLoaderTickets };

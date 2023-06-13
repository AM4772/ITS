require("dotenv").config();
const server = require("./config/server.js");
const { conn } = require("./config/db.js");
const {
  initialDBLoaderUsers,
  initialDBLoaderTickets,
} = require("./config/initialDBLoaders.js");

const PORT = process.env.PORT || "3001";

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
    await initialDBLoaderUsers();
    await initialDBLoaderTickets();
  });
});

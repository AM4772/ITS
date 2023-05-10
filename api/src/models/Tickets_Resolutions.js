require("sequelize");
// Define junction ("through") model separately
module.exports = (sequelize) => {
  sequelize.define("Ticket_Resolutions", {}, { timestamps: false });
};

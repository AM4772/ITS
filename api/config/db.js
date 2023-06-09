const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  NODE_ENV = "production",
} = process.env; // add DB_NAME for deploy

//------------------- ADDED FOR DEPLOYMENT -----------------------------------
let db =
  NODE_ENV === "production"
    ? new Sequelize({
        // database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        // port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        // dialectOptions: {
        //   ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        //   },
        //   keepAlive: true,
        // },
        // ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

// Test DB
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

// ------------------------------------------------------------------------------------------------
// The following code converges all the models in one place thus avoiding having to bring one at a time
const basename = path.basename(__filename);

const modelDefiners = [];
// Read all files in the "models" folder, retrieve them and push them into the array modelDefiners
fs.readdirSync(path.join(__dirname, "..", "src", "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(
      require(path.join(__dirname, "..", "src", "models", file))
    );
  });
console.log("models in db: " + modelDefiners.length);
// Injects the sequelize connecetion to all models have access to connection props and functions
modelDefiners.forEach((model) => model(db));
// Ensure first letter in model name is capitlized (ie: product => Product)
let entries = Object.entries(db.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
db.models = Object.fromEntries(capsEntries);
// ------------------------------------------------------------------------------------------------
// In the object db.models all, models are imported as properties
// therefore, apply destructuring to create the associations
const { Users, Tickets } = db.models;

// Table associations
// 1-to-1

// 1-to-Many
Users.hasMany(Tickets, { foreignKey: "userId" });
Tickets.belongsTo(Users);

// Super Many-to-Many

module.exports = {
  ...db.models, // this is to allow importing them where needed: const { Product, User } = require('./db.js');
  conn: db, // to allow importing the connection where needed: { conn } = require('./db.js');
};

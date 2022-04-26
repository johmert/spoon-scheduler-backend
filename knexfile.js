const path = require("path");

require("dotenv").config();
const { DATABASE_URL = "postgres://skwyksxj:4I41JirA-hwGcmJ2BFvCwR8k0wf6a3le@heffalump.db.elephantsql.com/skwyksxj" } = process.env;

module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
  }
};
const { v4: uuidv4 } = require("uuid");

const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
  ],
}; 

const id = uuidv4(v4options.random);

const initialUser = {
  user_id: id,
  username: "testUser",
  password: "admin",
}

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users").insert(initialUser)
    });
}
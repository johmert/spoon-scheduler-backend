const initialUser = {
  user_id: 1,
  username: "testUser",
  password: "admin",
  settings: "default"
}

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users").insert(initialUser)
    });
}
const initialUser = {
  user_id: 1,
  username: "testUser",
  password: "admin",
  settings: "3-day",
  avg_spoons: 0
}

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("users").insert(initialUser)
    });
}
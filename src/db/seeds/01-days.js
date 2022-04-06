const initialDay = {
  date: "2022-04-06",
  user_id: 1,
}

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE days RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("days").insert(initialDay)
    });
}

const knex = require("../db/connection");

const table = "days";

function destroy(date) {
    return knex(table)
        .where({ date: date })
        .del();
}

function list(userId) {
    return knex(table)
        .select("*")
        .where({ user_id: userId });
}

function newDay(date) {
    return knex(table)
        .insert(date)
        .returning("*");
}

function read(date) {
    return knex(table)
        .select("*")
        .where({ date: date })
        .first();
}

function update(day) {
    return knex(table)
        .where({ date: day.date })
        .update(day, "*");
}

module.exports = {
    delete: destroy,
    list,
    newDay,
    read,
    update,
}
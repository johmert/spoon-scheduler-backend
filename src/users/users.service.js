const knex = require("../db/connection");

const table = "users";

async function attachDates(user) {
    user.days = await knex("days")
        .select("date")
        .where({ "days.user_id": user.user_id });
    return user;
}

function destroy(userId) {
    return knex(table)
        .where({ user_id: userId })
        .del();
}

function read(userId){
    return knex(table)
        .select("*")
        .where({ user_id: userId })
        .first()
        .then(user => attachDates(user));
}

function readByUsername(username, password) {
    return knex(table)
        .select("user_id")
        .where({ username: username, password: password })
        .first()
}

function register(user) {
    return knex(table)
        .insert(user)
        .returning("*");
}

function update(user) {
    return knex(table)
        .where({ user_id: user.user_id })
        .update(user, "*");
}

module.exports = {
    delete: destroy,
    read,
    readByUsername,
    register,
    update,
}
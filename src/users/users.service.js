const knex = require("../db/connection");

const table = "users";

function read(userId){
    return knex(table)
        .select("*")
        .where({ user_id: userId })
        .first();
}

function register(user) {
    return knex(table)
        .insert(user)
        .returning("*");
}

module.exports = {
    read,
    register
}
const knex = require("../db/connection");

const table = "users";

async function getNextId() {
    const ids = await knex(table).select("user_id");
    return ids.length;
}

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
    getNextId,
    read,
    register
}
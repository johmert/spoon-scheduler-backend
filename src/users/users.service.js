const knex = require("../db/connection");

const table = "users";

function destroy(userId) {
    return knex(table)
        .where({ user_id: userId })
        .del();
}

async function getNextId() {
    const ids = await knex(table).select("user_id");
    return ids.length +1;
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

function update(user) {
    return knex(table)
        .where({ user_id: user.user_id })
        .update(user, "*");
}

module.exports = {
    delete: destroy,
    getNextId,
    read,
    register,
    update,
}
const knex = require("../db/connection");

const table = "events";

function create(event) {
    return knex(table)
        .insert(event)
        .returning("*");
}

function destroy(eventId) {
    return knex(table)
        .where({ event_id: eventId })
        .del();
}

async function getNextId() {
    const ids = await knex(table).select("event_id");
    console.log(ids);
    return ids.length +1;
}

function list() {
    return knex(table).select("*");
}

function read(eventId){
    return knex(table)
        .select("*")
        .where({ event_id: eventId })
        .first();
}

function update(event) {
    return knex(table)
        .where({ event_id: event.event_id })
        .update(event, "*");
}

module.exports = {
    create,
    delete: destroy,
    getNextId,
    list,
    read,
    update,
}
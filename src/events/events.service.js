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
    list,
    read,
    update,
}
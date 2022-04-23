const knex = require("../db/connection");

const table = "days";

async function attachEvents(day) {
    day.events = await knex("events")
        .select("event_id", "name", "importance", "spoons", "timeDuration")
        .where({ "events.date": day.date });
    return day;
}

function destroy(date) {
    return knex(table)
        .where({ date: date })
        .del();
}

function list(userId) {
    return knex(table)
        .select("*")
        .where({ user_id: userId })
        .then(days => {
            return Promise.all(
                days.map(day => {
                    return attachEvents(day);
                })
            )
        });
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
        .first()
        .then(day => attachEvents(day));
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
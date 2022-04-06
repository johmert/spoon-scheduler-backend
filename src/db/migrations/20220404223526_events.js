exports.up = function(knex) {
    return knex.schema.createTable("events", (table) => {
        table.increments("event_id").primary();
        table.integer("spoons").notNullable();
        table.integer("timeDuration");
        table.integer("importance");
        table.date("date").notNullable();
        table
            .foreign("date")
            .references("date")
            .inTable("days");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("events");
};
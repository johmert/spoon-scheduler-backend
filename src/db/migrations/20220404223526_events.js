exports.up = function(knex) {
    return knex.schema.createTable("events", (table) => {
        table.uuid("event_id").unique().primary();
        table.string("name").notNullable();
        table.text("description");
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

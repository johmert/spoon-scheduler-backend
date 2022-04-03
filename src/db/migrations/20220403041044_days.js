exports.up = function(knex) {
    return knex.schema.createTable("days", (table) => {
        table.date("date").primary();
        table.uuid("schedule_id").notNullable();
        table
            .foreign("schedule_id")
            .references("id")
            .inTable("schedules")
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("days");
};

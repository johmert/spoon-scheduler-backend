exports.up = function(knex) {
    return knex.schema.createTable("days", (table) => {
        table.date("date").unique().primary();
        table.integer("user_id").notNullable();
        table
            .foreign("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("days");
};

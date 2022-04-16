exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").unique().primary();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("settings");
        table.integer("avg_spoons");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};

exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("username");
        table.string("password");
        table.uuid("schedule_id");
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};

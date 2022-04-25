exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.uuid("user_id").unique().primary();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};

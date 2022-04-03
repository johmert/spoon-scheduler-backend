exports.up = function(knex) {
    return knex.schema.createTable("schedules", table => {
        table.uuid("id").primary();
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable("schedules");
};


exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.text('project_name', 128)
                .unique()
                .notNullable();
            tbl.text('description');
            tbl.boolean('completed')
                .defaultTo(false);
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.text('resource_name')
                .notNullable();
            tbl.text('description');
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.integer('task_number')
                .unsigned()
                .notNullable();
            tbl.text('description')
                .notNullable();
            tbl.text('notes');
            tbl.boolean('completed')
                .defaultTo(false);
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('project_resources', tbl => {
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('projects')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('project_resources');
};

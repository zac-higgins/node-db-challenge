
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          project_name: 'Make a Node.js App',
          description: 'Completing the sprint challenge to demonstrate my knowledge of the backend.',
          completed: false
        },
        {
          project_name: 'Enjoy the Weekend',
          description: 'Taking time to recharge and refresh',
          completed: false
        },
      ]);
    });
};

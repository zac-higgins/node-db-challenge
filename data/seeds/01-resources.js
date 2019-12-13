
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          resource_name: 'Computer',
          description: 'iMac Pro'
        },
        {
          resource_name: 'Book',
          description: 'The paper version of a kindle'
        },
        {
          resource_name: 'Brain',
          description: 'The computer in my head'
        },
      ]);
    });
};
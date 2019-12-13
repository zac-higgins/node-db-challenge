
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_number: 1,
          description: 'Scaffold node app',
          notes: 'A lot of this can be done referencing prior projects',
          completed: false,
          project_id: 1
        },
        {
          task_number: 2,
          description: 'Make migrations and seeds',
          notes: 'don\'t forget to plan out the data scheme',
          completed: false,
          project_id: 1
        },
        {
          task_number: 1,
          description: 'Turn off the computer',
          notes: 'Give those eyes a break, yo.',
          completed: false,
          project_id: 2
        },
        {
          task_number: 2,
          description: 'Walk the dog',
          notes: '',
          completed: false,
          project_id: 2
        },
        {
          task_number: 3,
          description: 'Read a book',
          notes: 'A paper one, no screens please',
          completed: false,
          project_id: 2
        }
      ]);
    });
};

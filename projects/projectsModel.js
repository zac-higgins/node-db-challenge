const db = require('../data/db-config')

module.exports = {
    getProjects,
    findById,
    findTasks,
    findResources,
    addProject,
    addTask,
    addResource
}

function addProject(project) {
    return db('projects')
        .insert(project, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function getProjects() {
    return db('projects');
}

function findById(id) {
    return db('projects')
        .where({ id })
        .first();
}

function addTask(task) {
    return db('tasks')
        .insert(task, 'id')
        .then(() => {
            return findTasks(task.project_id);
        });
}

function findTasks(id) {
    return db('tasks')
        .where('project_id', id)
        .orderBy('task_number')
}

function addResource(resource) {
    return db('resources')
        .insert(resource, 'id')
}

function findResources(id) {
    return db('project_resources')
        .select('project_name', 'resource_name')
        .join('projects', 'project_resources.project_id', 'projects.id')
        .join('resources', 'project_resources.resource_id', 'resources.id')
        .where('project_id', id)
}



const db = require('../data/db-config')

module.exports = {
    getProjects,
    findById,
    findTasks,
    findResources,
    addProject,
    addTask,
    addResource,
    getAllResources
}

function addProject(project) {
    return db('projects')
        .insert(project, 'id')
    // .then(ids => {
    //     const [id] = ids;
    //     return findById(id);
    // });
}

function getProjects() {
    return db('projects')
        .then(projects => {
            projects.map(project => {
                if (project.completed === 1) {
                    project.completed = true
                } else {
                    project.completed = false
                }
            })
            return projects;
        })
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
    if (id) {
        return db('tasks')
            .select('tasks.id', 'tasks.task_number', 'tasks.description', 'tasks.notes', 'tasks.completed', 'projects.project_name as Project Name', 'projects.description as Project Description')
            .join('projects', 'tasks.project_id', 'projects.id')
            .where('project_id', id)
            .orderBy('task_number')
            .then(tasks => {
                tasks.map(task => {
                    if (task.completed === 1) {
                        task.completed = true
                    } else {
                        task.completed = false
                    }
                })
                return tasks;
            })
    } else {
        return db('tasks')
            .select('tasks.id', 'tasks.task_number', 'tasks.description', 'tasks.notes', 'tasks.completed', 'projects.project_name as Project Name', 'projects.description as Project Description')
            .join('projects', 'tasks.project_id', 'projects.id')
            .orderBy('tasks.id')
            .then(tasks => {
                tasks.map(task => {
                    if (task.completed === 1) {
                        task.completed = true
                    } else {
                        task.completed = false
                    }
                })
                return tasks;
            })
    }
}

function addResource(resource) {
    return db('resources')
        .insert(resource, 'id')
}

function getAllResources() {
    return db('resources')
}

function findResources(id) {
    return db('project_resources')
        .select('project_name', 'resource_name')
        .join('projects', 'project_resources.project_id', 'projects.id')
        .join('resources', 'project_resources.resource_id', 'resources.id')
        .where('project_id', id)
}



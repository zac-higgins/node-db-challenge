const express = require('express');
const projects = require('./projectsModel');
const router = express.Router();

//----------GET Requests----------//
router.get('/', (req, res) => {
    projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' });
        });
});

router.get('/:id/resources', (req, res) => {
    const { id } = req.params;

    projects.findById(id)
        .then(project => {
            if (project) {
                projects.findResources(id)
                    .then(list => {
                        res.status(200).json(list)
                    })
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project' });
        });
});

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;

    projects.findById(id)
        .then(project => {
            if (project) {
                projects.findTasks(id)
                    .then(tasks => {
                        res.status(200).json(tasks)
                    })
            } else {
                res.status(404).json({ message: 'Could not find project with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks' });
        });
});

router.get('/tasks', (req, res) => {
    projects.findTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks' });
        });
});

router.get('/resources', (req, res) => {
    projects.getAllResources()
        .then(resources => {
            res.status(200).json(resources)

        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get resources" })
        })
})

//----------POST Requests----------//

router.post('/resources', (req, res) => {
    // res.status(200).json({ message: "test success!", resource: req.body })
    projects.addResource(req.body)
        .then(() => {
            projects.getAllResources()
                .then(resources => {
                    res.status(200).json(resources)

                })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to add resource" })
        })
})

router.post('/', (req, res) => {
    projects.addProject(req.body)
        .then(() => {
            projects.getProjects()
                .then(projects => {
                    res.status(200).json(projects);
                })
                .catch(err => {
                    res.status(500).json({ message: 'Failed to get projects' });
                });
        })
})

router.post('/tasks', (req, res) => {
    projects.addTask(req.body)
        .then(() => {
            projects.findTasks()
                .then(tasks => {
                    res.status(200).json(tasks)
                })
                .catch(err => {
                    res.status(500).json({ message: 'Failed to get tasks' });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to add the task' });
        });
})

module.exports = router;
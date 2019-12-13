const express = require('express');
const projects = require('./projectsModel');
const router = express.Router();

//----------GET Requests----------//
router.get('/', (req, res) => {
    projects.getProjects()
        .then(projects => {
            res.json(projects);
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

//----------POST Requests----------//

module.exports = router;
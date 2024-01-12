const express = require('express');
const router = express.Router();

const {
  getProject,
  getProjectListBy,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');

// Get project detail by ID
router.get('/:id', getProject);

// Get project list with filters
router.post('/get-list-by', getProjectListBy);

// Create a new project
router.post('/', createProject);

// Update project by ID
router.put('/:id', updateProject);

// Delete project by ID
router.delete('/:id', deleteProject);

module.exports = router;
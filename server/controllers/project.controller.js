const { Project } = require('./../models/project');
const { Comment } = require('./../models/comment');

const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        msg: 'Project not found',
      });
    }

    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const getProjectListBy = async (req, res) => {
  const { pageSize, current, created_at, user_id } = req.body;

  try {
    const query = {};

    if (created_at) {
      query.createdAt = created_at;
    }

    if (user_id) {
      query.createdBy = user_id;
    }

    const totalCount = await Project.countDocuments(query);

    const projects = await Project.find(query)
      .skip((current - 1) * pageSize)
      .limit(pageSize);

    return res.json({
      totalCount,
      projects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const createProject = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const projectsCount = await Project.countDocuments();
    const newProject = new Project({
      id: projectsCount + 1,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
      updatedBy: userId,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
    });

    await newProject.save();

    return res.status(201).json({
      msg: 'Project created successfully',
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        msg: 'Project not found',
      });
    }

    project.title = title;
    project.description = description;
    project.updatedAt = new Date();
    project.updatedBy = req.body.userId;

    await project.save();

    return res.json({
      msg: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

const deleteProject = async (req, res) => {
  const { userId } = req.body;

  try {
    const project = await Project.findOne({ createdBy: userId });

    if (!project) {
      return res.status(404).json({
        msg: 'Project not found',
      });
    }

    project.isDeleted = true;
    project.deletedAt = new Date();
    project.deletedBy = userId;

    await project.save();

    return res.json({
      msg: 'Project deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Server error',
    });
  }
};

module.exports = {
  getProject,
  getProjectListBy,
  createProject,
  updateProject,
  deleteProject,
};
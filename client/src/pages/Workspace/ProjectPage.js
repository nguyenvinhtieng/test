import React, { useEffect, useState } from 'react';
import { Card, Spin, Button, Input, List, DatePicker, Select } from 'antd';
import axios from 'axios';
import './styles.css';

const { Meta } = Card;
const { Option } = Select;

const Project = ({ projectId }) => {
  const [project, setProject] = useState('');
  const [loading, setLoading] = useState(true);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const fetchProjectTasks = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/tasks`);
      setProject((prevProject) => ({
        ...prevProject,
        tasks: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (project) {
      fetchProjectTasks();
    }
  }, [project]);

  const handleCreateProject = async () => {
    try {
      const response = await axios.post('/api/projects', {
        title: newProjectTitle,
        role: selectedRole,
      });
      setProject(response.data);
      setNewProjectTitle('');
      setSelectedRole('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(`/api/projects/${projectId}/tasks`, {
        title: newTaskTitle,
        deadline: newTaskDeadline,
        status: newTaskStatus,
        role: selectedRole,
      });
      setProject((prevProject) => ({
        ...prevProject,
        tasks: [...prevProject.tasks, response.data],
      }));
      setNewTaskTitle('');
      setNewTaskDeadline(null);
      setNewTaskStatus('');
      setSelectedRole('');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container">
      <Card className="card">
        <Meta title={project.title} description={project.description} />
      </Card>

      <div className="createProjectContainer">
        <h3>Create New Project</h3>
        <Input
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
          placeholder="Project Title"
        />
        <Select
          value={selectedRole}
          onChange={(value) => setSelectedRole(value)}
          style={{ marginLeft: '10px', width: '120px' }}
          placeholder="Select Role"
        >
          <Option value="owner">Owner</Option>
          <Option value="member">Member</Option>
          <Option value="viewer">Viewer</Option>
        </Select>
        <Button type="primary" onClick={handleCreateProject} style={{ marginLeft: '10px' }}>
          Create Project
        </Button>
      </div>

      <div className="createTaskContainer">
        <h3>Create New Task</h3>
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <DatePicker
          value={newTaskDeadline}
          onChange={(date) => setNewTaskDeadline(date)}
          style={{ marginLeft: '10px' }}
        />
        <Select
          value={newTaskStatus}
          onChange={(value) => setNewTaskStatus(value)}
          style={{ marginLeft: '10px', width: '120px' }}
          placeholder="Select Status"
        >
          <Option value="todo">Todo</Option>
          <Option value="inProgress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
        <Select
          value={selectedRole}
          onChange={(value) => setSelectedRole(value)}
          style={{ marginLeft: '10px', width: '120px' }}
          placeholder="Select Role"
        >
          <Option value="owner">Owner</Option>
          <Option value="member">Member</Option>
          <Option value="viewer">Viewer</Option>
          </Select>
        <Button type="primary" onClick={handleCreateTask} style={{ marginLeft: '10px' }}>
          Create Task
        </Button>
      </div>

      <div className="taskListContainer">
        <h3>Task List</h3>
        <List
          dataSource={project.tasks}
          renderItem={(task) => (
            <List.Item>
              <List.Item.Meta title={task.title} description={task.deadline} />
              <div>Status: {task.status}</div>
              <div>Role: {task.role}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Project;
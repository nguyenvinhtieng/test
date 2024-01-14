import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

const { Meta } = Card;

const Project = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get('/api/projects/{project_id}');
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Card>
      <Meta title={project.title} description={project.description} />
    </Card>
  );
};

export default Project;
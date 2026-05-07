import { useState, useEffect } from 'react';
import { getProjects, createProject, addMember, removeMember } from '../services/projectService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [memberEmail, setMemberEmail] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      setNewProject({ name: '', description: '' });
      setShowModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleAddMember = async (projectId) => {
    if (!memberEmail) return;
    try {
      await addMember(projectId, memberEmail);
      setMemberEmail('');
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add member');
    }
  };

  const handleRemoveMember = async (projectId, userId) => {
    if (window.confirm('Remove this member?')) {
      try {
        await removeMember(projectId, userId);
        fetchProjects();
      } catch (error) {
        console.error('Failed to remove member:', error);
      }
    }
  };

  const isAdmin = (project) => {
    return project.creatorId === user.id;
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => setShowModal(true)}>Create Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Tasks: {project._count?.tasks || 0}
              </p>
              <p className="text-sm text-gray-600">
                Members: {project.members?.length || 0}
              </p>
            </div>

            <Button
              variant="secondary"
              className="w-full mb-2"
              onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
            >
              {selectedProject?.id === project.id ? 'Hide Details' : 'View Details'}
            </Button>

            {selectedProject?.id === project.id && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-2">Members:</h4>
                <div className="space-y-2 mb-4">
                  {project.members?.map((member) => (
                    <div key={member.id} className="flex justify-between items-center">
                      <span className="text-sm">{member.user.name}</span>
                      {isAdmin(project) && member.userId !== user.id && (
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveMember(project.id, member.userId)}
                          className="text-xs py-1 px-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {isAdmin(project) && (
                  <div>
                    <Input
                      placeholder="Member email"
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAddMember(project.id)}
                      className="w-full"
                    >
                      Add Member
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="card max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Create Project</h2>
            <form onSubmit={handleCreateProject}>
              <Input
                label="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  className="input-field"
                  rows="3"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Create</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

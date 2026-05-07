import { useState, useEffect } from 'react';
import { getMyTasks, updateTask, createTask, getProjectTasks } from '../services/taskService';
import { getProjects } from '../services/projectService';
import { formatDate, isOverdue } from '../utils/formatDate';
import { TASK_STATUS, PRIORITY, STATUS_COLORS, PRIORITY_COLORS } from '../utils/constants';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: PRIORITY.MEDIUM,
    dueDate: '',
    assignedTo: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        getMyTasks(),
        getProjects(),
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!selectedProject) {
      alert('Please select a project');
      return;
    }
    try {
      await createTask(selectedProject, newTask);
      setNewTask({
        title: '',
        description: '',
        status: TASK_STATUS.TODO,
        priority: PRIORITY.MEDIUM,
        dueDate: '',
        assignedTo: '',
      });
      setSelectedProject('');
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Button onClick={() => setShowModal(true)}>Create Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(TASK_STATUS).map((status) => (
          <div key={status} className="bg-gray-100 rounded-lg p-4">
            <h2 className="font-bold text-lg mb-4 capitalize">
              {status.replace('_', ' ')}
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`card ${isOverdue(task.dueDate) && task.status !== TASK_STATUS.DONE ? 'border-2 border-red-500' : ''}`}
                  >
                    <h3 className="font-semibold mb-2">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    )}
                    
                    <div className="flex gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${PRIORITY_COLORS[task.priority]}`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className={`text-xs px-2 py-1 rounded ${isOverdue(task.dueDate) && task.status !== TASK_STATUS.DONE ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>

                    {task.project && (
                      <p className="text-xs text-gray-500 mb-3">
                        Project: {task.project.name}
                      </p>
                    )}

                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                      className="input-field text-sm"
                    >
                      {Object.values(TASK_STATUS).map((s) => (
                        <option key={s} value={s}>
                          {s.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  className="input-field"
                  rows="3"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="input-field"
                >
                  {Object.values(PRIORITY).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />

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

export default Tasks;

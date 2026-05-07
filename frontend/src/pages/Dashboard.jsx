import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/dashboardService';
import { formatDate } from '../utils/formatDate';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalTasks || 0}</p>
        </div>
        
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">To Do</h3>
          <p className="text-3xl font-bold text-gray-600">{stats?.tasksByStatus?.todo || 0}</p>
        </div>
        
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.tasksByStatus?.inProgress || 0}</p>
        </div>
        
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">Done</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.tasksByStatus?.done || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Overdue Tasks</h2>
          {stats?.overdueTasks?.count > 0 ? (
            <div>
              <p className="text-red-600 font-semibold mb-4">
                {stats.overdueTasks.count} task(s) overdue
              </p>
              <div className="space-y-2">
                {stats.overdueTasks.tasks.map((task) => (
                  <div key={task.id} className="p-3 bg-red-50 rounded border border-red-200">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">Due: {formatDate(task.dueDate)}</p>
                    {task.assignedUser && (
                      <p className="text-sm text-gray-600">Assigned to: {task.assignedUser.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No overdue tasks</p>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Tasks by User</h2>
          {stats?.tasksByUser && Object.keys(stats.tasksByUser).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(stats.tasksByUser).map(([userName, count]) => (
                <div key={userName} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{userName}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {count} tasks
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No tasks assigned yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

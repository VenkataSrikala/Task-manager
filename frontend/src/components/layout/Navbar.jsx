import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-xl font-bold text-blue-600">
            Team Task Manager
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-blue-600">
              Projects
            </Link>
            <Link to="/tasks" className="text-gray-700 hover:text-blue-600">
              My Tasks
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.name}</span>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

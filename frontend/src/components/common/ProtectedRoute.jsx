import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Leaf } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg">
        <div className="w-12 h-12 bg-primary-700 text-white rounded-2xl flex items-center justify-center animate-bounce mb-3">
          <Leaf className="w-7 h-7" />
        </div>
        <p className="text-sm font-bold text-gray-700">Loading FreshBasket...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated users to /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

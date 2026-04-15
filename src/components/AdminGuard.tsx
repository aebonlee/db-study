import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh'}}><div className="loading-spinner" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

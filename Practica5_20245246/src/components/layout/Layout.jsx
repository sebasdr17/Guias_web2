import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useUIStore } from '../../store/uiStore';

export const Layout = () => {
  const theme = useUIStore((state) => state.theme);
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

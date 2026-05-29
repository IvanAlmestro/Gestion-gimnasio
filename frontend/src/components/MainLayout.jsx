import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Dumbbell, 
  User, 
  LogOut, 
  Menu, 
  X,
  Activity
} from 'lucide-react';
import DashboardView from './views/DashboardView';
import RutinasView from './views/RutinasView';
import PerfilView from './views/PerfilView';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'rutinas', label: 'Rutinas', icon: Dumbbell, path: '/rutinas' },
  { id: 'perfil', label: 'Perfil', icon: User, path: '/perfil' },
];

function MainLayout({ initialView = 'dashboard' }) {
  const [activeView, setActiveView] = useState(initialView);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [persona, setPersona] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const personaStorage = JSON.parse(localStorage.getItem("persona"));
    setPersona(personaStorage);
  }, []);

  useEffect(() => {
    // Sync activeView with URL
    const path = location.pathname.replace('/', '');
    if (navItems.some(item => item.id === path)) {
      setActiveView(path);
    }
  }, [location]);

  const handleNavigation = (viewId, path) => {
    setActiveView(viewId);
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("persona");
    navigate("/login");
    window.location.reload();
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView persona={persona} />;
      case 'rutinas':
        return <RutinasView />;
      case 'perfil':
        return <PerfilView persona={persona} setPersona={setPersona} />;
      default:
        return <DashboardView persona={persona} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : '-100%',
        }}
        className={`
          fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border
          flex flex-col
          lg:flex lg:w-64
          transition-transform lg:transition-none duration-300 ease-out
        `}
        style={{ transform: undefined }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">GymApp</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="ml-auto lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Cerrar menu"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {persona?.nombre || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {persona?.email || 'email@ejemplo.com'}
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                       text-muted-foreground hover:bg-destructive hover:text-destructive-foreground
                       transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesion</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden lg:flex w-64 bg-card border-r border-border flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">GymApp</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicatorDesktop"
                    className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {persona?.nombre || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {persona?.email || 'email@ejemplo.com'}
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                       text-muted-foreground hover:bg-destructive hover:text-destructive-foreground
                       transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesion</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-bold text-foreground">GymApp</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="min-h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

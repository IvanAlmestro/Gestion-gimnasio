import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Flame, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Trophy,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Skeleton loader component
function Skeleton({ className }) {
  return (
    <div className={`skeleton rounded-lg ${className}`} />
  );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, change, color, delay = 0 }) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    secondary: 'bg-secondary text-muted-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            change > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

// Activity Item Component
function ActivityItem({ title, time, type, delay = 0 }) {
  const typeStyles = {
    completed: 'bg-success/10 text-success',
    scheduled: 'bg-primary/10 text-primary',
    streak: 'bg-warning/10 text-warning',
  };

  const typeIcons = {
    completed: Trophy,
    scheduled: Calendar,
    streak: Flame,
  };

  const Icon = typeIcons[type] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
    >
      <div className={`p-2 rounded-lg ${typeStyles[type]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

// Weekly Progress Chart Component
function WeeklyChart({ data }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="flex items-end justify-between gap-2 h-32 px-2">
      {data.map((day, index) => (
        <motion.div
          key={day.day}
          className="flex-1 flex flex-col items-center gap-2"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <motion.div
            className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors cursor-pointer relative group"
            style={{ height: `${(day.value / maxValue) * 100}%`, minHeight: '8px' }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-card border border-border px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {day.value} min
            </span>
          </motion.div>
          <span className="text-xs text-muted-foreground">{day.day}</span>
        </motion.div>
      ))}
    </div>
  );
}

function DashboardView({ persona }) {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Simular delay para mostrar skeleton
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch("http://localhost:8081/rutinas");
        if (response.ok) {
          const data = await response.json();
          setRutinas(data);
        }
      } catch (error) {
        console.log(error);
        // Use mock data if API is not available
        setRutinas([
          { id: 1, nombre: 'Rutina Fuerza', objetivo: 'FUERZA' },
          { id: 2, nombre: 'Cardio Intenso', objetivo: 'CARDIO' },
          { id: 3, nombre: 'Full Body', objetivo: 'HIPERTROFIA' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Mock data for weekly activity
  const weeklyData = [
    { day: 'Lun', value: 45 },
    { day: 'Mar', value: 60 },
    { day: 'Mie', value: 30 },
    { day: 'Jue', value: 75 },
    { day: 'Vie', value: 55 },
    { day: 'Sab', value: 40 },
    { day: 'Dom', value: 20 },
  ];

  // Mock activity data
  const recentActivity = [
    { title: 'Rutina de Fuerza completada', time: 'Hace 2 horas', type: 'completed' },
    { title: 'Cardio programado para manana', time: 'Manana 8:00 AM', type: 'scheduled' },
    { title: 'Racha de 7 dias consecutivos', time: 'Esta semana', type: 'streak' },
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Hola, {persona?.nombre || 'Usuario'}
        </h1>
        <p className="text-muted-foreground">
          Aqui esta tu resumen de actividad
        </p>
      </motion.div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-card rounded-xl p-5 border border-border">
              <Skeleton className="w-12 h-12 mb-4" />
              <Skeleton className="w-20 h-8 mb-2" />
              <Skeleton className="w-24 h-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Flame} 
            label="Calorias Quemadas" 
            value="2,450" 
            change={12}
            color="primary"
            delay={0}
          />
          <StatCard 
            icon={Activity} 
            label="Rutinas Activas" 
            value={rutinas.length}
            color="success"
            delay={0.1}
          />
          <StatCard 
            icon={Target} 
            label="Objetivos Cumplidos" 
            value="8/10"
            change={5}
            color="warning"
            delay={0.2}
          />
          <StatCard 
            icon={Clock} 
            label="Tiempo Total" 
            value="4h 30m"
            color="secondary"
            delay={0.3}
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Progreso Semanal</h2>
              <p className="text-sm text-muted-foreground">Minutos de entrenamiento por dia</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <TrendingUp className="w-4 h-4" />
              <span>+15% vs semana anterior</span>
            </div>
          </div>
          {loading ? (
            <div className="flex items-end justify-between gap-2 h-32 px-2">
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 80 + 20}%` }} />
              ))}
            </div>
          ) : (
            <WeeklyChart data={weeklyData} />
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Actividad Reciente</h2>
            <Zap className="w-5 h-5 text-warning" />
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-20 h-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {recentActivity.map((activity, index) => (
                <ActivityItem 
                  key={index}
                  {...activity}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-card rounded-xl p-6 border border-border"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Acciones Rapidas</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/rutinas')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Activity className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Iniciar Rutina</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/rutinas')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-success/10 hover:bg-success/20 transition-colors"
            >
              <Target className="w-6 h-6 text-success" />
              <span className="text-sm font-medium text-foreground">Ver Objetivos</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/perfil')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-warning/10 hover:bg-warning/20 transition-colors"
            >
              <Calendar className="w-6 h-6 text-warning" />
              <span className="text-sm font-medium text-foreground">Programar</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/rutinas')}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Trophy className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Logros</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-primary/20 to-warning/20 rounded-xl p-6 border border-primary/30"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-warning/20">
              <Flame className="w-8 h-8 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">7 dias</p>
              <p className="text-sm text-muted-foreground">Racha actual de entrenamiento</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Sigue asi. Tu mejor racha fue de 14 dias.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardView;

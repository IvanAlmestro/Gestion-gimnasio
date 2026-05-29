import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Search, 
  Filter, 
  Play, 
  CheckCircle2, 
  Clock, 
  Target,
  ChevronRight,
  X,
  Plus,
  Flame,
  Zap,
  Heart,
  Award
} from 'lucide-react';

// Skeleton loader
function Skeleton({ className }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

// Badge Component
function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-secondary text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}

// Rutina Card Component
function RutinaCard({ rutina, onView, onStart, onComplete, delay = 0 }) {
  const objetivoIcons = {
    FUERZA: Dumbbell,
    CARDIO: Heart,
    HIPERTROFIA: Flame,
    RESISTENCIA: Zap,
    FLEXIBILIDAD: Target,
  };

  const objetivoColors = {
    FUERZA: 'primary',
    CARDIO: 'warning',
    HIPERTROFIA: 'success',
    RESISTENCIA: 'primary',
    FLEXIBILIDAD: 'warning',
  };

  const Icon = objetivoIcons[rutina.objetivo] || Dumbbell;
  const color = objetivoColors[rutina.objetivo] || 'primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all cursor-pointer group"
      onClick={() => onView(rutina)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        <Badge variant={color}>{rutina.objetivo}</Badge>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {rutina.nombre}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {rutina.descripcion || 'Sin descripcion disponible'}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {rutina.duracion || '45'} min
        </span>
        <span className="flex items-center gap-1">
          <Target className="w-3 h-3" />
          {rutina.ejercicios?.length || 8} ejercicios
        </span>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onStart(rutina);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Play className="w-4 h-4" />
          Iniciar
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onComplete(rutina);
          }}
          className="p-2 rounded-lg bg-secondary text-muted-foreground hover:bg-success/10 hover:text-success transition-colors"
        >
          <CheckCircle2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// Rutina Detail Modal
function RutinaDetailModal({ rutina, onClose, onStart }) {
  if (!rutina) return null;

  const ejerciciosEjemplo = rutina.ejercicios || [
    { nombre: 'Sentadillas', series: 4, repeticiones: 12 },
    { nombre: 'Press de banca', series: 4, repeticiones: 10 },
    { nombre: 'Peso muerto', series: 3, repeticiones: 8 },
    { nombre: 'Dominadas', series: 3, repeticiones: 10 },
    { nombre: 'Remo con barra', series: 4, repeticiones: 12 },
    { nombre: 'Press militar', series: 3, repeticiones: 10 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="primary">{rutina.objetivo}</Badge>
              <h2 className="text-xl font-bold text-foreground mt-2">{rutina.nombre}</h2>
              <p className="text-sm text-muted-foreground mt-1">{rutina.descripcion || 'Rutina de entrenamiento'}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {rutina.duracion || 45} min
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {ejerciciosEjemplo.length} ejercicios
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              ~{rutina.calorias || 350} kcal
            </span>
          </div>
        </div>

        {/* Exercises List */}
        <div className="p-6 overflow-y-auto max-h-[40vh]">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">EJERCICIOS</h3>
          <div className="space-y-2">
            {ejerciciosEjemplo.map((ejercicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{ejercicio.nombre}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {ejercicio.series}x{ejercicio.repeticiones}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onStart(rutina);
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Play className="w-5 h-5" />
            Iniciar Rutina
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Empty State Component
function EmptyState({ onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <Dumbbell className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No hay rutinas</h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Aun no tienes rutinas creadas. Crea tu primera rutina para empezar a entrenar.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAction}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
      >
        <Plus className="w-4 h-4" />
        Crear Rutina
      </motion.button>
    </motion.div>
  );
}

function RutinasView() {
  const [rutinas, setRutinas] = useState([]);
  const [filteredRutinas, setFilteredRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [activeRutina, setActiveRutina] = useState(null);

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'FUERZA', label: 'Fuerza' },
    { id: 'CARDIO', label: 'Cardio' },
    { id: 'HIPERTROFIA', label: 'Hipertrofia' },
    { id: 'RESISTENCIA', label: 'Resistencia' },
  ];

  useEffect(() => {
    async function fetchRutinas() {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch("http://localhost:8081/rutinas");
        if (response.ok) {
          const data = await response.json();
          setRutinas(data);
          setFilteredRutinas(data);
        }
      } catch (error) {
        console.log(error);
        // Mock data
        const mockRutinas = [
          { id: 1, nombre: 'Rutina de Fuerza', descripcion: 'Entrenamiento enfocado en ganar fuerza maxima con ejercicios compuestos', objetivo: 'FUERZA', duracion: 60 },
          { id: 2, nombre: 'Cardio HIIT', descripcion: 'Alta intensidad para quemar grasa y mejorar resistencia cardiovascular', objetivo: 'CARDIO', duracion: 30 },
          { id: 3, nombre: 'Hipertrofia Total', descripcion: 'Rutina para ganar masa muscular con alto volumen de entrenamiento', objetivo: 'HIPERTROFIA', duracion: 75 },
          { id: 4, nombre: 'Full Body Express', descripcion: 'Entrenamiento rapido de cuerpo completo ideal para dias ocupados', objetivo: 'RESISTENCIA', duracion: 45 },
          { id: 5, nombre: 'Piernas Intenso', descripcion: 'Enfoque en tren inferior con sentadillas, peso muerto y mas', objetivo: 'FUERZA', duracion: 55 },
          { id: 6, nombre: 'Cardio Quema Grasa', descripcion: 'Sesion de cardio moderado para optimizar la quema de calorias', objetivo: 'CARDIO', duracion: 40 },
        ];
        setRutinas(mockRutinas);
        setFilteredRutinas(mockRutinas);
      } finally {
        setLoading(false);
      }
    }
    fetchRutinas();
  }, []);

  useEffect(() => {
    let filtered = rutinas;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'todos') {
      filtered = filtered.filter(r => r.objetivo === selectedFilter);
    }

    setFilteredRutinas(filtered);
  }, [searchQuery, selectedFilter, rutinas]);

  const handleViewRutina = (rutina) => {
    setSelectedRutina(rutina);
  };

  const handleStartRutina = (rutina) => {
    setActiveRutina(rutina);
    // Here you could navigate to an active workout screen
    console.log('Starting rutina:', rutina.nombre);
  };

  const handleCompleteRutina = (rutina) => {
    // Mark as completed
    console.log('Completed rutina:', rutina.nombre);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Rutinas</h1>
        <p className="text-muted-foreground">Gestiona y empieza tus rutinas de entrenamiento</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar rutinas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Active Workout Banner */}
      <AnimatePresence>
        {activeRutina && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-primary/20 to-success/20 rounded-xl p-4 border border-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Entrenamiento en curso</p>
                    <p className="text-xs text-muted-foreground">{activeRutina.nombre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">12:34</span>
                  <button
                    onClick={() => setActiveRutina(null)}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      {!loading && filteredRutinas.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground mb-4"
        >
          {filteredRutinas.length} rutina{filteredRutinas.length !== 1 ? 's' : ''} encontrada{filteredRutinas.length !== 1 ? 's' : ''}
        </motion.p>
      )}

      {/* Rutinas Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-start justify-between mb-4">
                <Skeleton className="w-12 h-12" />
                <Skeleton className="w-20 h-6" />
              </div>
              <Skeleton className="w-3/4 h-6 mb-2" />
              <Skeleton className="w-full h-4 mb-1" />
              <Skeleton className="w-2/3 h-4 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="flex-1 h-10" />
                <Skeleton className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredRutinas.length === 0 ? (
        <EmptyState onAction={() => console.log('Create rutina')} />
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredRutinas.map((rutina, index) => (
              <RutinaCard
                key={rutina.id}
                rutina={rutina}
                onView={handleViewRutina}
                onStart={handleStartRutina}
                onComplete={handleCompleteRutina}
                delay={index * 0.05}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Rutina Detail Modal */}
      <AnimatePresence>
        {selectedRutina && (
          <RutinaDetailModal
            rutina={selectedRutina}
            onClose={() => setSelectedRutina(null)}
            onStart={handleStartRutina}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default RutinasView;

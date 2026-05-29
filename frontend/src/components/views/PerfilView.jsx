import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Bell,
  Moon,
  Globe,
  Shield,
  ChevronRight,
  Check,
  Weight,
  Ruler,
  Target
} from 'lucide-react';

// Toggle Switch Component
function Toggle({ enabled, onChange, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <motion.button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-secondary'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
          animate={{ left: enabled ? '26px' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
}

// Input Field Component
function InputField({ icon: Icon, label, value, onChange, type = 'text', disabled = false, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>
    </div>
  );
}

// Setting Item Component
function SettingItem({ icon: Icon, label, description, onClick, value }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors text-left"
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-2 rounded-lg bg-secondary">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground truncate">{description}</p>
        )}
      </div>
      {value ? (
        <span className="text-sm text-muted-foreground">{value}</span>
      ) : (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
}

// Skeleton
function Skeleton({ className }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

function PerfilView({ persona, setPersona }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    peso: '',
    altura: '',
    objetivo: '',
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    language: 'Espanol',
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (persona) {
        setFormData({
          nombre: persona.nombre || '',
          email: persona.email || '',
          telefono: persona.telefono || '+54 11 1234-5678',
          fechaNacimiento: persona.fechaNacimiento || '1990-05-15',
          peso: persona.peso || '75',
          altura: persona.altura || '175',
          objetivo: persona.objetivo || 'Ganar masa muscular',
        });
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [persona]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update persona in localStorage
      const updatedPersona = { ...persona, ...formData };
      localStorage.setItem("persona", JSON.stringify(updatedPersona));
      setPersona(updatedPersona);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (persona) {
      setFormData({
        nombre: persona.nombre || '',
        email: persona.email || '',
        telefono: persona.telefono || '+54 11 1234-5678',
        fechaNacimiento: persona.fechaNacimiento || '1990-05-15',
        peso: persona.peso || '75',
        altura: persona.altura || '175',
        objetivo: persona.objetivo || 'Ganar masa muscular',
      });
    }
    setIsEditing(false);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-success text-white shadow-lg"
          >
            <Check className="w-5 h-5" />
            <span className="font-medium">Perfil actualizado correctamente</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu informacion personal y preferencias</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border overflow-hidden mb-6"
      >
        {/* Profile Header */}
        <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="absolute -bottom-12 left-6">
            {loading ? (
              <Skeleton className="w-24 h-24 rounded-full" />
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-secondary border-4 border-card flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Edit Button */}
          <div className="absolute top-4 right-4">
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 backdrop-blur text-foreground border border-border hover:border-primary/30 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm font-medium">Editar</span>
              </motion.button>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 backdrop-blur text-muted-foreground border border-border hover:border-destructive/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Cancelar</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </span>
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-6 pb-6">
          {loading ? (
            <>
              <Skeleton className="w-48 h-8 mb-2" />
              <Skeleton className="w-32 h-4" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-foreground">{formData.nombre || 'Usuario'}</h2>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
            </>
          )}
        </div>
      </motion.div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Informacion Personal</h3>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-full h-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <InputField
                icon={User}
                label="Nombre completo"
                value={formData.nombre}
                onChange={(v) => updateFormData('nombre', v)}
                disabled={!isEditing}
                placeholder="Tu nombre"
              />
              <InputField
                icon={Mail}
                label="Correo electronico"
                value={formData.email}
                onChange={(v) => updateFormData('email', v)}
                type="email"
                disabled={!isEditing}
                placeholder="tu@email.com"
              />
              <InputField
                icon={Phone}
                label="Telefono"
                value={formData.telefono}
                onChange={(v) => updateFormData('telefono', v)}
                disabled={!isEditing}
                placeholder="+54 11 1234-5678"
              />
              <InputField
                icon={Calendar}
                label="Fecha de nacimiento"
                value={formData.fechaNacimiento}
                onChange={(v) => updateFormData('fechaNacimiento', v)}
                type="date"
                disabled={!isEditing}
              />
            </div>
          )}
        </motion.div>

        {/* Fitness Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Datos de Entrenamiento</h3>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-full h-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <InputField
                icon={Weight}
                label="Peso (kg)"
                value={formData.peso}
                onChange={(v) => updateFormData('peso', v)}
                type="number"
                disabled={!isEditing}
                placeholder="75"
              />
              <InputField
                icon={Ruler}
                label="Altura (cm)"
                value={formData.altura}
                onChange={(v) => updateFormData('altura', v)}
                type="number"
                disabled={!isEditing}
                placeholder="175"
              />
              <InputField
                icon={Target}
                label="Objetivo de entrenamiento"
                value={formData.objetivo}
                onChange={(v) => updateFormData('objetivo', v)}
                disabled={!isEditing}
                placeholder="Ganar masa muscular"
              />
            </div>
          )}

          {/* Stats Summary */}
          {!loading && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{formData.peso || '—'}</p>
                  <p className="text-xs text-muted-foreground">kg</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{formData.altura || '—'}</p>
                  <p className="text-xs text-muted-foreground">cm</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">
                    {formData.peso && formData.altura 
                      ? (formData.peso / ((formData.altura / 100) ** 2)).toFixed(1)
                      : '—'
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">IMC</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Preferencias</h3>
          <p className="text-sm text-muted-foreground">Personaliza tu experiencia en la app</p>
        </div>

        <div className="divide-y divide-border">
          {/* Notifications */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-secondary">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <Toggle
                  label="Notificaciones"
                  enabled={settings.notifications}
                  onChange={(v) => setSettings(s => ({ ...s, notifications: v }))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recibe recordatorios de entrenamiento
                </p>
              </div>
            </div>
          </div>

          {/* Dark Mode */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-secondary">
                <Moon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <Toggle
                  label="Modo oscuro"
                  enabled={settings.darkMode}
                  onChange={(v) => setSettings(s => ({ ...s, darkMode: v }))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Usar tema oscuro en la aplicacion
                </p>
              </div>
            </div>
          </div>

          {/* Language */}
          <SettingItem
            icon={Globe}
            label="Idioma"
            description="Cambia el idioma de la aplicacion"
            value={settings.language}
            onClick={() => console.log('Change language')}
          />

          {/* Privacy */}
          <SettingItem
            icon={Shield}
            label="Privacidad y Seguridad"
            description="Gestiona tus datos y permisos"
            onClick={() => console.log('Privacy settings')}
          />
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5"
      >
        <h4 className="text-sm font-medium text-destructive mb-2">Zona de peligro</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Estas acciones son irreversibles. Procede con cuidado.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-lg border border-destructive/50 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors"
        >
          Eliminar cuenta
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PerfilView;

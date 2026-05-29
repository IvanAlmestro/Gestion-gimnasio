import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import api from "../services/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMensaje("");
        
        try {
            const response = await api.post("/personas/login", {
                email,
                password
            });
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));
            
            setIsError(false);
            setMensaje("Login exitoso");
            
            setTimeout(() => {
                navigate("/dashboard");
                window.location.reload();
            }, 500);
        } catch(error) {
            console.log(error);
            setIsError(true);
            setMensaje("Credenciales invalidas");
        } finally {
            setIsLoading(false);
        }
    }

    // Demo login function
    const handleDemoLogin = () => {
        setIsLoading(true);
        
        // Simulate login with demo data
        setTimeout(() => {
            const demoPersona = {
                id: 1,
                nombre: 'Usuario Demo',
                email: 'demo@gymapp.com',
                telefono: '+54 11 1234-5678',
            };
            
            localStorage.setItem("token", "demo-token-12345");
            localStorage.setItem("persona", JSON.stringify(demoPersona));
            
            setIsError(false);
            setMensaje("Login exitoso");
            
            setTimeout(() => {
                navigate("/dashboard");
                window.location.reload();
            }, 500);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative"
            >
                {/* Logo */}
                <motion.div 
                    className="flex flex-col items-center mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
                        <Activity className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">GymApp</h1>
                    <p className="text-muted-foreground text-sm mt-1">Tu entrenamiento personal</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-2xl border border-border p-8 shadow-xl"
                >
                    <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                        Inicia Sesion
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                Correo electronico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                Contrasena
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    required
                                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Message */}
                        <AnimatePresence>
                            {mensaje && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`flex items-center gap-2 p-3 rounded-lg ${
                                        isError 
                                            ? 'bg-destructive/10 text-destructive' 
                                            : 'bg-success/10 text-success'
                                    }`}
                                >
                                    {isError ? (
                                        <AlertCircle className="w-5 h-5" />
                                    ) : (
                                        <Check className="w-5 h-5" />
                                    )}
                                    <span className="text-sm font-medium">{mensaje}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                    />
                                    <span>Ingresando...</span>
                                </>
                            ) : (
                                <span>Ingresar</span>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">o</span>
                        </div>
                    </div>

                    {/* Demo Button */}
                    <motion.button
                        type="button"
                        onClick={handleDemoLogin}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 border border-border transition-colors"
                    >
                        Entrar como Demo
                    </motion.button>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-sm text-muted-foreground mt-6"
                >
                    No tienes cuenta?{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
                        Registrate
                    </a>
                </motion.p>
            </motion.div>
        </div>
    );
}

export default LoginPage;

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { authApi } from "../../services/api.js";
import "../../styles/Dashboard.css"; // O el archivo CSS donde pongas los estilos del modal

function PasswordChangeModal({ onClose }) {
    const { persona } = useAuth();
    const [contrasenaActual, setContrasenaActual] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 1. Validaciones del frontend
        if (nuevaContrasena !== confirmarContrasena) {
            setError("Las contraseñas nuevas no coinciden.");
            return;
        }
        if (nuevaContrasena.length < 6) {
            setError("La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if (contrasenaActual === nuevaContrasena) {
            setError("La nueva contraseña debe ser distinta a la actual.");
            return;
        }

        // 2. Petición al backend
        setLoading(true);
        try {
            await authApi.put(`/personas/${persona.id}/password`, {
                contrasenaActual,
                nuevaContrasena
            });

            setSuccess(true);
            // Si sale bien, mostramos el éxito 2 segundos y cerramos el modal
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            // Atrapamos el mensaje de error que manda el backend (ej: "Contraseña actual incorrecta")
            setError(error.response?.data?.error || "Ocurrió un error al cambiar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Detenemos la propagación para que al hacer clic adentro del modal no se cierre */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <h2 className="modal-title">Cambiar Contraseña</h2>

                {success ? (
                    <div className="modal-success-msg">
                        ✅ ¡Contraseña actualizada con éxito!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="modal-form">

                        <div className="input-group">
                            <label>Contraseña Actual</label>
                            <input
                                type="password"
                                className="profile-input"
                                value={contrasenaActual}
                                onChange={(e) => setContrasenaActual(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Nueva Contraseña</label>
                            <input
                                type="password"
                                className="profile-input"
                                value={nuevaContrasena}
                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                className="profile-input"
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        {error && <p className="modal-error-msg">⚠️ {error}</p>}

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="profile-card-button cancel"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="profile-card-button save"
                                disabled={loading}
                            >
                                {loading ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default PasswordChangeModal;
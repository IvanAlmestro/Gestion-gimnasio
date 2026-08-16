import { useAuth } from "../hooks/useAuth";
import { authApi } from "../services/api";
import imgperfil from "../assets/user-img.jpg";
import ProfileCardStats from "../components/profile/ProfileCardStats.jsx";
import ProfileCardInfo from "../components/profile/ProfileCardInfo.jsx";
import "../styles/Profile.css";


function ProfilePage() {
    // En lugar de leer el localStorage a mano, lo traemos de nuestro hook global
    const { persona , setPersona} = useAuth();
    const opcionesObjetivo = [
        { value: "ADAPTACION", label: "Adaptación Anatómica" },
        { value: "HIPERTROFIA", label: "Hipertrofia (Ganar masa muscular)" },
        { value: "FUERZA", label: "Fuerza Máxima" },
        { value: "DEFINICION", label: "Definición (Pérdida de grasa)" },
        { value: "RESISTENCIA", label: "Resistencia Muscular" },
        { value: "MOVILIDAD", label: "Movilidad y Flexibilidad" }
    ];
    const handleUpdateCampo = async (campo, valor) => {
        try {
            const payload = { [campo]: valor }; // Propiedad computada de JavaScript
            const response = await authApi.put(`/personas/${persona.id}`, payload);
            if (response.status === 200) {
                setPersona(response.data);
            }
        } catch (error) {
            console.error(`Error al actualizar ${campo}:`, error);
        }
    };
    return (
        <section className="profile-page">
            <div className="profile-content">

                <div className="profile-img-text">
                    <div className="profile-img-wrapper">
                        <img
                            src={imgperfil}
                            className="img-profile"
                            alt="Foto de perfil"
                        />
                        {/* TODO: A futuro, conectar este botón con un input type="file" y AWS S3 o tu BD */}
                        <button className="profile-camera-button">📷</button>
                    </div>

                    <h1>Hola, {persona?.nombre || "Iván"}! 👋</h1>
                    <p>Gestioná la información de tu cuenta</p>
                </div>

                <div className="profile-stats">
                    <ProfileCardStats
                        title="Email:"
                        info={persona?.email || "Sin email"}
                    />

                    <ProfileCardStats
                        title="Peso Inicial:"
                        info={persona?.pesoInicial ? `${persona.pesoInicial} kg` : "No ingresaste peso"}
                    />

                    <ProfileCardStats
                        title="Fecha Inicio:"
                        info={
                            persona?.fechaRegistro
                                ? new Date(persona.fechaRegistro).toLocaleDateString("es-AR")
                                : "Sin fecha"
                        }
                    />
                </div>

                <div className="profile-info">
                    <h2>Configuración de la cuenta:</h2>

                    <ProfileCardInfo
                        title="Email:"
                        info={persona?.email || "Sin email"}
                    />

                    <ProfileCardInfo
                        title="Contraseña:"
                        info="************"
                    />

                    <ProfileCardInfo
                        title="Objetivo:"
                        info={persona?.objetivo ?
                            opcionesObjetivo.find(op => op.value === persona.objetivo)?.label || persona.objetivo
                            : "No ingresaste objetivo"}
                        onSave={(nuevoValor) => handleUpdateCampo("objetivo", nuevoValor)}
                        inputType="select"
                        options={opcionesObjetivo}
                    />

                    <ProfileCardInfo
                        title="Altura:"
                        info={persona?.altura ? `${Number(persona.altura).toFixed(2)}` : "No ingresaste altura"}
                        infoExtra={"metros"}
                        onSave={(nuevoValor) => handleUpdateCampo("altura", nuevoValor)}
                    />
                    <ProfileCardInfo
                        title="Peso Actual: "
                        info={persona?.pesoActual ? `${persona.pesoActual}` : "No ingresaste peso"}
                        infoExtra={"kg"}
                        onSave={(nuevoValor) => handleUpdateCampo("pesoActual", nuevoValor)}
                    />

                </div>

            </div>
        </section>
    );
}

export default ProfilePage;
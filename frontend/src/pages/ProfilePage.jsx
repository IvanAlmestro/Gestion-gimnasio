import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
import { authApi } from "../services/api";
import imgperfil from "../assets/user-img.jpg";
import ProfileCardStats from "../components/profile/ProfileCardStats.jsx";
import ProfileCardInfo from "../components/profile/ProfileCardInfo.jsx";
import "../styles/Profile.css";


function ProfilePage() {
    // En lugar de leer el localStorage a mano, lo traemos de nuestro hook global
    const { persona , setPersona} = useAuth();

    const opcionesObjetivo = [
        { value: "ADAPTACION", label: "Adaptación" },
        { value: "HIPERTROFIA", label: "Hipertrofia" },
        { value: "FUERZA", label: "Fuerza" },
        { value: "DEFINICION", label: "Definición" },
        { value: "RESISTENCIA", label: "Resistencia" },
        { value: "REHABILITACION", label: "Rehabilitación" },
        { value: "MOVILIDAD", label: "Movilidad" }
    ];
    // Referencia para el input oculto
    const fileInputRef = useRef(null);

    // Estado para la vista previa (usa la de la base de datos si existe, sino la por defecto)
    const [previewImg, setPreviewImg] = useState(persona?.fotoPerfil || imgperfil);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Mostrar la vista previa al instante para que la UI se sienta súper rápida
        const objectUrl = URL.createObjectURL(file);
        setPreviewImg(objectUrl);

        // 2. Convertir la imagen a Base64 para mandarla como JSON a Spring Boot
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64String = reader.result;
            // Asegurate de tener la columna "fotoPerfil" (tipo TEXT o LONGTEXT en MySQL)
            await handleUpdateCampo("fotoPerfil", base64String);
        };
    };
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
                            src={previewImg}
                            className="img-profile"
                            alt="Foto de perfil"
                        />
                        {/* INPUT OCULTO */}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        {/* BOTÓN QUE DISPARA EL INPUT */}
                        <button
                            className="profile-camera-button"
                            onClick={() => fileInputRef.current.click()}
                        >
                            📷
                        </button>
                    </div>

                    <h1>Hola, {persona?.nombre || "Iván"}! 👋</h1>
                    <p>Gestioná la información de tu cuenta</p>
                </div>

                <div className="profile-stats">
                    <ProfileCardStats
                        title="Objetivo Actual:"
                        info={persona?.objetivo || "No definido"}
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
                    <ProfileCardInfo
                        title="Meta de peso:"
                        info={persona?.altura ? `${Number(persona.pesoMeta).toFixed(1)}` : "No ingresaste peso meta"}
                        infoExtra={"kg"}
                        onSave={(nuevoValor) => handleUpdateCampo("pesoMeta", nuevoValor)}
                    />

                </div>

            </div>
        </section>
    );
}

export default ProfilePage;
import { useState } from "react";
import imgperfil from "../assets/user-img.jpg";
import "../styles/Profile.css";
import ProfileCardStats from "../components/profile/ProfileCardStats.jsx";
import ProfileCardInfo from "../components/profile/ProfileCardInfo.jsx";

function ProfilePage() {
    const [persona] = useState(() => {
        const personaStorage = localStorage.getItem("persona");

        return personaStorage
            ? JSON.parse(personaStorage)
            : null;
    });

    return (
        <section className="profile-page">
            <div className="profile-content">
                <div className="profile-img-text">
                    <div className="profile-img-wrapper">
                        <img src={imgperfil} className="img-profile" alt="Foto de perfil" />
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
                        info={persona?.peso ? `${persona.peso} kg` : "No ingresaste peso"}
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
                        info={persona?.objetivo || "No ingresaste objetivo"}
                    />

                    <ProfileCardInfo
                        title="Altura:"
                        info={persona?.altura ? `${persona.altura} metros` : "No ingresaste altura"}
                    />
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;
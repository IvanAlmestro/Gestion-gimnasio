import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import WeightChart from "./WeightChart.jsx";
import {Link} from "react-router-dom";

function WeightProgressCard() {
    const { persona } = useAuth();
    const [historialPesos, setHistorialPesos] = useState([]);

    // 1. Cálculos dinámicos con tus datos reales
    const pesoInicial = persona?.pesoInicial || 0;
    const pesoActual = persona?.pesoActual || 0;
    const diferencia = (pesoActual - pesoInicial).toFixed(1);
    const signo = diferencia > 0 ? "+" : "";


    const calcularProgreso = (pesoInicial, pesoActual, meta) => {
        // Evita dividir por cero o errores si la meta aún no está definida
        if (!meta || pesoInicial === meta) return 0;

        const distanciaTotal = meta - pesoInicial;
        const distanciaRecorrida = pesoActual - pesoInicial;

        let porcentaje = (distanciaRecorrida / distanciaTotal) * 100;

        // Mantiene la barra visualmente impecable entre 0% y 100%
        return Math.min(Math.max(Math.round(porcentaje), 0), 100);
    };
    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                // 💡 FUTURO: const response = await authApi.get(`/personas/${persona.id}/historial-peso`);
                // setHistorialPesos(response.data);

                // MOCK TEMPORAL hasta que armes el backend:
                setHistorialPesos([
                    { fecha: 'Semana 1', peso: pesoInicial },
                    { fecha: 'Actual', peso: pesoActual },
                ]);
            } catch (error) {
                console.error("Error al cargar historial:", error);
            }
        };

        if (persona?.id) fetchHistorial();
    }, [persona]);

    return (
        <article className="weight-card">
            <h2>🏋️ Seguimiento de pesos:</h2>

            <div className="weight-content">
                <div className="weight-data">
                    <p>Peso inicial: <strong className="strong-progress">{pesoInicial} kg</strong></p>
                    <p>Peso actual: <strong className="strong-progress">{pesoActual} kg</strong></p>
                    <p>Último cambio: <strong className="strong-progress">{signo}{diferencia} kg</strong></p>

                    <p>
                        Meta: <strong className="strong-progress">
                        {persona?.pesoMeta ? `${persona.pesoMeta} kg` : "No definida"}
                    </strong>
                        <Link to="/perfil" className="btn-edit-meta">✏️ Editar</Link>
                    </p>

                </div>
                <WeightChart historialPesos={historialPesos} />
            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width:`${calcularProgreso(pesoInicial, pesoActual, persona?.pesoMeta)}%` }}></div>
            </div>

            <span className="progress-label">
                {persona?.pesoMeta
                    ? `Progreso ${calcularProgreso(pesoInicial, pesoActual, persona.pesoMeta)}%`
                    : "Definí una meta para ver tu progreso"
                }
            </span>
        </article>
    );
}

export default WeightProgressCard;
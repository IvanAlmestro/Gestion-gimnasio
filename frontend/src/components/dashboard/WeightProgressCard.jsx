import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import WeightChart from "./WeightChart.jsx";
import { Link } from "react-router-dom";
import { authApi } from "../../services/api.js";

function WeightProgressCard() {
    const { persona } = useAuth();
    const [historialPesos, setHistorialPesos] = useState([]);

    const pesoInicial = persona?.pesoInicial || 0;

    // 1. Calculamos la fecha de inicio una sola vez acá arriba
    const fechaInicioObj = persona?.fechaRegistro ? new Date(persona.fechaRegistro) : new Date();
    const fechaInicioFormateada = persona?.fechaRegistro
        ? fechaInicioObj.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
        : 'Inicio';

    // 2. Sincronizamos el peso actual mirando siempre el último dato del gráfico
    const pesoActual = historialPesos.length > 0
        ? historialPesos[historialPesos.length - 1].peso
        : (persona?.pesoActual || 0);

    const valorProgreso = pesoActual - pesoInicial;
    const signo = valorProgreso > 0 ? "+" : "";
    const progresoFormateado = `${signo}${valorProgreso.toFixed(1)}`;

    const calcularProgreso = (pesoInicial, pesoActual, meta) => {
        if (!meta || pesoInicial === meta) return 0;

        const distanciaTotal = meta - pesoInicial;
        const distanciaRecorrida = pesoActual - pesoInicial;

        let porcentaje = (distanciaRecorrida / distanciaTotal) * 100;
        return Math.min(Math.max(Math.round(porcentaje), 0), 100);
    };

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await authApi.get(`/personas/${persona.id}/historial-peso`);

                const dataAgrupada = response.data.reduce((acc, registro) => {
                    // ACÁ ESTABA EL ERROR: Ahora sí sacamos la fecha de CADA registro del historial
                    const fechaObj = new Date(registro.fecha);
                    const fechaCorta = fechaObj.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });

                    const index = acc.findIndex(item => item.fecha === fechaCorta);

                    if (index !== -1) {
                        acc[index].peso = registro.peso;
                    } else {
                        acc.push({ fecha: fechaCorta, peso: registro.peso });
                    }
                    return acc;
                }, []);

                const historialCompleto = [
                    { fecha: fechaInicioFormateada, peso: pesoInicial },
                    ...dataAgrupada
                ];

                setHistorialPesos(historialCompleto);

            } catch (error) {
                console.error("Error al cargar el historial de pesos:", error);
            }
        };

        if (persona?.id) fetchHistorial();
    }, [persona, pesoInicial, fechaInicioFormateada]);

    return (
        <article className="weight-card">
            <h2>🏋️ Seguimiento de pesos:</h2>

            <div className="weight-content">
                <div className="weight-data">
                    <p>Peso inicial: <strong className="strong-progress">{pesoInicial} kg</strong></p>
                    <p>Peso actual: <strong className="strong-progress">{pesoActual} kg</strong></p>

                    {/* Volvemos a tu clase original para mantener la neutralidad de la métrica */}
                    <p>Diferencia de peso: <strong className="strong-progress">{progresoFormateado} kg</strong></p>

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
                <div className="progress-fill" style={{ width: `${calcularProgreso(pesoInicial, pesoActual, persona?.pesoMeta)}%` }}></div>
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
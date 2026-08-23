import WeightChart from "./WeightChart.jsx";

function WeightProgressCard() {
    const datosDePrueba = [
        { fecha: 'Semana 1', peso: 78.0 },
        { fecha: 'Semana 2', peso: 78.1 },
        { fecha: 'Semana 3', peso: 78.2 },
        { fecha: 'Actual', peso: 78.4 },
    ];
    return (
        <article className="weight-card">
            <h2>Seguimiento de pesos:</h2>

            <div className="weight-content">
                <div className="weight-data">
                    <p>Peso inicial: <strong>78kg</strong></p>
                    <p>Peso actual: <strong>78.4kg</strong></p>
                    <p>Último cambio: <strong>+0.4kg</strong></p>
                    <p>Meta: <strong>82kg</strong></p>
                </div>


                <WeightChart historialPesos={datosDePrueba} />
            </div>

            <div className="progress-bar">
                <div className="progress-fill"></div>
            </div>

            <span className="progress-label">
                Progreso 60%
            </span>
        </article>
    );
}

export default WeightProgressCard;
function WeightProgressCard() {
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

                <div className="fake-chart">
                    📈
                </div>
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
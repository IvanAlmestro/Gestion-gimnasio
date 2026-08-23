import { useState } from 'react';
import '../../styles/Dashboard.css';

function WeightChart({ historialPesos }) {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    if (!historialPesos || historialPesos.length === 0) {
        return <div className="chart-empty-state">No hay datos de peso registrados aún.</div>;
    }

    // Cálculos para escalar los puntos dentro del SVG
    const width = 360;
    const height = 100;
    const padding = 20;

    const pesos = historialPesos.map(d => d.peso);
    const minPeso = Math.min(...pesos) - 0.5;
    const maxPeso = Math.max(...pesos) + 0.5;
    const range = maxPeso - minPeso || 1;

    const points = historialPesos.map((item, index) => {
        const x = padding + (index * (width - 2 * padding)) / (historialPesos.length - 1 || 1);
        const y = height - padding - ((item.peso - minPeso) / range) * (height - 2 * padding);
        return { ...item, x, y };
    });

    const pathD = points.reduce((acc, point, index) => {
        return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
    }, "");

    return (
        <div className="custom-weight-chart">
            <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>

                {/* Línea principal */}
                <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Puntos interactivos */}
                {points.map((pt, i) => (
                    <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredPoint?.fecha === pt.fecha ? 6 : 4}
                        fill="#06b6d4"
                        stroke="#111827"
                        strokeWidth="2"
                        className="chart-dot"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                    />
                ))}
            </svg>

            {/* Tooltip flotante */}
            {hoveredPoint && (
                <div className="custom-chart-tooltip">
                    <span>{hoveredPoint.fecha}: <strong>{hoveredPoint.peso} kg</strong></span>
                </div>
            )}
        </div>
    );
}

export default WeightChart;
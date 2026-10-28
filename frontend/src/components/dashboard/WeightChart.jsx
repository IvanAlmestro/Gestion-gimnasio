import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../../styles/Dashboard.css';

function WeightChart({ historialPesos }) {
    if (!historialPesos || historialPesos.length === 0) {
        return <div className="chart-empty-state">No hay datos de peso registrados aún.</div>;
    }

    return (
        <div className="custom-weight-chart">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historialPesos} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* Cuadrícula sutil horizontal */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />

                    {/* Fechas en el eje X */}
                    <XAxis
                        dataKey="fecha"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                        interval="preserveStartEnd" /* <-- Obliga a renderizar las esquinas */
                        padding={{ left: 20, right: 20 }} /* <-- Despega la línea de las paredes */
                    />

                    {/* Eje Y oculto pero necesario para que no se aplaste la línea */}
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide={true} />

                    {/* Tooltip interactivo que sigue al mouse */}
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                        itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                        formatter={(value) => [`${value} kg`, 'Peso']}
                    />

                    {/* La línea principal con gradiente */}
                    <Area
                        type="monotone"
                        dataKey="peso"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#areaColor)"
                        activeDot={{ r: 6, fill: '#06b6d4', stroke: '#1e293b', strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeightChart;
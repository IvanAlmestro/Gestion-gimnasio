import { Link, useParams } from "react-router-dom";
import { useRoutineDetail } from "../hooks/useRoutineDetail";
import RoutineIdCard from "../components/routines/RoutineIdCard.jsx";
import "../styles/RoutinePage.css";

function RoutineDetailPage() {
    const { id } = useParams();
    const { nombre, objetivo, duracion, routineId, diasRutina, loading, error } = useRoutineDetail(id);

    if (loading) return <div>Cargando detalle de la rutina...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="routine-detail-page">
            <Link to="/rutinas" className="btn-back">⬅ Volver a mis rutinas</Link>

            <div className="routine-header">
                <h1 className="title-rutine">Rutina: {nombre}</h1>
            </div>

            <RoutineIdCard
                title={nombre}
                objective={objetivo}
                duration={duracion}
                dias={diasRutina}
                routineId={routineId}
            />
        </section>
    );
}

export default RoutineDetailPage;
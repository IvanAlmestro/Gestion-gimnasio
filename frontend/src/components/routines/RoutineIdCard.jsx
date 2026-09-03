import { useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";
import {authApi} from "../../services/api.js";

function RoutineIdCard({
                           title,
                           objective,
                           duration,
                           exercises,
                           routineId}) {
    const navigate = useNavigate();
    const { persona } = useAuth();

    const handleComenzar = async () => {
        try {
            // Asi es como lo espera el ComenzarRutinaDTO
            const payload = {
                usuarioId: persona.id,
                rutinaId: routineId
            };

            const response = await authApi.post("/rutinas/comenzar", payload);

            if (response.status === 200) {
                console.log("Backend responde:", response.data);

                // Si Spring Boot da el OK, recién ahí viajamos a la otra pantalla
                navigate(`/entrenamiento/${routineId}`);
            }
        } catch (error) {
            console.error("Error al iniciar el entrenamiento:", error);
        }
    };
    return (
        <article className="routine-id-card">
            <h2>{title}</h2>

            <div className="routine-id-info">
                <span>🔥 {exercises?.length || 0} ejercicios</span>
                <span>🏆 {objective}</span>
                <span>🕒 {duration}</span>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Series</th>
                    <th>Repes</th>
                    <th>RIR</th>
                </tr>
                </thead>
                <tbody>
                {exercises?.map((exercise) => (
                    <tr key={exercise.id}>
                        <td className="td-nombre">{exercise.nombre}</td>
                        <td>{exercise.series}</td>
                        <td>{exercise.repeticiones - 2 + " - " + exercise.repeticiones}</td>
                        <td>{exercise.rir || "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={handleComenzar} className="btn-comenzar">
                Comenzar {title}
            </button>
        </article>
    );
}

export default RoutineIdCard;
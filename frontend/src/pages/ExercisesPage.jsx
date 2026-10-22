import { useEffect, useState } from "react";
import ExerciseCard from "../components/exercises/ExerciseCard.jsx";
import ExerciseModal from "../components/exercises/ExerciseModal.jsx"; // <-- Asegurate de que la ruta sea correcta
import "../styles/ExercisesPage.css";
import { rutinasApi } from "../services/api";

const CATEGORIES = [
    "Todos", "Biceps", "Triceps", "Espalda", "Pecho", "Hombros", "Piernas"
];

function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // NUEVO: Estado para saber qué ejercicio está mirando el usuario
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await rutinasApi.get("/ejercicios");
                setExercises(response.data);
            } catch (error) {
                setError(error.message || "Error al obtener ejercicios");
            } finally {
                setLoading(false);
            }
        }
        fetchExercises();
    }, []);

    const filteredExercises = exercises.filter((exercise) => {
        const matchesCategory = selectedCategory === "Todos" || exercise.grupoMuscular === selectedCategory;
        const matchesSearch = exercise.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) return <div>Cargando biblioteca de ejercicios...</div>;
    if (error) return <div>Ocurrió un error: {error}</div>;

    return (
        <section className="exercises-page">
            <div className="exercises-topbar">
                <div className="exercise-filters-group">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            className={selectedCategory === category ? "filter-button active" : "filter-button"}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="exercise-search">
                    <input
                        type="text"
                        placeholder="🔍 Buscar ejercicio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <p className="exercise-count">
                {filteredExercises.length} ejercicios encontrados.
            </p>

            <div className="exercise-grid">
                {filteredExercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise} // Le pasamos el objeto entero
                        onView={setSelectedExercise} // Le pasamos la función que actualiza el estado
                    />
                ))}
            </div>

            {/* NUEVO: El modal se renderiza por encima de todo si hay un ejercicio seleccionado */}
            {selectedExercise && (
                <ExerciseModal
                    ejercicio={selectedExercise}
                    onClose={() => setSelectedExercise(null)}
                />
            )}
        </section>
    );
}

export default ExercisesPage;
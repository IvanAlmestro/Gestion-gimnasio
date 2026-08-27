import { useEffect, useState } from "react";
import ExerciseCard from "../components/exercises/ExerciseCard.jsx";
import "../styles/ExercisesPage.css";
import { rutinasApi } from "../services/api";

// Datos estáticos fuera del componente para no recrearlos en memoria
const CATEGORIES = [
    "Todos", "Biceps", "Triceps", "Espalda", "Pecho", "Hombros", "Piernas"
];

function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState(""); // Agregamos estado para el input

    // Agregamos manejo de UX
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExercises() {
            try {
                // Chau fetch manual, usamos nuestra instancia configurada
                const response = await rutinasApi.get("/ejercicios");

                // Axios guarda los datos directo en la propiedad 'data'
                setExercises(response.data);
            } catch (error) {
                setError(error.message || "Error al obtener ejercicios");
            } finally {
                setLoading(false);
            }
        }
        fetchExercises();
    }, []);

    // 2. Filtro combinado: Categoría + Búsqueda por texto
    const filteredExercises = exercises.filter((exercise) => {
        const matchesCategory = selectedCategory === "Todos" || exercise.grupoMuscular === selectedCategory;
        const matchesSearch = exercise.nombre.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (loading) return <div>Cargando biblioteca de ejercicios...</div>;
    if (error) return <div>Ocurrió un error: {error}</div>;

    return (
        <section className="exercises-page">
            <div className="exercises-header">
                <h1>Ejercicios</h1>

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

            <div className="exercise-filters">
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

            <p className="exercise-count">
                {filteredExercises.length} ejercicios encontrados.
            </p>

            <div className="exercise-grid">
                {filteredExercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        name={exercise.nombre}
                        muscleGroup={exercise.grupoMuscular}
                    />
                ))}
            </div>
        </section>
    );
}

export default ExercisesPage;
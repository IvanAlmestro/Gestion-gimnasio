import { useEffect, useState } from "react";
import ExerciseCard from "../components/exercises/ExerciseCard.jsx";
import "../styles/ExercisesPage.css";

function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch("http://localhost:8081/ejercicios");

                if (!response.ok) {
                    throw new Error("Error al obtener ejercicios");
                }
                const data = await response.json();
                setExercises(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchExercises();
    }, []);

    const categories = [
        "Todos",
        "Bíceps",
        "Tríceps",
        "Espalda",
        "Pecho",
        "Hombros",
        "Pierna"
    ];

    const filteredExercises =
        selectedCategory === "Todos"
            ? exercises
            : exercises.filter(
                (exercise) => exercise.grupoMuscular === selectedCategory
            );

    return (
        <section className="exercises-page">
            <div className="exercises-header">
                <h1>Ejercicios</h1>

                <div className="exercise-search">
                    🔍 Buscar ejercicio...
                </div>
            </div>

            <div className="exercise-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "filter-button active"
                                : "filter-button"
                        }
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
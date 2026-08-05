function RoutineIdCard({
                           title,
                           objective,
                           duration,
                           exercises
                       }) {
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
                        <td>{exercise.repeticiones-2 + " - " + exercise.repeticiones}</td>
                        <td>{exercise.rir || "-"}</td>
                    </tr>

                ))}

                </tbody>

            </table>

            <button className="btn-comenzar">
                Comenzar {title}
            </button>

        </article>
    );
}

export default RoutineIdCard;
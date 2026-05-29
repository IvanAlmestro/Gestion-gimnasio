import "../styles/RutinaCard.css"
function RutinaCard({ rutina }) {

    return (

        <div className="rutina-card">

            <h2>
                {rutina.nombre}
            </h2>

            <p className="descripcion">
                {rutina.descripcion}
            </p>

            <span className="objetivo">
                {rutina.objetivo}
            </span>

            <span> Ver Ejercicios </span>
        </div>
    )
}

export default RutinaCard;
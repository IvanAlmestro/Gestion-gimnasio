import { Link } from "react-router-dom";


function StatCard({ icon, title, text, value, label, linkTo }) {

    // Contenido interno de la tarjeta
    const cardContent = (
        <>
            <div className="stat-header">
                <div className="stat-icon-title">
                    <span>{icon}</span>
                    <h3>{title}</h3>
                </div>

                {/* La flecha indicadora solo se renderiza si hay un link */}
                {linkTo && <span className="stat-arrow">↗</span>}
            </div>

            {text && <p className="stat-text">{text}</p>}


            <div className="stat-metric">
                <strong>{value}</strong>
                <span>{label}</span>
            </div>
        </>
    );

    // Si tiene link, renderizamos el <Link>
    if (linkTo) {
        return (
            <Link to={linkTo} className="stat-card stat-card-link">
                {cardContent}
            </Link>
        );
    }

    // Si no tiene link, es un <article> estático
    return (
        <article className="stat-card">
            {cardContent}
        </article>
    );
}

export default StatCard;
import { Link } from "react-router-dom";

function StatCard({ icon, title, text, value, label, linkTo }) {
    return (
        <article className="stat-card">
            <div className="stat-title">
                <span>{icon}</span>
                <h3>{title}</h3>
            </div>

            {text && <p>{text}</p>}

            <strong>{value}</strong>

            <span>{label}</span>

            {linkTo && (
                <Link to={linkTo} className="primary-button">
                    Ver
                </Link>
            )}
        </article>
    );
}

export default StatCard;
function SmallInfoCard({ icon, title, value, label }) {
    return (
        <article className="small-card">
            <h3>{icon} {title}</h3>

            <strong>{value}</strong>

            {label && <span>{label}</span>}
        </article>
    );
}

export default SmallInfoCard;
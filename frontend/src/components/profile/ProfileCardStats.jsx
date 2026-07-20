function ProfileCardStats({ title, info }) {
    return (
        <article className="profile-card-stat">
            <h3>{title}</h3>
            <p>{info}</p>
        </article>
    );
}

export default ProfileCardStats;
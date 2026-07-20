function ProfileCardInfo({ title, info }) {
    return (
        <article className="profile-card-info">
            <div className="profile-card-info-text">
                <h3>{title}</h3>
                <p>{info}</p>
            </div>

            <button className="profile-card-button">
                Editar
            </button>
        </article>
    );
}

export default ProfileCardInfo;
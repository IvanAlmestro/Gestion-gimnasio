import { useState } from "react";

// 1. Agregamos className con un valor por defecto vacío
function ProfileCardInfo({ title, info, infoExtra, onSave, inputType = "text", options = [], className = "", onCustomEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(info);

    const handleButtonClick = async () => {
        if (isEditing) {
            if (onSave) {
                await onSave(draftValue);
            }
            setIsEditing(false);
        } else {
            let valorInicial = info;
            if (onCustomEdit) {
                onCustomEdit();
                return;
            }
            if (info.includes("No ingresaste")) {
                valorInicial = "";
            } else if (inputType === "select" && options.length > 0) {
                const opcionEncontrada = options.find(
                    (op) => op.label === info || op.value === info
                );
                valorInicial = opcionEncontrada ? opcionEncontrada.value : "";
            }

            setDraftValue(valorInicial);
            setIsEditing(true);
        }
    };

    return (
        // 2. Combinamos tu clase fija con la clase dinámica (setting-full-width)
        <article className={`profile-card-info ${className}`}>
            <div className="profile-card-info-text">
                <h3>{title}</h3>
                {isEditing ? (
                    inputType === "select" ? (
                        <select
                            value={draftValue}
                            onChange={(e) => setDraftValue(e.target.value)}
                            className="profile-input"
                        >
                            <option value="" disabled>Seleccioná un objetivo</option>
                            {options.map((opcion) => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={inputType}
                            value={draftValue}
                            onChange={(e) => setDraftValue(e.target.value)}
                            className="profile-input"
                        />
                    )
                ) : (
                    <p>{info} {infoExtra}</p>
                )}
            </div>
            <div>
                {isEditing && (
                    <button
                        className="profile-card-button cancel"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancelar
                    </button>
                )}
                <button className="profile-card-button" onClick={handleButtonClick}>
                    {isEditing ? "Guardar" : "Editar"}
                </button>
            </div>
        </article>
    );
}

export default ProfileCardInfo;
import { useState } from "react";

// Sumamos inputType (por defecto es "text") y options (por defecto un arreglo vacío)
function ProfileCardInfo({ title, info, infoExtra, onSave, inputType = "text", options = [] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(info);

    const handleButtonClick = async () => {
        if (isEditing) {
            if (onSave) {
                await onSave(draftValue);
            }
            setIsEditing(false);
        } else {
            // MODO ENTRAR A EDICIÓN:
            let valorInicial = info;

            // Si el texto dice que no hay datos, arrancamos vacío
            if (info.includes("No ingresaste")) {
                valorInicial = "";
            }
            // SI ES SELECT: Buscamos el 'value' real en base al 'label' (info)
            else if (inputType === "select" && options.length > 0) {
                const opcionEncontrada = options.find(
                    (op) => op.label === info || op.value === info
                );
                // Si lo encuentra, usamos el valor del backend (ej: "ADAPTACION"). Si no, vacío.
                valorInicial = opcionEncontrada ? opcionEncontrada.value : "";
            }

            setDraftValue(valorInicial);
            setIsEditing(true);
        }
    };

    return (
        <article className="profile-card-info">
            <div className="profile-card-info-text">
                <h3>{title}</h3>
                {isEditing ? (
                    // RENDERIZADO CONDICIONAL: Si es select mostramos el desplegable, sino el input
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
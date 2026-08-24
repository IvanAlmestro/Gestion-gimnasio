import {useState} from "react";
import {useEjercicios} from "../../hooks/useEjercicios.js";
import {rutinasApi} from "../../services/api.js";


function CreateRoutine({ onClose , onSaveOk}) {
    const [nombre, setNombre] = useState("");
    const [objetivo, setObjetivo] = useState("HIPERTROFIA"); // Valor por defecto
    const { ejercicios, loading: loadingEjercicios, error: errorEjercicios } = useEjercicios();
    // Esto guardará algo como: [1, 5, 12] que son los id
    const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);

    const handleToggleEjercicio = (idEjercicio) => {
        //Evita que si hay cambios rapidos se bugee el renderizado de react por eso no paso el valor directamente
        setEjerciciosSeleccionados((listaActual) => {
            if (listaActual.includes(idEjercicio)) {
                // Si ya estaba, lo filtramos y lo sacamos, (si es igual no pasa la condicion)
                return listaActual.filter(id => id !== idEjercicio);
            } else {
                // Si no estaba, lo agregamos al array
                return [...listaActual, idEjercicio];
            }
        });
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const usuarioActualId = localStorage.getItem("idUsuarioLogueado");
        const nuevaRutinaPayload={
            nombre: nombre,
            objetivo : objetivo,
            ejerciciosIds: ejerciciosSeleccionados,
            idUsuario: usuarioActualId ? Number(usuarioActualId) : 6
        };
        console.log("Datos a enviar:", nuevaRutinaPayload);
        try{
            const response = await rutinasApi.post("/rutinas", nuevaRutinaPayload);

            const rutinaGuardada = response.data;

            onSaveOk(rutinaGuardada);
            onClose();

        }catch (error){
            console.error("Error al cargar nueva rutina: "+ error);
        }

    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>

                <h2>Crear Nueva Rutina</h2>

                <form className="modal-form" onSubmit={handleSubmit}>
                    {/* Estructura base para los datos */}
                    <div className="form-group">
                        <label>Nombre de la rutina</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Ej: Full Body"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Objetivo</label>
                        {/* Usamos un select para que el usuario no pueda escribir mal la categoría */}
                        <select
                            className="form-input"
                            value={objetivo}
                            onChange={(e) => setObjetivo(e.target.value)}
                        >
                            <option value="HIPERTROFIA">Hipertrofia</option>
                            <option value="FUERZA">Fuerza</option>
                            <option value="ADAPTACION">Adaptación</option>
                            <option value="DEFINICION">Definición</option>
                            <option value="RESISTENCIA">Resistencia</option>
                        </select>
                    </div>
                    {/* SECCIÓN DE EJERCICIOS */}
                    <div className="form-group">
                        <label>Ejercicios ({ejerciciosSeleccionados.length} seleccionados)</label>

                        <div className="checkbox-list-container">
                            {loadingEjercicios && <p className="text-gray-400 text-sm">Cargando ejercicios...</p>}
                            {errorEjercicios && <p className="text-red-400 text-sm">{errorEjercicios}</p>}

                            {!loadingEjercicios && !errorEjercicios && ejercicios.map((ej) => (
                                <label key={ej.id} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={ejerciciosSeleccionados.includes(ej.id)}
                                        onChange={() => handleToggleEjercicio(ej.id)}
                                    />
                                    <span className="checkbox-label">{ej.nombre}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Deshabilitamos el botón si no eligió ningún ejercicio o si está cargando */}
                    <button
                        type="submit"
                        className="save-button"
                        disabled={loadingEjercicios || ejerciciosSeleccionados.length === 0}
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}
export default CreateRoutine;
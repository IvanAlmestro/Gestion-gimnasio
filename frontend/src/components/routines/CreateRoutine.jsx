import {useState} from "react";
import {useEjercicios} from "../../hooks/useEjercicios.js";
import {rutinasApi} from "../../services/api.js";


function CreateRoutine({ onClose , onSaveOk}) {
    const [nombre, setNombre] = useState("");
    const [objetivo, setObjetivo] = useState("HIPERTROFIA"); // Valor por defecto
    const { ejercicios, loading: loadingEjercicios, error: errorEjercicios } = useEjercicios();
    // El gran objeto que se va a ir llenando antes de mandarlo a Spring Boot
    const [rutinaDraft, setRutinaDraft] = useState({
        nombre: "",
        objetivo: "Hipertrofia", // Valor por defecto
        dias: [
            { idLocal: 1, nombre: "Día 1", ejerciciosIds: [] }
        ]
    });

    // Controla qué pestaña estamos mirando (arranca en la posición 0, el Día 1)
    const [diaActivoIndex, setDiaActivoIndex] = useState(0);


    const handleAgregarDia = () => {
        const nuevoNumero = rutinaDraft.dias.length + 1;
        const nuevoDia = {
            idLocal: nuevoNumero,
            nombre: `Día ${nuevoNumero}`,
            ejerciciosIds: [] // Arranca vacío
        };

        setRutinaDraft({
            ...rutinaDraft,
            dias: [...rutinaDraft.dias, nuevoDia]
        });

        // Cambiamos a la nueva pestaña automáticamente
        setDiaActivoIndex(rutinaDraft.dias.length);
    };

    const handleToggleEjercicio = (idEjercicio) => {
        // Mantenemos tu buena práctica del callback para evitar bugs de asincronía
        setRutinaDraft((draftAnterior) => {

            // 1. Hacemos una copia del array de días
            const nuevosDias = [...draftAnterior.dias];

            // 2. Agarramos el día que el usuario está viendo actualmente
            const diaActual = nuevosDias[diaActivoIndex];

            // 3. apuntamos el array al dia activo
            let nuevosEjerciciosDelDia;
            if (diaActual.ejerciciosIds.includes(idEjercicio)) {
                // Si ya estaba, lo filtramos y lo sacamos
                nuevosEjerciciosDelDia = diaActual.ejerciciosIds.filter(id => id !== idEjercicio);
            } else {
                // Si no estaba, lo agregamos al array
                nuevosEjerciciosDelDia = [...diaActual.ejerciciosIds, idEjercicio];
            }

            // 4. Actualizamos el día específico con su nueva lista
            nuevosDias[diaActivoIndex] = {
                ...diaActual,
                ejerciciosIds: nuevosEjerciciosDelDia
            };

            // 5. Retornamos la rutina completa actualizada
            return {
                ...draftAnterior,
                dias: nuevosDias
            };
        });
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const usuarioActualId = localStorage.getItem("idUsuarioLogueado");

        // Traducimos los IDs de React al formato complejo que pide Spring Boot
        const nuevaRutinaPayload = {
            nombre: nombre,
            objetivo: objetivo,
            dias: rutinaDraft.dias.map(dia => ({
                nombre: dia.nombre,
                ejercicios: dia.ejerciciosIds.map(id => ({
                    ejercicioId: id,
                    series: 4,         // Le mandamos un default para que no falle el backend
                    repeticiones: 10,  // Le mandamos un default
                    notas: ""
                }))
            })),
            idUsuario: usuarioActualId ? Number(usuarioActualId) : 6
        };

        console.log("Datos a enviar al Backend:", nuevaRutinaPayload);

        try{
            const response = await rutinasApi.post("/rutinas", nuevaRutinaPayload);
            const rutinaGuardada = response.data;
            onSaveOk(rutinaGuardada);
            onClose();
        }catch (error){
            console.error("Error al cargar nueva rutina: "+ error);
        }
    }
    // Calculamos el total de ejercicios elegidos en toda la rutina para habilitar/deshabilitar el botón de Guardar
    const totalEjerciciosSeleccionados = rutinaDraft.dias.reduce((total, dia) => total + dia.ejerciciosIds.length, 0);
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
                            <option value="REHABILITACION">Rehabilitación</option>
                            <option value="MOVILIDAD">Movilidad</option>
                        </select>
                    </div>
                    {/* SECCIÓN DE EJERCICIOS */}
                    <div className="form-group">
                        <div className="dias-tabs">
                            {rutinaDraft.dias.map((dia, index) => (
                                <button
                                    key={dia.idLocal}
                                    type="button"
                                    className={`tab-button ${diaActivoIndex === index ? 'active' : ''}`}
                                    onClick={() => setDiaActivoIndex(index)}
                                >
                                    {dia.nombre}
                                </button>
                            ))}

                            {/* Botón extra para sumar días */}
                            <button type="button" className="btn-agregar-dia" onClick={handleAgregarDia}>
                                + Día
                            </button>
                        </div>

                        <label>Ejercicios ({rutinaDraft.dias[diaActivoIndex].ejerciciosIds.length} seleccionados en este día)</label>

                        <div className="checkbox-list-container">
                            {loadingEjercicios && <p className="text-gray-400 text-sm">Cargando ejercicios...</p>}
                            {errorEjercicios && <p className="text-red-400 text-sm">{errorEjercicios}</p>}

                            {!loadingEjercicios && !errorEjercicios && ejercicios.map((ej) => (
                                <label key={ej.id} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={rutinaDraft.dias[diaActivoIndex].ejerciciosIds.includes(ej.id)}
                                        onChange={() => handleToggleEjercicio(ej.id)}
                                    />
                                    <span className="checkbox-label">{ej.nombre}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Deshabilitamos el botón si no eligió NINGÚN ejercicio en toda la rutina */}
                    <button
                        type="submit"
                        className="save-button"
                        disabled={loadingEjercicios || totalEjerciciosSeleccionados === 0}
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}
export default CreateRoutine;
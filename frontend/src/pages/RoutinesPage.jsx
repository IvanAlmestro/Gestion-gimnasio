import { useEffect, useState } from "react";
import RoutineCard from "../components/RoutineCard.jsx";
import "../styles/RoutinePage.css";

function RoutinesPage() {
    const [rutinas, setRutinas] = useState([]);

    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch("http://localhost:8081/rutinas");
                const data = await response.json();
                setRutinas(data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchRoutines();
    }, []);

    return (
        <div>
            <h1> Mis Rutinas </h1>
            <div className="rutinas-container">

                {rutinas.map((rutina) => (

                    <RoutineCard
                        key={rutina.id}
                        rutina={rutina}
                    />
                ))}

            </div>

        </div>


    )
}

export default RoutinesPage;
import { useEffect, useState } from "react";
import RutinaCard from "../components/RutinaCard.jsx";
import "../styles/RutinasPage.css";

function RutinasPage() {
    const [rutinas, setRutinas] = useState([]);

    useEffect(() => {
        async function fetchRutinas() {
            try {
                const response = await fetch("http://localhost:8081/rutinas");
                const data = await response.json();
                setRutinas(data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchRutinas();
    }, []);

    return (
        <div>
            <form>
                <input name="nombre" placeholder="nombre"/>
                <input name="descripcion" placeholder="descripcion"/>
                <input name="objetivo" placeholder="objetivo"/>
                <input name="nombre" placeholder="nombre"/>
                <button className="btn btn-primary">Guardar</button>
            </form>
            <div className="rutinas-container">

                {rutinas.map((rutina) => (

                    <RutinaCard
                        key={rutina.id}
                        rutina={rutina}
                    />
                ))}

            </div>

        </div>


    )
}

export default RutinasPage;
import { useEffect, useState } from "react";

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

            <h1>Rutinas</h1>

            {
                rutinas.map((rutina) => (

                    <div key={rutina.id}>

                        <h2>
                            {rutina.nombre}
                        </h2>

                        <p>
                            {rutina.descripcion}
                        </p>

                    </div>
                ))
            }

        </div>
    )
}

export default RutinasPage;
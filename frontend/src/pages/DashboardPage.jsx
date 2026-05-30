import {useEffect, useState} from "react";
import {Link} from "react-router-dom";



function DashboardPage() {
    const [rutinas, setRutinas] = useState([]);
    const [persona, setPersona] = useState(null);

    useEffect(() => {

        async function fetchData() {

            try {

                const response =
                    await fetch(
                        "http://localhost:8081/rutinas"
                    );

                const data =
                    await response.json();

                console.log(data);

                setRutinas(data);

            } catch (error) {

                console.log(error);
            }
            const personaStorage =
                JSON.parse(
                    localStorage.getItem("persona")
                );

            setPersona(personaStorage);
        }

        fetchData();

    }, []);


    return (

        <div>



            <p>
                Hola {persona?.nombre} 👋
            </p>

            <p>
                Tenés {rutinas.length} rutinas
            </p>

            <Link to="/rutinas">

                Ver Rutinas

            </Link>

        </div>
    )
}

export default DashboardPage;
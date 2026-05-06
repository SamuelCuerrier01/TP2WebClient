import {useEffect, useState} from "react";
import EvenementController from "./EvenementController.js";
import {Link, useNavigate, useParams} from "react-router-dom";

function EvenementDetails() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [evenement, setEvenement] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await EvenementController.getEvenementById(id);
            setEvenement(data);
        };
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (window.confirm("Supprimer cette evenement ?")) {
            try {
                await EvenementController.deleteEvenement(evenement.id);
                navigate('/evenements')
            } catch (err) {
                alert(err.message);
            }
        }
    };


    if (!evenement || Object.keys(evenement).length === 0) {
        return <div>Chargement des détails...</div>;
    }
    console.log(evenement)

    return (
        <>
            <div className="div-infos">
                <h2>
                    ID : {evenement.id}
                </h2>
                <h2>
                    Nom : {evenement.nom}
                </h2>
                <h2>
                    Date : {evenement.date_evenement}
                </h2>
                <h2>
                    Capacité : {evenement.capacite}
                </h2>
                <h2>
                    Prix : {evenement.prix}
                </h2>
            </div>
            <div>
                <Link to={`/evenements/edit/${evenement.id}`} state={{ evenement: evenement }}>
                    <button>Modifier</button>
                </Link>
                <Link to={`/evenements/${evenement.id}/visiteurs`}>
                    <button>Voir les visiteurs</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </>
    );
}

export default EvenementDetails;
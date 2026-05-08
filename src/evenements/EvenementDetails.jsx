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
    }, [id]);

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

    return (
        <div className="div-infos">
            <h2>{evenement.nom}</h2>
            <div className="details-card">
                <div className="details-row">
                    <span className="details-label">ID</span>
                    <span className="details-value">{evenement.id}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Nom</span>
                    <span className="details-value">{evenement.nom}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Date</span>
                    <span className="details-value">{evenement.date_evenement}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Capacité</span>
                    <span className="details-value">{evenement.capacite}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Prix</span>
                    <span className="details-value">{evenement.prix}</span>
                </div>
            </div>

            <div className="details-actions">
                <Link to={`/evenements/edit/${evenement.id}`} state={{ evenement: evenement }}>
                    <button className="edit-btn">Modifier</button>
                </Link>
                <Link to={`/evenements/${evenement.id}/visiteurs`}>
                    <button className="edit-btn">Voir les visiteurs</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </div>
    );
}

export default EvenementDetails;
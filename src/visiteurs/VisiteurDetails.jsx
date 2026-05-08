import {useEffect, useState} from "react";
import VisiteurController from "./VisiteurController.js";
import {Link, useNavigate, useParams} from "react-router-dom";

function VisiteurDetails() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [visiteur, setVisiteur] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await VisiteurController.getVisiteurById(id);
            setVisiteur(data);
        };
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (window.confirm("Supprimer cette visiteur ?")) {
            try {
                await VisiteurController.deleteVisiteur(visiteur.id);
                navigate('/visiteurs')
            } catch (err) {
                alert(err.message);
            }
        }
    };


    if (!visiteur || Object.keys(visiteur).length === 0) {
        return <div>Chargement des détails...</div>;
    }
    console.log(visiteur)

    return (
        <div className="div-infos">
            <h2>{visiteur.nom}</h2>
            <div className="details-card">
                <div className="details-row">
                    <span className="details-label">ID</span>
                    <span className="details-value">{visiteur.id}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Nom</span>
                    <span className="details-value">{visiteur.nom}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Email</span>
                    <span className="details-value">{visiteur.email}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Date de dernière visite</span>
                    <span className="details-value">{visiteur.date_derniere_visite}</span>
                </div>
            </div>

            <div className="details-actions">
                <Link to={`/visiteurs/edit/${visiteur.id}`} state={{ visiteur: visiteur }}>
                    <button className="edit-btn">Modifier</button>
                </Link>
                <Link to={`/visiteurs/${visiteur.id}/evenements`}>
                    <button className="edit-btn">Voir les évènements</button>
                </Link>
                <Link to={`/visiteurs/${visiteur.id}/tickets`}>
                    <button className="edit-btn">Voir les tickets</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </div>
    );
}

export default VisiteurDetails;
import {useEffect, useState} from "react";
import AttractionController from "./AttractionController.js";
import {Link, useNavigate, useParams} from "react-router-dom";

function AttractionDetails() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [attraction, setAttraction] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AttractionController.getAttractionById(id);
            setAttraction(data);
        };
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (window.confirm("Supprimer cette attraction ?")) {
            try {
                await AttractionController.deleteAttraction(attraction.id);
                navigate('/attractions')
            } catch (err) {
                alert(err.message);
            }
        }
    };


    if (!attraction || Object.keys(attraction).length === 0) {
        return <div>Chargement des détails...</div>;
    }

    return (
        <div className="div-infos">
            <h2>{attraction.nom}</h2>

            <div className="details-card">
                <div className="details-row">
                    <span className="details-label">ID</span>
                    <span className="details-value">{attraction.id}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Adresse</span>
                    <span className="details-value">{attraction.adresse}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Capacité</span>
                    <span className="details-value">{attraction.capacite}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Catégorie</span>
                    <span className="badge badge-purple">{attraction.categorie.nom}</span>
                </div>
            </div>

            <div className="details-actions">
                <Link to={`/attractions/edit/${attraction.id}`} state={{ attraction: attraction }}>
                    <button className="edit-btn">Modifier</button>
                </Link>
                <Link to={`/attractions/${attraction.id}/evenements`}>
                    <button className="edit-btn">Voir les événements</button>
                </Link>
                <button onClick={handleDelete} className="delete-btn">Supprimer</button>
            </div>
        </div>
    );
}

export default AttractionDetails;
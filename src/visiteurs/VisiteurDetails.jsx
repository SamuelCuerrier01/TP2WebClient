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
        <>
            <div className="div-infos">
                <h2>
                    ID : {visiteur.id}
                </h2>
                <h2>
                    Nom : {visiteur.nom}
                </h2>
                <h2>
                    Date : {visiteur.date_visiteur}
                </h2>
                <h2>
                    Capacité : {visiteur.capacite}
                </h2>
                <h2>
                    Prix : {visiteur.prix}
                </h2>
            </div>
            <div>
                <Link to={`/visiteurs/edit/${visiteur.id}`} state={{ visiteur: visiteur }}>
                    <button>Modifier</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </>
    );
}

export default VisiteurDetails;
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
    console.log(attraction)

    return (
        <>
            <div className="div-infos">
                <h2>
                    ID : {attraction.id}
                </h2>
                <h2>
                    Nom : {attraction.nom}
                </h2>
                <h2>
                    Capacité : {attraction.capacite}
                </h2>
                <h2>
                    Adresse : {attraction.adresse}
                </h2>
                <h2>
                    Catégorie : {attraction.categorie.nom}
                </h2>
            </div>
            <div>
                <Link to={`/attractions/edit/${attraction.id}`} state={{ attraction: attraction }}>
                    <button>Modifier</button>
                </Link>
                <Link to={`/attractions/${attraction.id}/evenements`}>
                    <button>Voir les événements</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </>
    );
}

export default AttractionDetails;
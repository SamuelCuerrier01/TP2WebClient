import {useEffect, useState} from "react";
import CategorieController from "./CategorieController.js";
import {Link, useNavigate, useParams} from "react-router-dom";

function CategorieDetails() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [categorie, setCategorie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await CategorieController.getCategorieById(id);
            setCategorie(data);
        };
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (window.confirm("Supprimer cette categorie ?")) {
            try {
                await CategorieController.deleteCategorie(categorie.id);
                navigate('/categories')
            } catch (err) {
                alert(err.message);
            }
        }
    };


    if (!categorie || Object.keys(categorie).length === 0) {
        return <div>Chargement des détails...</div>;
    }
    console.log(categorie)

    return (
        <div className="div-infos">
            <h2>{categorie.nom}</h2>

            <div className="details-card">
                <div className="details-row">
                    <span className="details-label">ID</span>
                    <span className="details-value">{categorie.id}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Nombre d'attractions</span>
                    <span className="details-value">{categorie.nombre_attractions}</span>
                </div>
            </div>

            <div className="details-actions">
                <Link to={`/categories/edit/${categorie.id}`} state={{ categorie: categorie }}>
                    <button className="edit-btn">Modifier</button>
                </Link>
                <Link to={`/categories/${categorie.id}/attractions`}>
                    <button className="edit-btn">Voir les attractions</button>
                </Link>
                <button onClick={handleDelete} className="delete-btn">Supprimer</button>
            </div>
        </div>
    );
}

export default CategorieDetails;
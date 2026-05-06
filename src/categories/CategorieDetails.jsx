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
        <>
            <div className="div-infos">
                <h2>
                    ID : {categorie.id}
                </h2>
                <h2>
                    Nom : {categorie.nom}
                </h2>
                <h2>
                    Nombre d'attractions : {categorie.nombre_attractions}
                </h2>
            </div>
            <div>
                <Link to={`/categories/edit/${categorie.id}`} state={{ categorie: categorie }}>
                    <button>Modifier</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </>
    );
}

export default CategorieDetails;
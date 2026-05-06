import { useEffect, useState } from "react";
import CategorieController from "../categories/CategorieController.js";
import AttractionController from "./AttractionController.js";
import {Link, useNavigate, useParams} from "react-router-dom";

function AttractionList() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(id){
                const json = await CategorieController.getAttractionByCategory(id);
                setAttractions(Array.isArray(json.data) ? json.data : []);
            } else {
                const json = await AttractionController.getAttractions();
                setAttractions(Array.isArray(json.data) ? json.data : []);
            }

        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette attraction ?")) {
            try {
                await AttractionController.deleteAttraction(id);
                setAttractions(attractions.filter(a => a.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <>
            <Link to={'/attractions/create'}><button>Créer</button></Link>

            <div id="main-container">
                <div id="details-panel">
                    <table id="attractions-list">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Adresse</th>
                            <th>Capacité</th>
                            <th>Catégorie</th>
                            <th>Fonctions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {attractions.map((a) => (
                            <tr onClick={() => navigate(`/attractions/${a.id}`)} key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.nom}</td>
                                <td>{a.adresse}</td>
                                <td>{a.capacite}</td>
                                <td>{a.categorie.nom}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/attractions/edit/${a.id}`} state={{ attraction: a }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(a.id)} className={'delete-btn'}>Suprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AttractionList;
import { useEffect, useState } from "react";
import CategorieController from "./CategorieController.js";
import { Link } from "react-router-dom";

function CategorieList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await CategorieController.getCategories();
            setCategories(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette catégorie ?")) {
            try {
                await CategorieController.deleteCategorie(id);
                setCategories(categories.filter(a => a.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <>
            <Link to={'/categories/create'}><button>Créer</button></Link>

            <div id="main-container">
                <div id="details-panel">
                    <table id="categories-list">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Nombre d'attractions</th>
                            <th>Fonctions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.nom}</td>
                                <td>{c.nombre_attractions}</td>
                                <td>
                                    <Link to={`/categories/edit/${c.id}`} state={{ categorie: c }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(c.id)} className={'delete-btn'}>Suprimer</button>
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

export default CategorieList;
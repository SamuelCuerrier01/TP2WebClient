import { useEffect, useState } from "react";
import CategorieController from "./CategorieController.js";
import {Link, useNavigate} from "react-router-dom";

function CategorieList() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState()

    async function handlePagination(url){
        const json = await CategorieController.getCategoriesByPage(url);
        setCategories(Array.isArray(json.data) ? json.data : []);
        setData(json);
        console.log(json)
    }

    useEffect(() => {
        const fetchData = async () => {
            const json = await CategorieController.getCategories();
            setCategories(Array.isArray(json.data) ? json.data : []);
            setData(json)
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
                            <tr onClick={() => navigate(`/categories/${c.id}`)} key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.nom}</td>
                                <td>{c.nombre_attractions}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/categories/edit/${c.id}`} state={{ categorie: c }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(c.id)} className={'delete-btn'}>Suprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={() => handlePagination(data.links.prev)}>previous</button>
                    <button onClick={() => handlePagination(data.links.next)}>next</button>
                </div>
            </div>
        </>
    );
}

export default CategorieList;
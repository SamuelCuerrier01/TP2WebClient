import { useEffect, useState } from "react";
import CategorieController from "./CategorieController.js";
import {Link, useNavigate} from "react-router-dom";
import SearchInput from "../SearchInput.jsx";

function CategorieList() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState()

    async function handlePagination(url){
        const json = await CategorieController.getCategoriesByPage(url);
        setCategories(Array.isArray(json.data) ? json.data : []);
        setData(json);
    }

    useEffect(() => {
        const fetchData = async () => {
            const json = await CategorieController.getCategories(search);
            setCategories(Array.isArray(json.data) ? json.data : []);
            setData(json)
        };
        fetchData();
    }, [search]);

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
            <div className="toolbar">
                <SearchInput value={search} onChange={setSearch} />
                <Link to="/categories/create">
                    <button className="btn-primary">+ Créer</button>
                </Link>
            </div>

            <div className="table-card">
                <div className="table-card-header">{categories.length} catégories</div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Nb attractions</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((c) => (
                        <tr onClick={() => navigate(`/categories/${c.id}`)} key={c.id}>
                            <td><span className="muted">{c.id}</span></td>
                            <td><strong>{c.nom}</strong></td>
                            <td>{c.nombre_attractions}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link to={`/categories/edit/${c.id}`} state={{ categorie: c }}>
                                    <button className="edit-btn">Modifier</button>
                                </Link>
                                <button onClick={() => handleDelete(c.id)} className="delete-btn">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>{categories.length} résultats</span>
                    <div className="pagination-btns">
                        <button
                            className="btn-page"
                            disabled={!data?.links?.prev}
                            onClick={() => handlePagination(data.links.prev)}>
                            ← Précédent
                        </button>
                        <button
                            className="btn-page"
                            disabled={!data?.links?.next}
                            onClick={() => handlePagination(data.links.next)}>
                            Suivant →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategorieList;
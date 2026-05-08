import { useEffect, useState } from "react";
import CategorieController from "../categories/CategorieController.js";
import AttractionController from "./AttractionController.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import SearchInput from "../SearchInput.jsx";

function AttractionList() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const { id } = useParams()
    const [attractions, setAttractions] = useState([]);
    const [data, setData] = useState()

    async function handlePagination(url){
        const json = await AttractionController.getAttractionsByPage(url);
        setAttractions(Array.isArray(json.data) ? json.data : []);
        setData(json);
    }

    useEffect(() => {
        const fetchData = async () => {
            let json;
            if(id){
                json = await CategorieController.getAttractionByCategory(id, search);

            } else {
                json = await AttractionController.getAttractions(search);
            }
            setAttractions(Array.isArray(json.data) ? json.data : []);
            setData(json);
        };
        fetchData();
    }, [id, search]);

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
            <div className="toolbar">
                <SearchInput value={search} onChange={setSearch} />
                <Link to="/attractions/create">
                    <button className="btn-primary">+ Créer</button>
                </Link>
            </div>

            <div className="table-card">
                <div className="table-card-header">{attractions.length} attractions</div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Capacité</th>
                        <th>Catégorie</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {attractions.map((a) => (
                        <tr onClick={() => navigate(`/attractions/${a.id}`)} key={a.id}>
                            <td><span className="muted">{a.id}</span></td>
                            <td><strong>{a.nom}</strong></td>
                            <td><span className="muted">{a.adresse}</span></td>
                            <td>{a.capacite}</td>
                            <td><span className="badge badge-purple">{a.categorie.nom}</span></td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link to={`/attractions/edit/${a.id}`} state={{ attraction: a }}>
                                    <button className="edit-btn">Modifier</button>
                                </Link>
                                <button onClick={() => handleDelete(a.id)} className="delete-btn">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>{attractions.length} résultats</span>
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

export default AttractionList;
import { useEffect, useState } from "react";
import VisiteurController from "./VisiteurController.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";
import SearchInput from "../SearchInput.jsx";

function VisiteurList() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [visiteurs, setVisiteurs] = useState([]);
    const [data, setData] = useState()
    const [search, setSearch] = useState("");

    async function handlePagination(url){
        const json = await VisiteurController.getVisiteursByPage(url);
        setVisiteurs(Array.isArray(json.data) ? json.data : []);
        setData(json);
    }

    useEffect(() => {
        const fetchData = async () => {
            let json;
            if(id){
                json = await EvenementController.getVisiteursByEvenement(id, search);

            } else {
                json = await VisiteurController.getVisiteurs(search);
            }
            setVisiteurs(Array.isArray(json.data) ? json.data : []);
            setData(json);
        };
        fetchData();
    }, [id, search]);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce visiteur ?")) {
            try {
                await VisiteurController.deleteVisiteur(id);
                setVisiteurs(visiteurs.filter(a => a.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };
    console.log(visiteurs);

    return (
        <>
            <div className="toolbar">
                <SearchInput value={search} onChange={setSearch} />
                <Link to="/visiteurs/create">
                    <button className="btn-primary">+ Créer</button>
                </Link>
            </div>

            <div className="table-card">
                <div className="table-card-header">{visiteurs.length} visiteurs</div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Dernière visite</th>
                        <th>Attraction</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiteurs.map((v) => (
                        <tr onClick={() => navigate(`/visiteurs/${v.id}`)} key={v.id}>
                            <td><span className="muted">{v.id}</span></td>
                            <td><strong>{v.nom}</strong></td>
                            <td><span className="muted">{v.email}</span></td>
                            <td><span className="muted">{v.date_derniere_visite}</span></td>
                            <td><span className="badge badge-blue">{v.attraction.nom}</span></td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link to={`/visiteurs/edit/${v.id}`} state={{ visiteur: v }}>
                                    <button className="edit-btn">Modifier</button>
                                </Link>
                                <button onClick={() => handleDelete(v.id)} className="delete-btn">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>{visiteurs.length} résultats</span>
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

export default VisiteurList;
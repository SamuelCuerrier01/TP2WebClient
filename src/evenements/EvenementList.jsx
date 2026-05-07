import {useEffect, useState} from "react";
import EvenementController from "./EvenementController.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import AttractionController from "../attractions/AttractionController.js";
import SearchInput from "../SearchInput.jsx";

function EvenementList() {
    const {id} = useParams();
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    const [evenements, setEvenements] = useState([]);
    const [data, setData] = useState()

    async function handlePagination(url){
        const json = await EvenementController.getEvenementsByPage(url);
        setEvenements(Array.isArray(json.data) ? json.data : []);
        setData(json);
        console.log(json)
    }

    useEffect(() => {
        const fetchData = async () => {
            let json;
            if(id){
                json = await AttractionController.getEvenementByAttraction(id, search);

            } else {
                json = await EvenementController.getEvenements(search);
            }
            setEvenements(Array.isArray(json.data) ? json.data : []);
            setData(json);
        };
        fetchData();
    }, [id, search]);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette catégorie ?")) {
            try {
                await EvenementController.deleteEvenement(id);
                setEvenements(evenements.filter(a => a.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };


    return (
        <>
            <div className="toolbar">
                <SearchInput value={search} onChange={setSearch} />
                <Link to="/evenements/create">
                    <button className="btn-primary">+ Créer</button>
                </Link>
            </div>

            <div className="table-card">
                <div className="table-card-header">{evenements.length} événements</div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Date</th>
                        <th>Capacité</th>
                        <th>Prix</th>
                        <th>Attraction</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {evenements.map((e) => (
                        <tr onClick={() => navigate(`/evenements/${e.id}`)} key={e.id}>
                            <td><span className="muted">{e.id}</span></td>
                            <td><strong>{e.nom}</strong></td>
                            <td><span className="muted">{e.date_evenement}</span></td>
                            <td>{e.capacite}</td>
                            <td><span className="badge badge-green">{e.prix}$</span></td>
                            <td><span className="badge badge-blue">{e.attraction.nom}</span></td>
                            <td onClick={(ev) => ev.stopPropagation()}>
                                <Link to={`/evenements/edit/${e.id}`} state={{ evenement: e }}>
                                    <button className="edit-btn">Modifier</button>
                                </Link>
                                <button onClick={() => handleDelete(e.id)} className="delete-btn">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>{evenements.length} résultats</span>
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

export default EvenementList;
import { useEffect, useState } from "react";
import VisiteurController from "./VisiteurController.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";
import TicketController from "../tickets/TicketController.js";

function VisiteurList() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [visiteurs, setVisiteurs] = useState([]);
    const [data, setData] = useState()

    async function handlePagination(url){
        const json = await VisiteurController.getVisiteursByPage(url);
        setVisiteurs(Array.isArray(json.data) ? json.data : []);
        setData(json);
    }

    useEffect(() => {
        const fetchData = async () => {
            if(id){
                const json = await EvenementController.getVisiteursByEvenement(id);
                setVisiteurs(Array.isArray(json.data) ? json.data : []);
                setData(json);
            } else {
                const json = await VisiteurController.getVisiteurs();
                setVisiteurs(Array.isArray(json.data) ? json.data : []);
                setData(json);
            }
        };
        fetchData();
    }, []);

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
            <Link to={'/visiteurs/create'}><button>Créer</button></Link>

            <div id="main-container">
                <div id="details-panel">
                    <table id="visiteurs-list">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Date de dernière visite</th>
                            <th>Attraction</th>
                            <th>Fonctions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visiteurs.map((v) => (
                            <tr onClick={() => navigate(`/visiteurs/${v.id}`)} key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.nom}</td>
                                <td>{v.email}</td>
                                <td>{v.date_derniere_visite}</td>
                                <td>{v.attraction.nom}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/visiteurs/edit/${v.id}`} state={{ visiteur: v }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(v.id)} className={'delete-btn'}>Suprimer</button>
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

export default VisiteurList;
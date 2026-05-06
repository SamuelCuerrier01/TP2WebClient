import { useEffect, useState } from "react";
import EvenementController from "./EvenementController.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import AttractionController from "../attractions/AttractionController.js";

function EvenementList() {
    const {id} = useParams()
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
            if (id) {
                const json = await AttractionController.getEvenementByAttraction(id);
                setEvenements(Array.isArray(json.data) ? json.data : []);
                setData(json);
            } else {
                const json = await EvenementController.getEvenements();
                setEvenements(Array.isArray(json.data) ? json.data : []);
                setData(json);
            }
        };
        fetchData();
    }, []);

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
            <Link to={'/evenements/create'}><button>Créer</button></Link>

            <div id="main-container">
                <div id="details-panel">
                    <table id="evenements-list">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Date</th>
                            <th>Capacité</th>
                            <th>Prix</th>
                            <th>Attraction</th>
                            <th>Fonctions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {evenements.map((e) => (
                            <tr onClick={() => navigate(`/evenements/${e.id}`)} key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.nom}</td>
                                <td>{e.date_evenement}</td>
                                <td>{e.capacite}</td>
                                <td>{e.prix}$</td>
                                <td>{e.attraction.nom}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/evenements/edit/${e.id}`} state={{ evenement: e }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(e.id)} className={'delete-btn'}>Suprimer</button>
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

export default EvenementList;
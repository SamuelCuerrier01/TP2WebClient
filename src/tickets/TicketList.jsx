import { useEffect, useState } from "react";
import TicketController from "./TicketController.js";
import {Link, useNavigate} from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";

function TicketList() {
    const navigate = useNavigate()
    const [tickets, setTickets] = useState([]);
    const [data, setData] = useState()

    async function handlePagination(url){
        const json = await TicketController.getTicketsByPage(url);
        setTickets(Array.isArray(json.data) ? json.data : []);
        setData(json);
    }

    useEffect(() => {
        const fetchData = async () => {
            const json = await TicketController.getTickets();
            setTickets(Array.isArray(json.data) ? json.data : []);
            setData(json);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette catégorie ?")) {
            try {
                await TicketController.deleteTicket(id);
                setTickets(tickets.filter(a => a.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };
    console.log(tickets);

    return (
        <>
            <Link to={'/tickets/create'}><button>Créer</button></Link>

            <div id="main-container">
                <div id="details-panel">
                    <table id="tickets-list">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date d'achat</th>
                            <th>Évenement</th>
                            <th>Visiteur</th>
                            <th>Fonctions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((t) => (
                            <tr onClick={() => navigate(`/tickets/${t.id}`)} key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.date_achat}</td>
                                <td>{t.evenement.nom}</td>
                                <td>{t.visiteur.nom}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/tickets/edit/${t.id}`} state={{ ticket: t }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(t.id)} className={'delete-btn'}>Suprimer</button>
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

export default TicketList;
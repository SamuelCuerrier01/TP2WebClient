import { useEffect, useState } from "react";
import TicketController from "./TicketController.js";
import {Link, useNavigate} from "react-router-dom";

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

    return (
        <>
            <div className="toolbar">
                <span />
                <Link to="/tickets/create">
                    <button className="btn-primary">+ Créer</button>
                </Link>
            </div>

            <div className="table-card">
                <div className="table-card-header">{tickets.length} tickets</div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date d'achat</th>
                        <th>Événement</th>
                        <th>Visiteur</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((t) => (
                        <tr onClick={() => navigate(`/tickets/${t.id}`)} key={t.id}>
                            <td><span className="muted">{t.id}</span></td>
                            <td><span className="muted">{t.date_achat}</span></td>
                            <td><span className="badge badge-purple">{t.evenement.nom}</span></td>
                            <td><strong>{t.visiteur.nom}</strong></td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link to={`/tickets/edit/${t.id}`} state={{ ticket: t }}>
                                    <button className="edit-btn">Modifier</button>
                                </Link>
                                <button onClick={() => handleDelete(t.id)} className="delete-btn">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>{tickets.length} résultats</span>
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

export default TicketList;
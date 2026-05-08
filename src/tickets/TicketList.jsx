import { useEffect, useState } from "react";
import TicketController from "./TicketController.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import VisiteurController from "../visiteurs/VisiteurController.js";
import SearchInput from "../SearchInput.jsx";

function TicketList() {
    const navigate = useNavigate()
    const [tickets, setTickets] = useState([]);
    const [data, setData] = useState()
    const { id } = useParams()
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    async function handlePagination(url){
        const json = await TicketController.getTicketsByPage(url, dateDebut, dateFin);
        setTickets(Array.isArray(json.data) ? json.data : []);
        setData(json);
    }

    useEffect(() => {
        const fetchData = async () => {
            let json;
            if(id){
                json = await VisiteurController.getTicketsByVisiteur(id, dateDebut, dateFin);

            } else {
                json = await TicketController.getTickets(dateDebut, dateFin);
            }
            setTickets(Array.isArray(json.data) ? json.data : []);
            setData(json);
        };
        fetchData();
    }, [id, dateDebut, dateFin]);

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
            <SearchInput value={dateDebut} onChange={setDateDebut} placeholder={"Tickets à partir de cette date"}/>
            <SearchInput value={dateFin} onChange={setDateFin} placeholder={"Tickets avant cette date"}/>

            <div className="toolbar">
                <span />
                <Link to="/tickets/create">
                    <button className="btn-primary">+ Créer</button>
                </Link>
            </div>

            <div className="table-card">
                <div className="table-card-header">{data?.meta?.total ?? 0} tickets</div>
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
import {useEffect, useState} from "react";
import TicketController from "./TicketController.js";
import {Link, useNavigate, useParams} from "react-router-dom";

function TicketDetails() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await TicketController.getTicketById(id);
            setTicket(data);
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Supprimer cette ticket ?")) {
            try {
                await TicketController.deleteTicket(ticket.id);
                navigate('/tickets')
            } catch (err) {
                alert(err.message);
            }
        }
    };


    if (!ticket || Object.keys(ticket).length === 0) {
        return <div>Chargement des détails...</div>;
    }

    return (
        <div className="div-infos">
            <h2>Ticket numero {ticket.id}</h2>
            <div className="details-card">
                <div className="details-row">
                    <span className="details-label">ID</span>
                    <span className="details-value">{ticket.id}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Nom de l'évènement</span>
                    <span className="details-value">{ticket.evenement.nom}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Date de l'évènement</span>
                    <span className="details-value">{ticket.evenement.date_evenement}</span>
                </div>
                <div className="details-row">
                    <span className="details-label">Visiteur</span>
                    <span className="details-value">{ticket.visiteur.nom}</span>
                </div>
            </div>

            <div className="details-actions">
                <Link to={`/tickets/edit/${ticket.id}`} state={{ ticket: ticket }}>
                    <button className="edit-btn">Modifier</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </div>
    );
}

export default TicketDetails;
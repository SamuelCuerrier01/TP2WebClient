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
    }, []);

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
    console.log(ticket)

    return (
        <>
            <div className="div-infos">
                <h2>
                    ID : {ticket.id}
                </h2>
                <h2>
                    Nom : {ticket.nom}
                </h2>
                <h2>
                    Date : {ticket.date_ticket}
                </h2>
                <h2>
                    Capacité : {ticket.capacite}
                </h2>
                <h2>
                    Prix : {ticket.prix}
                </h2>
            </div>
            <div>
                <Link to={`/tickets/edit/${ticket.id}`} state={{ ticket: ticket }}>
                    <button>Modifier</button>
                </Link>
                <button onClick={() => handleDelete()} className={'delete-btn'}>Suprimer</button>
            </div>
        </>
    );
}

export default TicketDetails;
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TicketController from "../tickets/TicketController.js";
import {useEffect, useState} from "react";
import EvenementController from "../evenements/EvenementController.js";
import VisiteurController from "../visiteurs/VisiteurController.js";

function TicketEdit() {

    const [evenements, setEvenements] = useState([]);
    const [visiteurs, setVisiteurs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataEvenements = await EvenementController.getEvenements();
            setEvenements(Array.isArray(dataEvenements) ? dataEvenements : []);
            const dataVisiteurs = await VisiteurController.getVisiteurs();
            setVisiteurs(Array.isArray(dataVisiteurs) ? dataVisiteurs : []);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const ticket = location.state?.ticket;
    console.log(ticket);
    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await TicketController.editTicket(concentratedData);
            navigate("/tickets");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleEdit}>
                <label htmlFor="evenement_id">Évenement:</label>
                <select name="evenement_id" required>
                    <option value="" disabled selected hidden>Choisir une Option...</option>
                    {evenements.map((e) => (
                        <option key={e.id} value={e.id}>{e.nom}</option>
                    ))}
                </select>


                <label htmlFor="visiteur_id">Visiteur:</label>
                <select name="visiteur_id" required>
                    <option value="" disabled selected hidden>Choisir une Option...</option>
                    {visiteurs.map((v) => (
                        <option key={v.id} value={v.id}>{v.nom}</option>
                    ))}
                </select>

                <label htmlFor="evenement_id">Date d'achat:</label>
                <input type="date" name="date_achat" value={ticket.date_achat} required/>

                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default TicketEdit;
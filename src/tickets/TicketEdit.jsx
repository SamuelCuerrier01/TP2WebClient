import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TicketController from "../tickets/TicketController.js";
import {useEffect, useState} from "react";
import EvenementController from "../evenements/EvenementController.js";
import VisiteurController from "../visiteurs/VisiteurController.js";
import ErrorBar from "../ErrorBar.jsx";

function TicketEdit() {
    const [evenements, setEvenements] = useState([]);
    const [visiteurs, setVisiteurs] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const jsonEvenements = await EvenementController.getEvenements();
            setEvenements(Array.isArray(jsonEvenements.data) ? jsonEvenements.data : []);
            const jsonVisiteurs = await VisiteurController.getVisiteurs();
            setVisiteurs(Array.isArray(jsonVisiteurs.data) ? jsonVisiteurs.data : []);
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
            if (err.errors) {
                setError(Object.values(err.errors).flat());
            } else {
                setError(["Erreur serveur ou réseau"]);
            }
        }
    };

    return (
        <div className="div-infos">
            <ErrorBar error={error} />

            <h2 style={{ margin: "0 0 1rem" }}>Modifier un ticket</h2>
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <input type="hidden" name="id" value={ticket.id} />

                <div className="form-group">
                    <label htmlFor="evenement_id">Événement</label>
                    <select id="evenement_id" name="evenement_id" required>
                        <option value="" disabled hidden>Choisir une option...</option>
                        {evenements.map((e) => (
                            <option key={e.id} value={e.id}>{e.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="visiteur_id">Visiteur</label>
                    <select id="visiteur_id" name="visiteur_id" required>
                        <option value="" disabled hidden>Choisir une option...</option>
                        {visiteurs.map((v) => (
                            <option key={v.id} value={v.id}>{v.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date_achat">Date d'achat</label>
                    <input id="date_achat" type="date" name="date_achat" defaultValue={ticket.date_achat} required />
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default TicketEdit;
import { useNavigate } from "react-router-dom";
import TicketController from "../tickets/TicketController.js";
import {useEffect, useState} from "react";
import EvenementController from "../evenements/EvenementController.js";
import VisiteurController from "../visiteurs/VisiteurController.js";
import ErrorBar from "../ErrorBar.jsx";

function TicketCreate() {
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
    const handleCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await TicketController.createTicket(concentratedData);
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

            <h2 style={{ margin: "0 0 1rem" }}>Créer un ticket</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

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
                    <input id="date_achat" type="date" name="date_achat" required />
                </div>

                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export default TicketCreate;
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function EvenementEdit() {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const json = await AttractionController.getAttractions();
            setAttractions(Array.isArray(json.data) ? json.data : []);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const evenement = location.state?.evenement;
    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        for (const [key, value] of formData.entries()) {
            if (!key || value.trim().length === 0){
                alert("aucun champs ne dois être vide ou rempli d'espaces");
                return;
            }
        }
        try {
            await EvenementController.editEvenement(concentratedData);
            navigate("/evenements");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="div-infos">
            <h2 style={{ margin: "0 0 1rem" }}>Modifier un événement</h2>
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <input type="hidden" name="id" value={evenement.id} />

                <div className="form-group">
                    <label htmlFor="date_evenement">Date</label>
                    <input id="date_evenement" type="date" name="date_evenement" defaultValue={evenement.date_evenement} required />
                </div>

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" defaultValue={evenement.nom} required />
                </div>

                <div className="form-group">
                    <label htmlFor="capacite">Capacité</label>
                    <input id="capacite" type="number" name="capacite" defaultValue={evenement.capacite} required />
                </div>

                <div className="form-group">
                    <label htmlFor="prix">Prix</label>
                    <input id="prix" type="number" name="prix" defaultValue={evenement.prix} required />
                </div>

                <div className="form-group">
                    <label htmlFor="attraction_id">Attraction</label>
                    <select id="attraction_id" name="attraction_id" required>
                        <option value="" disabled hidden>Choisir une option...</option>
                        {attractions.map((a) => (
                            <option key={a.id} value={a.id}>{a.nom}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default EvenementEdit;
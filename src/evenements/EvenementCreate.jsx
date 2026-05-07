import { useNavigate } from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function EvenementCreate() {

    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const json = await AttractionController.getAttractions();
            setAttractions(Array.isArray(json.data) ? json.data : []);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await EvenementController.createEvenement(concentratedData);
            navigate("/evenements");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="div-infos">
            <h2 style={{ margin: "0 0 1rem" }}>Créer un événement</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <div className="form-group">
                    <label htmlFor="date_evenement">Date</label>
                    <input id="date_evenement" type="date" name="date_evenement" required />
                </div>

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" required />
                </div>

                <div className="form-group">
                    <label htmlFor="capacite">Capacité</label>
                    <input id="capacite" type="number" name="capacite" required />
                </div>

                <div className="form-group">
                    <label htmlFor="prix">Prix</label>
                    <input id="prix" type="number" name="prix" required />
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

                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export default EvenementCreate;
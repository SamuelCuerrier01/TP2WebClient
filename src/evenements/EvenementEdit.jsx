import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function EvenementEdit() {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AttractionController.getAttractions();
            setAttractions(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const evenement = location.state?.evenement;
    console.log(evenement);
    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await EvenementController.editEvenement(concentratedData);
            navigate("/evenements");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleEdit}>
                <input type="hidden" name="id" value={evenement.id} />

                <label htmlFor="date_evenement">Date:</label>
                <input name="date_evenement" defaultValue={evenement.date_evenement} required/>

                <label htmlFor="nom">Nom:</label>
                <input name="nom" defaultValue={evenement.nom}/>

                <label htmlFor="capacite">Capacite:</label>
                <input type="number" name="capacite" defaultValue={evenement.capacite} required/>

                <label htmlFor="prix">Prix:</label>
                <input type="number" name="prix" defaultValue={evenement.prix} required/>

                <select name="attraction_id" required>
                    <option value="" disabled selected hidden>Choisir une Option...</option>
                    {attractions.map((a) => (
                        <option key={a.id} value={a.id}>{a.nom}</option>
                    ))}
                </select>

                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default EvenementEdit;
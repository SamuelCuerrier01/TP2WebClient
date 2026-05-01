import { useNavigate } from "react-router-dom";
import EvenementController from "../evenements/EvenementController.js";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function EvenementCreate() {

    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AttractionController.getAttractions();
            setAttractions(Array.isArray(data) ? data : []);
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
        <>
            <form onSubmit={handleCreate}>
                <label htmlFor="date_evenement">Date:</label>
                <input type="date" name="date_evenement" required/>

                <label htmlFor="nom">Nom:</label>
                <input name="nom" required/>

                <label htmlFor="capacite">Capacite:</label>
                <input type="number" name="capacite" required/>

                <label htmlFor="prix">Prix:</label>
                <input type="number" name="prix" required/>

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

export default EvenementCreate;
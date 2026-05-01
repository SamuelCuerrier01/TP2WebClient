import VisiteurController from "./VisiteurController.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function VisiteurCreate() {
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
            await VisiteurController.createVisiteur(concentratedData);
            navigate("/visiteurs");
        } catch (err) {
            console.error(err);
        }
    };
    console.log(attractions);

    return (
        <>
            <form onSubmit={handleCreate}>
                <input type="hidden" name="id" />

                <label htmlFor="nom">Nom:</label>
                <input name="nom" required/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" required/>

                <label htmlFor="date_derniere_visite">Date de dernière visite:</label>
                <input type="date" name="date_derniere_visite" required/>

                <label htmlFor="attraction">Attraction:</label>
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

export default VisiteurCreate;
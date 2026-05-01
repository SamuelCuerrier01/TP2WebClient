import VisiteurController from "./VisiteurController.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function VisiteurEdit() {
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
    const visiteur = location.state?.visiteur;
    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await VisiteurController.editVisiteur(concentratedData);
            navigate("/visiteurs");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleEdit}>
                <input type="hidden" name="id" value={visiteur.id} />

                <label htmlFor="nom">Nom:</label>
                <input name="nom" defaultValue={visiteur.nom} required/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" defaultValue={visiteur.email} required/>

                <label htmlFor="date_derniere_visite">Date de dernière visite:</label>
                <input type="date" name="date_derniere_visite" defaultValue={visiteur.date_derniere_visite} required/>

                <label htmlFor="attraction_id">Attraction:</label>
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

export default VisiteurEdit;
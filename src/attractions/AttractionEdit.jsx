import AttractionController from "./AttractionController.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import CategorieController from "../categories/CategorieController.js";

function AttractionEdit() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await CategorieController.getCategories();
            setCategories(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const attraction = location.state?.attraction;
    console.log(attraction);
    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await AttractionController.editAttraction(concentratedData);
            navigate("/attractions");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleEdit}>
                <input type="hidden" name="id" value={attraction.id} />
                <label htmlFor="nom">Nom:</label>
                <input name="nom" defaultValue={attraction.nom} required/>
                <label htmlFor="adresse">Adresse:</label>
                <input name="adresse" defaultValue={attraction.adresse} required/>
                <label htmlFor="capacite">Capacité:</label>
                <input type="number" name="capacite" defaultValue={attraction.capacite} required/>
                <select name="categorie_id" required>
                    <option value="" disabled selected hidden>Choisir une Option...</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.nom}</option>
                    ))}
                </select>
                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default AttractionEdit;
import AttractionController from "./AttractionController.js";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import CategorieController from "../categories/CategorieController.js";

function AttractionCreate() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await CategorieController.getCategories();
            setCategories(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await AttractionController.createAttraction(concentratedData);
            navigate("/attractions");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleCreate}>
                <label htmlFor="nom">Nom:</label>
                <input name="nom" required/>
                <label htmlFor="adresse">Adresse:</label>
                <input name="adresse" required/>
                <label htmlFor="capacite">Capacité:</label>
                <input type="number" name="capacite" required/>
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

export default AttractionCreate;
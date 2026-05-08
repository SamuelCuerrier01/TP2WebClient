import AttractionController from "./AttractionController.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import CategorieController from "../categories/CategorieController.js";
import ErrorBar from "../ErrorBar.jsx";

function AttractionEdit() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const json = await CategorieController.getCategories();
            setCategories(Array.isArray(json.data) ? json.data : []);
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

            <h2 style={{ margin: "0 0 1rem" }}>Modifier une attraction</h2>
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <input type="hidden" name="id" value={attraction.id} />

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" defaultValue={attraction.nom} required />
                </div>

                <div className="form-group">
                    <label htmlFor="adresse">Adresse</label>
                    <input id="adresse" name="adresse" defaultValue={attraction.adresse} required />
                </div>

                <div className="form-group">
                    <label htmlFor="capacite">Capacité</label>
                    <input id="capacite" type="number" name="capacite" defaultValue={attraction.capacite} required />
                </div>

                <div className="form-group">
                    <label htmlFor="categorie_id">Catégorie</label>
                    <select id="categorie_id" name="categorie_id" required>
                        <option value="" disabled hidden>Choisir une option...</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.nom}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default AttractionEdit;
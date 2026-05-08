import { useNavigate } from "react-router-dom";
import CategorieController from "../categories/CategorieController.js";
import {useState} from "react";
import ErrorBar from "../ErrorBar.jsx";

function CategorieCreate() {

    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const handleCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        for (const [key, value] of formData.entries()) {
            if (!key || value.trim().length === 0){
                alert("aucun champs ne dois être vide ou rempli d'espaces");
                return;
            }
            if (key == 'nom' && value.length < 3 || value.length > 50){
                alert("le nom doit être compris entre 3 et 50 charactères");
                return;
            }
        }
        try {
            await CategorieController.createCategorie(concentratedData);
            navigate("/categories");
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

            <h2 style={{ margin: "0 0 1rem" }}>Créer une catégorie</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" required />
                </div>

                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export default CategorieCreate;
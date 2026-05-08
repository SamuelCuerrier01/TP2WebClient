import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CategorieController from "../categories/CategorieController.js";
import {useState} from "react";
import ErrorBar from "../ErrorBar.jsx";

function CategorieEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState([]);
    const categorie = location.state?.categorie;
    console.log(categorie);
    const handleEdit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await CategorieController.editCategorie(concentratedData);
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

            <h2 style={{ margin: "0 0 1rem" }}>Modifier une catégorie</h2>
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <input type="hidden" name="id" value={categorie.id} />

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" defaultValue={categorie.nom} required />
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default CategorieEdit;
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CategorieController from "../categories/CategorieController.js";

function CategorieEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const categorie = location.state?.categorie;
    const handleEdit = async (event) => {
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
            await CategorieController.editCategorie(concentratedData);
            navigate("/categories");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="div-infos">
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
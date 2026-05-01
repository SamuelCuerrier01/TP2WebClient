import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CategorieController from "../categories/CategorieController.js";

function CategorieEdit() {
    const navigate = useNavigate();
    const location = useLocation();
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
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleEdit}>
                <input type="hidden" name="id" value={categorie.id} />
                <label htmlFor="nom">Nom:</label>
                <input name="nom" defaultValue={categorie.nom} required/>
                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default CategorieEdit;
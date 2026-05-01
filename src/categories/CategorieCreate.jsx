import { useNavigate } from "react-router-dom";
import CategorieController from "../categories/CategorieController.js";

function CategorieCreate() {

    const navigate = useNavigate();
    const handleCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        try {
            await CategorieController.createCategorie(concentratedData);
            navigate("/categories");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleCreate}>
                <label htmlFor="nom">Nom:</label>
                <input name="nom" required/>
                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default CategorieCreate;
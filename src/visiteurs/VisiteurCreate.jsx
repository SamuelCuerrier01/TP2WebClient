import VisiteurController from "./VisiteurController.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";
import ErrorBar from "../ErrorBar.jsx";

function VisiteurCreate() {
    const [attractions, setAttractions] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const json = await AttractionController.getAttractions();
            setAttractions(Array.isArray(json.data) ? json.data : []);
        };
        fetchData();
    }, []);
    const navigate = useNavigate();
    const handleCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const concentratedData = Object.fromEntries(formData.entries());
        for (const [key, value] of formData.entries()) {
            if (!key || value.trim().length === 0){
                alert("aucun champs ne dois être vide ou rempli d'espaces");
                return;
            }
            if (key == 'nom' && value.length > 255){
                alert("le nom ne doit pas dépasser 255 charactères");
                return;
            }
            if (key == 'email' && (value.length > 255 || !value.includes('@')|| !value.includes('.'))){
                alert("le email ne doit pas dépasser 255 charactères et doit contenir un @ ainsi qu'un point");
                return;
            }
            if (key == 'date_derniere_visite'){
                const date = new Date(value.toString());
                if(date > new Date()){
                    alert("La date ne peux pas être dans le futur");
                    return
                }
            }
        }
        try {
            await VisiteurController.createVisiteur(concentratedData);
            navigate("/visiteurs");
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

            <h2 style={{ margin: "0 0 1rem" }}>Créer un visiteur</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="date_derniere_visite">Date de dernière visite</label>
                    <input id="date_derniere_visite" type="date" name="date_derniere_visite" required />
                </div>

                <div className="form-group">
                    <label htmlFor="attraction_id">Attraction</label>
                    <select id="attraction_id" name="attraction_id" required>
                        <option value="" disabled hidden>Choisir une option...</option>
                        {attractions.map((a) => (
                            <option key={a.id} value={a.id}>{a.nom}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export default VisiteurCreate;
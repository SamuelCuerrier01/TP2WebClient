import VisiteurController from "./VisiteurController.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import AttractionController from "../attractions/AttractionController.js";

function VisiteurEdit() {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const json = await AttractionController.getAttractions();
            setAttractions(Array.isArray(json.data) ? json.data : []);
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
            await VisiteurController.editVisiteur(concentratedData);
            navigate("/visiteurs");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="div-infos">
            <h2 style={{ margin: "0 0 1rem" }}>Modifier un visiteur</h2>
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <input type="hidden" name="id" value={visiteur.id} />

                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" defaultValue={visiteur.nom} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" defaultValue={visiteur.email} required />
                </div>

                <div className="form-group">
                    <label htmlFor="date_derniere_visite">Date de dernière visite</label>
                    <input id="date_derniere_visite" type="date" name="date_derniere_visite" defaultValue={visiteur.date_derniere_visite} required />
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

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default VisiteurEdit;
import { useEffect, useState } from "react";
import VisiteurController from "./VisiteurController.js";
import { Link } from "react-router-dom";

function VisiteurList() {
    const [visiteurs, setVisiteurs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await VisiteurController.getVisiteurs();
            setVisiteurs(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce visiteur ?")) {
            try {
                await VisiteurController.deleteVisiteur(id);
                setVisiteurs(visiteurs.filter(a => a.id !== id));
            } catch (err) {
                alert(err.message);
            }
        }
    };
    console.log(visiteurs);

    return (
        <>
            <Link to={'/visiteurs/create'}><button>Créer</button></Link>

            <div id="main-container">
                <div id="details-panel">
                    <table id="visiteurs-list">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Date de dernière visite</th>
                            <th>Attraction</th>
                            <th>Fonctions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visiteurs.map((v) => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.nom}</td>
                                <td>{v.email}</td>
                                <td>{v.date_derniere_visite}</td>
                                <td>{v.attraction.nom}</td>
                                <td>
                                    <Link to={`/visiteurs/edit/${v.id}`} state={{ visiteur: v }}>
                                        <button>Modifier</button>
                                    </Link>
                                    <button onClick={() => handleDelete(v.id)} className={'delete-btn'}>Suprimer</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default VisiteurList;
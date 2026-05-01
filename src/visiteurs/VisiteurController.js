import {API_ENDPOINTS_VISITEURS} from "../config/config.js";


export default class VisiteurController {

    static async getVisiteurs() {
        const response = await fetch(API_ENDPOINTS_VISITEURS.getEntries(), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async deleteVisiteur(id) {
        const response = await fetch(API_ENDPOINTS_VISITEURS.deleteEntry(id), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur suppression");
    }

    static async createVisiteur(data) {
        const response = await fetch(API_ENDPOINTS_VISITEURS.createEntry(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        console.log(response);
    }

    static async editVisiteur(data) {
        await fetch(API_ENDPOINTS_VISITEURS.updateEntry(data.id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

}
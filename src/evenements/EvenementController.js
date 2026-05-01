import { API_ENDPOINTS_EVENEMENTS} from "../config/config.js";


export default class EvenementController {

    static async getEvenements() {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.getEntries(), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async deleteEvenement(id) {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.deleteEntry(id), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur suppression");
    }

    static async createEvenement(data) {
        await fetch(API_ENDPOINTS_EVENEMENTS.createEntry(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    static async editEvenement(data) {
        await fetch(API_ENDPOINTS_EVENEMENTS.updateEntry(data.id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

}
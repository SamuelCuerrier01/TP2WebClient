import { API_ENDPOINTS_ATTRACTIONS } from "../config/config.js";


export default class AttractionController {

    static async getAttractions() {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.getEntries(), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async deleteAttraction(id) {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.deleteEntry(id), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur suppression");
    }

    static async createAttraction(data) {
        await fetch(API_ENDPOINTS_ATTRACTIONS.createEntry(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    static async editAttraction(data) {
        await fetch(API_ENDPOINTS_ATTRACTIONS.updateEntry(data.id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

}
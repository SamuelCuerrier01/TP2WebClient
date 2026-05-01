import { API_ENDPOINTS_CATEGORIES } from "../config/config.js";


export default class EvenementController {

    static async getCategories() {
        const response = await fetch(API_ENDPOINTS_CATEGORIES.getEntries(), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async deleteCategorie(id) {
        const response = await fetch(API_ENDPOINTS_CATEGORIES.deleteEntry(id), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur suppression");
    }

    static async createCategorie(data) {
        await fetch(API_ENDPOINTS_CATEGORIES.createEntry(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    static async editCategorie(data) {
        await fetch(API_ENDPOINTS_CATEGORIES.updateEntry(data.id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

}
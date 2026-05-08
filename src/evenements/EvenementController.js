import { API_ENDPOINTS_EVENEMENTS} from "../config/config.js";


export default class EvenementController {

    static async getEvenements(search = "") {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.getEntries(search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getAllEvenements() {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.getAllEntries(), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async getEvenementsByPage(url, search = "") {
        if (search.trim() !== "") {
            const separator = url.includes("?") ? "&" : "?";
            url = `${url}${separator}nom=${encodeURIComponent(search)}`;
        }
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getVisiteursByEvenement(id, search) {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.getVisiteurs(id, search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getEvenementById(id) {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.getEntry(id), {
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
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.createEntry(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const json = await response.json();
            const error = new Error("Erreur API");
            error.errors = json.errors;
            throw error;
        }
    }

    static async editEvenement(data) {
        const response = await fetch(API_ENDPOINTS_EVENEMENTS.updateEntry(data.id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const json = await response.json();
            const error = new Error("Erreur API");
            error.errors = json.errors;
            throw error;
        }
    }

}
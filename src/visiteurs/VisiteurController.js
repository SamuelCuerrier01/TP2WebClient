import {API_ENDPOINTS_VISITEURS} from "../config/config.js";


export default class VisiteurController {

    static async getVisiteurs(search = "") {
        const response = await fetch(API_ENDPOINTS_VISITEURS.getEntries(search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }
    static async getAllVisiteurs() {
        const response = await fetch(API_ENDPOINTS_VISITEURS.getAllEntries(), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async getVisiteursByPage(url, search = "") {
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

    static async getVisiteurById(id) {
        const response = await fetch(API_ENDPOINTS_VISITEURS.getEntry(id), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async getEvenementsByVisiteur(id, search) {
        const response = await fetch(API_ENDPOINTS_VISITEURS.getEvenements(id, search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getTicketsByVisiteur(id, date_debut, date_fin) {
        const response = await fetch(API_ENDPOINTS_VISITEURS.getTickets(id, date_debut, date_fin), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
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

        if (!response.ok) {
            const json = await response.json();
            const error = new Error("Erreur API");
            error.errors = json.errors;
            throw error;
        }
    }

    static async editVisiteur(data) {
        const response = await fetch(API_ENDPOINTS_VISITEURS.updateEntry(data.id), {
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
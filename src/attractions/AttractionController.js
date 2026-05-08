import { API_ENDPOINTS_ATTRACTIONS } from "../config/config.js";


export default class AttractionController {

    static async getAttractions(search = "") {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.getEntries(search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getAttractionsByPage(url, search = "") {
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

    static async getEvenementByAttraction(id, search) {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.getEvenements(id, search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getAttractionById(id) {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.getEntry(id), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async getAllAtractions() {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.getAllEntries(), {
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
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.createEntry(), {
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

    static async editAttraction(data) {
        const response = await fetch(API_ENDPOINTS_ATTRACTIONS.updateEntry(data.id), {
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
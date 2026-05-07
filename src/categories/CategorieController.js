import { API_ENDPOINTS_CATEGORIES } from "../config/config.js";


export default class CategorieControllerController {

    static async getCategories(search = "") {
        const response = await fetch(API_ENDPOINTS_CATEGORIES.getEntries(search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getCategoriesByPage(url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getAttractionByCategory(id, search) {
        const response = await fetch(API_ENDPOINTS_CATEGORIES.getAttractions(id, search), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }


    static async getCategorieById(id) {
        const response = await fetch(API_ENDPOINTS_CATEGORIES.getEntry(id), {
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
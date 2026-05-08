import { API_ENDPOINTS_TICKETS } from "../config/config.js";


export default class TicketController {

    static async getTickets(dateDebut = "", dateFin = "") {
        const response = await fetch(API_ENDPOINTS_TICKETS.getEntries(dateDebut, dateFin), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getTicketsByPage(url, dateDebut = "", dateFin = "") {
        if((!dateDebut || dateDebut === "") && (!dateFin || dateFin === "")) {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) throw new Error("Erreur API");
            return await response.json();
        }

        const separator = url.includes("?") ? "&" : "?";
        const params = [];
        if (dateDebut.trim() !== "") params.push(`date_debut=${encodeURIComponent(dateDebut)}`);
        if (dateFin.trim() !== "") params.push(`date_fin=${encodeURIComponent(dateFin)}`);

        const fullUrl = `${url}${separator}${params.join("&")}`;
        const response = await fetch(fullUrl);
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    }

    static async getTicketById(id) {
        const response = await fetch(API_ENDPOINTS_TICKETS.getEntry(id), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur API");
        const json = await response.json();
        return json.data;
    }

    static async deleteTicket(id) {
        const response = await fetch(API_ENDPOINTS_TICKETS.deleteEntry(id), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Erreur suppression");
    }

    static async createTicket(data) {
        const response = await fetch(API_ENDPOINTS_TICKETS.createEntry(), {
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

    static async editTicket(data) {
        const response = await fetch(API_ENDPOINTS_TICKETS.updateEntry(data.id), {
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
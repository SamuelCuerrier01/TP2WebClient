import { API_ENDPOINTS_TICKETS } from "../config/config.js";


export default class TicketController {

    static async getTickets() {
        const response = await fetch(API_ENDPOINTS_TICKETS.getEntries(), {
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
        await fetch(API_ENDPOINTS_TICKETS.createEntry(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    static async editTicket(data) {
        await fetch(API_ENDPOINTS_TICKETS.updateEntry(data.id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

}
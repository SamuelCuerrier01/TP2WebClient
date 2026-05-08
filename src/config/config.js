import { parseISO, isValid } from "date-fns";

const BASE_URL = "http://localhost/api";
export const API_ENDPOINTS_ATTRACTIONS = {
    getEntries: (name = "") => `${BASE_URL}/attractions${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`,
    getEntry: (id) => `${BASE_URL}/attractions/${id}`,
    getAllEntries: () => `${BASE_URL}/attractions/all`,
    createEntry: () => `${BASE_URL}/attractions`,
    updateEntry: (id) => `${BASE_URL}/attractions/${id}`,
    deleteEntry: (id) => `${BASE_URL}/attractions/${id}`,
    getEvenements: (id, name = "") => `${BASE_URL}/attractions/${id}/evenements${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`
};

export const API_ENDPOINTS_VISITEURS = {
    getEntries: (name = "") => `${BASE_URL}/visiteurs${name.trim() !== "" ? 
        `?nom=${encodeURIComponent(name)}` : ""}`,
    getEntry: (id) => `${BASE_URL}/visiteurs/${id}`,
    getAllEntries: () => `${BASE_URL}/visiteurs/all`,
    createEntry: () => `${BASE_URL}/visiteurs`,
    updateEntry: (id) => `${BASE_URL}/visiteurs/${id}`,
    deleteEntry: (id) => `${BASE_URL}/visiteurs/${id}`,
    getEvenements: (id, name = "") => `${BASE_URL}/visiteurs/${id}/evenements${name.trim() !== "" ?
            `?nom=${encodeURIComponent(name)}` : ""}`,
    getTickets: (id, dateDebut = "", dateFin = "") => {
        const params = [];
        if (isValid(parseISO(dateDebut))) {
            params.push(`date_debut=${encodeURIComponent(dateDebut)}`);
        }
        if (isValid(parseISO(dateFin))) {
            params.push(`date_fin=${encodeURIComponent(dateFin)}`);
        }
        const query = params.length ? `?${params.join("&")}` : "";
        return `${BASE_URL}/visiteurs/${id}/tickets${query}`;
    }

};

export const API_ENDPOINTS_CATEGORIES = {
    getEntries: (name = "") => `${BASE_URL}/categories${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`,
    getEntry: (id) => `${BASE_URL}/categories/${id}`,
    getAllEntries: () => `${BASE_URL}/categories/all`,
    createEntry: () => `${BASE_URL}/categories`,
    updateEntry: (id) => `${BASE_URL}/categories/${id}`,
    deleteEntry: (id) => `${BASE_URL}/categories/${id}`,
    getAttractions: (id, name = "") => `${BASE_URL}/categories/${id}/attractions${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`,
};

export const API_ENDPOINTS_EVENEMENTS = {
    getEntries: (name = "") => `${BASE_URL}/evenements${name.trim() !== "" ? 
        `?nom=${encodeURIComponent(name)}` : ""}`,
    getEntry: (id) => `${BASE_URL}/evenements/${id}`,
    getAllEntries: () => `${BASE_URL}/evenements/all`,
    createEntry: () => `${BASE_URL}/evenements`,
    updateEntry: (id) => `${BASE_URL}/evenements/${id}`,
    deleteEntry: (id) => `${BASE_URL}/evenements/${id}`,
    getVisiteurs: (id, name = "") => `${BASE_URL}/evenements/${id}/visiteurs${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`
};

export const API_ENDPOINTS_TICKETS = {
    getEntries: (dateDebut = "", dateFin = "") => {
        const params = [];
        if (isValid(parseISO(dateDebut))) {
            params.push(`date_debut=${encodeURIComponent(dateDebut)}`);
        }
        if (isValid(parseISO(dateFin))) {
            params.push(`date_fin=${encodeURIComponent(dateFin)}`);
        }

        const query = params.length ? `?${params.join("&")}` : "";
        return `${BASE_URL}/tickets${query}`;
    },
    getEntry: (id) => `${BASE_URL}/tickets/${id}`,
    createEntry: () => `${BASE_URL}/tickets`,
    updateEntry: (id) => `${BASE_URL}/tickets/${id}`,
    deleteEntry: (id) => `${BASE_URL}/tickets/${id}`
};



export const MESSAGES = {
    fetchError: "Erreur récupération des tâches",
    createError: "Erreur création",
    updateError: "Erreur modification",
    deleteError: "Erreur suppression",
    searchHistory: "Historique"
};
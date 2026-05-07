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
    createEntry: () => `${BASE_URL}/visiteurs`,
    updateEntry: (id) => `${BASE_URL}/visiteurs/${id}`,
    deleteEntry: (id) => `${BASE_URL}/visiteurs/${id}`
};

export const API_ENDPOINTS_CATEGORIES = {
    getEntries: (name = "") => `${BASE_URL}/categories${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`,
    getEntry: (id) => `${BASE_URL}/categories/${id}`,
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
    createEntry: () => `${BASE_URL}/evenements`,
    updateEntry: (id) => `${BASE_URL}/evenements/${id}`,
    deleteEntry: (id) => `${BASE_URL}/evenements/${id}`,
    getVisiteurs: (id, name = "") => `${BASE_URL}/evenements/${id}/visiteurs${name.trim() !== "" ?
        `?nom=${encodeURIComponent(name)}` : ""}`
};

export const API_ENDPOINTS_TICKETS = {
    getEntries: () => `${BASE_URL}/tickets`,
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
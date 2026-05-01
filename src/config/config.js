const BASE_URL = "http://localhost/api";
export const API_ENDPOINTS_ATTRACTIONS = {
    getEntries: () => `${BASE_URL}/attractions`,
    createEntry: () => `${BASE_URL}/attractions`,
    updateEntry: (id) => `${BASE_URL}/attractions/${id}`,
    deleteEntry: (id) => `${BASE_URL}/attractions/${id}`
};

export const API_ENDPOINTS_VISITEURS = {
    getEntries: () => `${BASE_URL}/visiteurs`,
    createEntry: () => `${BASE_URL}/visiteurs`,
    updateEntry: (id) => `${BASE_URL}/visiteurs/${id}`,
    deleteEntry: (id) => `${BASE_URL}/visiteurs/${id}`
};

export const API_ENDPOINTS_CATEGORIES = {
    getEntries: () => `${BASE_URL}/categories`,
    createEntry: () => `${BASE_URL}/categories`,
    updateEntry: (id) => `${BASE_URL}/categories/${id}`,
    deleteEntry: (id) => `${BASE_URL}/categories/${id}`
};

export const API_ENDPOINTS_EVENEMENTS = {
    getEntries: () => `${BASE_URL}/evenements`,
    createEntry: () => `${BASE_URL}/evenements`,
    updateEntry: (id) => `${BASE_URL}/evenements/${id}`,
    deleteEntry: (id) => `${BASE_URL}/evenements/${id}`
};

export const API_ENDPOINTS_TICKETS = {
    getEntries: () => `${BASE_URL}/tickets`,
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
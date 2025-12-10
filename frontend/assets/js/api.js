// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Helper Functions
class API {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('token');
    }

    // Set auth token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Remove auth token
    removeToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Get headers
    getHeaders(includeAuth = false) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (includeAuth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: this.getHeaders(options.auth !== false)
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth methods
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            auth: false
        });
    }

    async login(credentials) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            auth: false
        });
        
        if (data.data && data.data.token) {
            this.setToken(data.data.token);
        }
        
        return data;
    }

    async logout() {
        const data = await this.request('/auth/logout', {
            method: 'POST'
        });
        this.removeToken();
        return data;
    }

    async getMe() {
        return this.request('/auth/me');
    }

    // Pet methods
    async getAllPets() {
        return this.request('/pets');
    }

    async getPet(id) {
        return this.request(`/pets/${id}`);
    }

    async createPet(petData) {
        return this.request('/pets', {
            method: 'POST',
            body: JSON.stringify(petData)
        });
    }

    async updatePet(id, petData) {
        return this.request(`/pets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(petData)
        });
    }

    async deletePet(id) {
        return this.request(`/pets/${id}`, {
            method: 'DELETE'
        });
    }

    // Vaccination methods
    async getUpcomingVaccinations() {
        return this.request('/vaccinations/upcoming');
    }

    async getPetVaccinations(petId) {
        return this.request(`/vaccinations/pet/${petId}`);
    }

    async createVaccination(vaccinationData) {
        return this.request('/vaccinations', {
            method: 'POST',
            body: JSON.stringify(vaccinationData)
        });
    }

    async updateVaccination(id, vaccinationData) {
        return this.request(`/vaccinations/${id}`, {
            method: 'PUT',
            body: JSON.stringify(vaccinationData)
        });
    }

    async deleteVaccination(id) {
        return this.request(`/vaccinations/${id}`, {
            method: 'DELETE'
        });
    }

    // User methods
    async getUserProfile() {
        return this.request('/users/profile');
    }

    async updateUserProfile(profileData) {
        return this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    }

    // Health check
    async healthCheck() {
        return this.request('/health', { auth: false });
    }
}

// Create and export API instance
const api = new API();

// Check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Logout and redirect
function logoutUser() {
    api.logout().then(() => {
        window.location.href = '/index.html';
    }).catch(error => {
        console.error('Logout error:', error);
        // Remove token anyway
        api.removeToken();
        window.location.href = '/index.html';
    });
}

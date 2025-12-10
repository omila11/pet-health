// Dashboard functionality

document.addEventListener('DOMContentLoaded', async function() {
    // Check authentication
    if (!requireAuth()) {
        return;
    }

    try {
        // Load user data
        await loadUserData();
        
        // Load pets
        await loadPets();
        
        // Load upcoming vaccinations
        await loadUpcomingVaccinations();
        
        // Setup event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Dashboard initialization error:', error);
        if (error.message.includes('token') || error.message.includes('authorized')) {
            alert('Session expired. Please login again.');
            window.location.href = 'login.html';
        }
    }
});

async function loadUserData() {
    try {
        const response = await api.getMe();
        const user = response.data.user;
        
        // Update UI with user data
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = user.fullName;
        }
        
    } catch (error) {
        console.error('Error loading user data:', error);
        throw error;
    }
}

async function loadPets() {
    try {
        const response = await api.getAllPets();
        const pets = response.data.pets;
        
        displayPets(pets);
        
    } catch (error) {
        console.error('Error loading pets:', error);
    }
}

async function loadUpcomingVaccinations() {
    try {
        const response = await api.getUpcomingVaccinations();
        const vaccinations = response.data.vaccinations;
        
        displayUpcomingVaccinations(vaccinations);
        
    } catch (error) {
        console.error('Error loading vaccinations:', error);
    }
}

function displayPets(pets) {
    const petsContainer = document.querySelector('.pets-container');
    
    if (!petsContainer) return;
    
    if (pets.length === 0) {
        petsContainer.innerHTML = '<p>No pets added yet. Add your first pet!</p>';
        return;
    }
    
    petsContainer.innerHTML = pets.map(pet => `
        <div class="pet-card" data-pet-id="${pet._id}">
            <h3>${pet.name}</h3>
            <p>Species: ${pet.species}</p>
            <p>Breed: ${pet.breed || 'Not specified'}</p>
            <p>Age: ${calculateAge(pet.dateOfBirth)} years</p>
            <div class="pet-actions">
                <button class="btn-view" onclick="viewPet('${pet._id}')">View</button>
                <button class="btn-edit" onclick="editPet('${pet._id}')">Edit</button>
                <button class="btn-delete" onclick="deletePet('${pet._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function displayUpcomingVaccinations(vaccinations) {
    const vaccinationsContainer = document.querySelector('.vaccinations-container');
    
    if (!vaccinationsContainer) return;
    
    if (vaccinations.length === 0) {
        vaccinationsContainer.innerHTML = '<p>No upcoming vaccinations</p>';
        return;
    }
    
    vaccinationsContainer.innerHTML = vaccinations.map(vaccination => `
        <div class="vaccination-card">
            <h4>${vaccination.pet.name} - ${vaccination.vaccineName}</h4>
            <p>Due Date: ${formatDate(vaccination.nextDueDate)}</p>
            <p>Type: ${vaccination.vaccineType}</p>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Logout button
    const logoutBtn = document.querySelector('.dash[href="#"]');
    if (logoutBtn && logoutBtn.textContent.includes('Logout')) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logoutUser();
            }
        });
    }
}

function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

async function viewPet(petId) {
    window.location.href = `pet-details.html?id=${petId}`;
}

async function editPet(petId) {
    // Implement edit functionality
    console.log('Edit pet:', petId);
}

async function deletePet(petId) {
    if (!confirm('Are you sure you want to delete this pet?')) {
        return;
    }
    
    try {
        await api.deletePet(petId);
        alert('Pet deleted successfully');
        await loadPets();
    } catch (error) {
        alert('Error deleting pet: ' + error.message);
    }
}

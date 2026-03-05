// Base de données locale
const plantsData = [
    { id: 1, name: "Lavande Vraie", cat: "apaisant", region: "Provence", coords: [44.15, 5.40], img: "https://upload.wikimedia.org/wikipedia/commons/9/93/Lavandula-angustifolia-flowering.JPG", desc: "Idéale pour calmer les irritations cutanées." },
    { id: 2, name: "Chanvre Bio", cat: "hydratant", region: "Bretagne", coords: [48.20, -2.93], img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Chanvre.jpg", desc: "Huile riche en oméga-3 pour une peau souple." },
    { id: 3, name: "Calendula", cat: "apaisant", region: "Anjou", coords: [47.47, -0.55], img: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Calendula_officinalis1.jpg", desc: "Le soin par excellence des peaux fragiles." },
    { id: 4, name: "Immortelle", cat: "anti-age", region: "Corse", coords: [42.15, 9.12], img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Helichrysum_italicum_subsp_microphyllum_g08.jpg", desc: "Stimule la régénération cellulaire." },
    { id: 5, name: "Huile essentielle de sapin pectiné au Drôme", cat: "apaisant", region: "Drôme", coords: [44.73, 5.37], img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Illustration_Abies_alba0_clean.jpg", desc: "Huile essentielle de sapin pectiné reconnue pour ses notes fraîches et réconfortantes." },
    { id: 6, name: "Huile essentielle de Sapin pectiné en Lozère", cat: "apaisant", region: "Lozère", coords: [44.52, 3.50], img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Illustration_Abies_alba0_clean.jpg", desc: "Variété locale de sapin pectiné utilisée dans des formules cosmétiques naturelles." },
    { id: 7, name: "Le myrte en Provence", cat: "anti-age", region: "Provence", coords: [43.95, 5.64], img: "https://upload.wikimedia.org/wikipedia/commons/d/d0/%28MHNT%29_Myrtus_communis_subsp._tarentina.jpg", desc: "Le myrte est apprécié pour ses propriétés tonifiantes et purifiantes." }
];

// Initialisation Carte
const map = L.map('map').setView([46.603354, 1.888334], 5.5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 20
}).addTo(map);

let markers = [];

// Fonction pour afficher les cartes
function displayPlants(data) {
    const grid = document.getElementById('plantsGrid');
    grid.innerHTML = '';
    
    // Nettoyer les anciens marqueurs
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    data.forEach(p => {
        // Ajouter à la grille
        const card = `
            <div class="plant-card">
                <div class="plant-img" style="background-image: url('${p.img}')"></div>
                <div class="plant-info">
                    <span class="tag">${p.cat}</span>
                    <h3>${p.name}</h3>
                    <p>${p.region}</p>
                    <p style="font-size: 0.8rem; color: #666;">${p.desc}</p>
                </div>
            </div>
        `;
        grid.innerHTML += card;

        // Ajouter Marqueur
        const marker = L.marker(p.coords).addTo(map)
            .bindPopup(`<b>${p.name}</b><br>${p.region}`);
        markers.push(marker);
    });
}

// Filtres
function filterByCategory(category) {
    // Gestion visuelle des boutons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if(category === 'tous') {
        displayPlants(plantsData);
    } else {
        const filtered = plantsData.filter(p => p.cat === category);
        displayPlants(filtered);
    }
}

// Recherche textuelle
function filterPlants() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = plantsData.filter(p => p.name.toLowerCase().includes(query));
    displayPlants(filtered);
}

// Lancement initial
displayPlants(plantsData);
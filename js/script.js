// 1. Base de datos de productos
const productos = [
    { id: 'czar', nombre: 'CZAR 9K', precio: '$9.99', img: 'assets/czar.png' },
    { id: 'fume', nombre: 'FUME Nicky Jam 10K', precio: '$9.99', img: 'assets/FumeNickyJam.png' },
    { id: 'snoopy', nombre: 'Snoopysmoke 15K', precio: '$11.99', img: 'assets/SnoopySmoke.png' },
    { id: 'privbar', nombre: 'Priv Bar 15K', precio: '$11.99', img: 'assets/privbar.png' },
    { id: 'lostmary', nombre: 'Lost Mary 5K', precio: '$7.99', img: 'assets/lostmary.png' }
];


// 2. Función del Buscador con Desplegable
function buscarVape() {
    const input = document.getElementById('vapeSearch').value.toLowerCase();
    const dropdown = document.getElementById('search-results');
    
    if (input.length === 0) {
        dropdown.style.display = "none";
        return;
    }

    const resultados = productos.filter(p => p.nombre.toLowerCase().includes(input));

    if (resultados.length > 0) {
        dropdown.style.display = "block";
        // CAMBIO AQUÍ: color cambiado de #ff0 a #00f2ff
// ... dentro de la función buscarVape, donde resultados.length > 0 ...
        dropdown.innerHTML = '<div class="dropdown-header">PRODUCTOS ENCONTRADOS</div>';

        resultados.forEach(p => {
            const item = document.createElement('div');
            item.className = 'search-item';
            item.onclick = () => verDetalle(p.id);
            item.innerHTML = `
                <div class="search-img-card">
                    <img src="${p.img}" alt="${p.nombre}">
                </div>
                <div class="search-item-info">
                    <span class="search-name">${p.nombre}</span>
                    <span class="search-price">${p.precio}</span>
                </div>
                <div class="search-arrow">→</div>
            `;
            dropdown.appendChild(item);
        });
    } else {
        dropdown.style.display = "none";
    }
}

// 3. Ver Detalle
function verDetalle(id) {
    window.location.href = `producto.html?v=${id}`;
}

// 4. Slider
function moveSlider(direction) {
    const slider = document.getElementById('product-slider');
    const card = document.querySelector('.product-card');
    if (card) {
        const scrollAmount = card.clientWidth + 20;
        slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
}

// Cerrar buscador al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        document.getElementById('search-results').style.display = "none";
    }
});

function filtrar(cat) {
    // Actualizar botones
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    // Corregido: añadir event como parámetro o usar event global
    if(event) event.target.classList.add('active');

    const cards = document.getElementsByClassName('product-card');
    for (let card of cards) {
        const name = card.getAttribute('data-name').toLowerCase();
        if (cat === 'todos' || name.includes(cat)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Cerrar buscador y menú al hacer clic fuera
document.addEventListener('click', (e) => {
    const searchResults = document.getElementById('search-results');
    const navLinks = document.getElementById('navLinks');
    
    // Si hace clic fuera del buscador, cerrar resultados
    if (!e.target.closest('.search-box')) {
        searchResults.style.display = "none";
    }
    
    // Si hace clic fuera del menú móvil, cerrar menú
    if (!e.target.closest('.main-nav')) {
        navLinks.classList.remove('active');
    }
});
console.log("Scripts carregado!");

// Exibe ou oculta o menu de temas
function toggleThemeMenu() {
    const themeMenu = document.querySelector('.theme-menu');
    themeMenu.style.display = themeMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Aplica tema Inatel
function tema_inatel() {
    document.documentElement.style.setProperty('--message-box-background', '#ffffff');
    document.documentElement.style.setProperty('--line-message-box-background', '#ffffff');
    document.documentElement.style.setProperty('--md-sys-color-primary-container', '#316BE8');
    document.documentElement.style.setProperty('--md-sys-color-on-primary-container', '#FFFFFF');
    document.documentElement.style.setProperty('--aulas-background', '#1D27B1');
    document.documentElement.style.setProperty('--aulas-color', '#FFFFFF');
    document.documentElement.style.setProperty('--background-color', '#1D27B1');
    document.documentElement.style.setProperty('--body-color', '#000000');
    document.documentElement.style.setProperty('--card-color', '#FFFFFF');
    document.documentElement.style.setProperty('--card-text-color', '#000000');
    document.documentElement.style.setProperty('--lable-note', '#ffffff');
    document.documentElement.style.setProperty('--icon-logo-color', '#ffffff');
    document.documentElement.style.setProperty('--icon-box-color', '#1d27b1');
    document.documentElement.style.setProperty('--theme-menu-bg', '#ffffff');
    document.documentElement.style.setProperty('--theme-menu-text', '#000000');
    document.documentElement.style.setProperty('--theme-menu-button', '#1d27b1');
    document.documentElement.style.setProperty('--theme-menu-button-hover', '#0048a8');
    document.documentElement.style.setProperty('--theme-menu-button-text', '#ffffff');
    document.documentElement.style.setProperty('--theme-toggle-bg', '#ccc');
    document.documentElement.style.setProperty('--theme-toggle-thumb', '#ffffff');
    document.documentElement.style.setProperty('--theme-toggle-active', '#1d27b1');
}

// Aplica tema Escuro
function tema_dark() {
    document.documentElement.style.setProperty('--message-box-background', '#252C63');
    document.documentElement.style.setProperty('--line-message-box-background', '#252C63');
    document.documentElement.style.setProperty('--md-sys-color-primary-container', '#ffffff');
    document.documentElement.style.setProperty('--md-sys-color-on-primary-container', '#FFFFFF');
    document.documentElement.style.setProperty('--aulas-background', '#0C1139');
    document.documentElement.style.setProperty('--aulas-color', '#4C548E');
    document.documentElement.style.setProperty('--background-color', '#000000');
    document.documentElement.style.setProperty('--body-color', '#FFFFFF');
    document.documentElement.style.setProperty('--card-color', '#252C63');
    document.documentElement.style.setProperty('--card-text-color', '#FFFFFF');
    document.documentElement.style.setProperty('--lable-note', '#0C1139');
    document.documentElement.style.setProperty('--icon-logo-color', '#FFFFFF');
    document.documentElement.style.setProperty('--icon-box-color', '#FFFFFF');
    document.documentElement.style.setProperty('--cor-texto-nota', '#ffffff');
    document.documentElement.style.setProperty('--theme-menu-bg', '#1a1a1a');
    document.documentElement.style.setProperty('--theme-menu-text', '#ffffff');
    document.documentElement.style.setProperty('--theme-menu-button', '#316be8');
    document.documentElement.style.setProperty('--theme-menu-button-hover', '#0048a8');
    document.documentElement.style.setProperty('--theme-menu-button-text', '#ffffff');
    document.documentElement.style.setProperty('--theme-toggle-bg', '#333');
    document.documentElement.style.setProperty('--theme-toggle-thumb', '#ffffff');
    document.documentElement.style.setProperty('--theme-toggle-active', '#4c8dff');
}

// Lista de eventos
const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

// Cria os cards no carrossel
function createCards() {
    const carousel = document.querySelector('.carousel');
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p class="linha-icones">
                    <span class="material-symbols-outlined icone-conteudo">event</span>
                    ${event.date} às ${event.time}
                    <span class="material-symbols-outlined icone-conteudo">pin_drop</span>
                    ${event.location}
                </p>
            </div>
        `;
        carousel.appendChild(card);
    });
    updateCarousel();
}

// Navegação no carrossel
let intervalId;
let index = 0;

function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Inicialização ao carregar DOM
document.addEventListener("DOMContentLoaded", () => {
    // Aplica ícones em todos os locais
    document.querySelectorAll('.carousel .material-symbols-outlined, .comp-aula .material-symbols-outlined, .mensagens .material-symbols-outlined').forEach(icon => {
        icon.classList.add('icone-conteudo');
    });

    // Inicializa carrossel
    createCards();

    const carousel = document.querySelector('.carousel');
    document.getElementById('nextBtn').addEventListener('click', nextCard);
    document.getElementById('prevBtn').addEventListener('click', prevCard);

    intervalId = setInterval(nextCard, 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', () => intervalId = setInterval(nextCard, 5000));

    // Toque em celular
    let startX;
    carousel.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextCard();
        if (endX - startX > 50) prevCard();
    });

    // Listener do botão deslizante de tema
    const switchInput = document.getElementById('theme-switch');
    if (switchInput) {
        switchInput.addEventListener('change', () => {
            if (switchInput.checked) {
                tema_dark();
            } else {
                tema_inatel();
            }
        });
    }

    // Ativa tema padrão
    tema_inatel();
});

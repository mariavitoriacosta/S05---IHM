console.log("Scripts carregado!");
// Aqui voc� pode adicionar funcionalidades interativas se desejar.
function toggleThemeMenu() {
    const themeMenu = document.querySelector('.theme-menu');
    themeMenu.style.display = themeMenu.style.display === 'flex' ? 'none' : 'flex';
}

function setTheme(theme) {
    const content = document.querySelector('.content');
    const body = document.querySelector('body');

    // Remover classes anteriores
    body.classList.remove('inatel', 'dark');
    content.classList.remove('inatel', 'dark');

    // Adicionar a classe do tema selecionado
    if (theme === 'inatel') {
        body.classList.add('inatel');
        content.classList.add('inatel');
    } else if (theme === 'dark') {
        body.classList.add('dark');
        content.classList.add('dark');
    }

    // Fechar o menu de temas
    document.querySelector('.theme-menu').style.display = 'none';
}

function tema_inatel() {
    document.documentElement.style.setProperty('--message-box-background', '#AFBFDC');
    document.documentElement.style.setProperty('--line-message-box-background', '#FFFFFF');
    document.documentElement.style.setProperty('--md-sys-color-primary-container', '#316BE8');
    document.documentElement.style.setProperty('--md-sys-color-on-primary-container', '#FFFFFF');
    document.documentElement.style.setProperty('--aulas-background', '#1D27B1');
    document.documentElement.style.setProperty('--aulas-color', '#FFFFFF');
    document.documentElement.style.setProperty('--noticias-color', '#87A4DB');
    document.documentElement.style.setProperty('--background-color', '#FFFFFF');
    document.documentElement.style.setProperty('--body-color', '#1D27B1');
    document.documentElement.style.setProperty('--card-color', '#FFFFFF');
    document.documentElement.style.setProperty('--card-text-color', '#1D27B1');
    document.documentElement.style.setProperty('--lable-note', '#ffffff');
}

function tema_dark() {
    document.documentElement.style.setProperty('--message-box-background', '#020833');
    document.documentElement.style.setProperty('--line-message-box-background', '#252C63');
    document.documentElement.style.setProperty('--md-sys-color-primary-container', '#000000');
    document.documentElement.style.setProperty('--md-sys-color-on-primary-container', '#FFFFFF');
    document.documentElement.style.setProperty('--aulas-background', '#0C1139');
    document.documentElement.style.setProperty('--aulas-color', '#4C548E');
    document.documentElement.style.setProperty('--noticias-color', '#0C1139');
    document.documentElement.style.setProperty('--background-color', '#000000');
    document.documentElement.style.setProperty('--body-color', '#FFFFFF');
    document.documentElement.style.setProperty('--card-color', '#252C63');
    document.documentElement.style.setProperty('--card-text-color', '#FFFFFF');
    document.documentElement.style.setProperty('--lable-note', '#0C1139');
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

const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');



// Fun��o para criar os cards
function createCards() {
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
    // Atualize a lista de cards ap�s a cria��o
    updateCarousel();
}

document.addEventListener("DOMContentLoaded", () => {
    // Aplica classe aos ícones material-symbols-outlined que estão dentro do carrossel
    document.querySelectorAll('.carousel .material-symbols-outlined').forEach(icon => {
        icon.classList.add('icone-conteudo');
    });

    // Aplica classe também aos ícones dentro de cards de aula/notícias (se necessário)
    document.querySelectorAll('.comp-aula .material-symbols-outlined, .mensagens .material-symbols-outlined').forEach(icon => {
        icon.classList.add('icone-conteudo');
    });
});


let intervalId;
let index = 0;

window.onload = () => {
    createCards();

    const carousel = document.querySelector('.carousel');

    // Botões de navegação
    document.getElementById('nextBtn').addEventListener('click', nextCard);
    document.getElementById('prevBtn').addEventListener('click', prevCard);

    // Inicia rotação automática
    intervalId = setInterval(nextCard, 5000);

    // Pausar quando mouse estiver sobre o carrossel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    // Retomar quando mouse sair
    carousel.addEventListener('mouseleave', () => {
        intervalId = setInterval(nextCard, 5000);
    });

    // Arrastar no celular
    let startX;
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextCard();
        if (endX - startX > 50) prevCard();
    });
};

// Funções de navegação e atualização
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

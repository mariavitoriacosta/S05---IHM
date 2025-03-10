console.log("Wireframe com as novas mudanças carregado!");
// Aqui você pode adicionar funcionalidades interativas se desejar.
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
    document.documentElement.style.setProperty('--message-box-background', '#0800EB');
    document.documentElement.style.setProperty('--line-message-box-background', '#31A5E8');
    document.documentElement.style.setProperty('--md-sys-color-primary-container', '#316BE8');
    document.documentElement.style.setProperty('--md-sys-color-on-primary-container', '#FFFFFF');
    document.documentElement.style.setProperty('--aulas-background', '#782BEB');
    document.documentElement.style.setProperty('--aulas-color', '#A8BDEB');
    document.documentElement.style.setProperty('--noticias-color', '#316BE8');
    document.documentElement.style.setProperty('--background-color', '#A8BDEB');
}

function tema_dark() {
    document.documentElement.style.setProperty('--message-box-background', '#020833');
    document.documentElement.style.setProperty('--line-message-box-background', '#252C63');
    document.documentElement.style.setProperty('--md-sys-color-primary-container', '#000000');
    document.documentElement.style.setProperty('--md-sys-color-on-primary-container', '#FFFFFF');
    document.documentElement.style.setProperty('--aulas-background', '#0C1139');
    document.documentElement.style.setProperty('--aulas-color', '#4C548E');
    document.documentElement.style.setProperty('--noticias-color', '#1C234F');
    document.documentElement.style.setProperty('--background-color', '#000000');
}

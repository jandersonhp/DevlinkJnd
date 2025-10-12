// Navegação entre páginas
document.addEventListener('DOMContentLoaded', function () {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetPage = this.getAttribute('data-page');

            // Atualiza botões ativos
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Atualiza páginas ativas
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });
        });
    });

    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = originalText;
});
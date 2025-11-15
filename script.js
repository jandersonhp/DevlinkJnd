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

    // Modal para imagens expandidas
    initializeImageModal();
});

// Função para inicializar o modal de imagens
function initializeImageModal() {
    // Cria o elemento do modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-loading">Carregando...</div>
        <img class="modal-content" src="" alt="">
    `;

    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close-modal');
    const loading = modal.querySelector('.modal-loading');

    // Adiciona evento de clique nas imagens
    document.querySelectorAll('.clickable-img img').forEach(img => {
        img.addEventListener('click', function () {
            const imageSrc = this.getAttribute('data-src') || this.src;
            openModal(imageSrc);
        });
    });

    // Função para abrir o modal
    function openModal(imageSrc) {
        loading.style.display = 'block';
        modalImg.style.display = 'none';
        modal.style.display = 'block';

        // Previne scroll no body quando o modal está aberto
        document.body.style.overflow = 'hidden';

        // Carrega a imagem
        const image = new Image();
        image.onload = function () {
            modalImg.src = imageSrc;
            modalImg.alt = 'Imagem expandida';
            loading.style.display = 'none';
            modalImg.style.display = 'block';
        };

        image.onerror = function () {
            loading.textContent = 'Erro ao carregar imagem';
            setTimeout(() => {
                closeModal();
            }, 2000);
        };

        image.src = imageSrc;
    }

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalImg.src = '';
    }

    // Event listeners para fechar o modal
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}
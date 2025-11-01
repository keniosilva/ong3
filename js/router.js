// js/router.js

/**
 * Objeto de rotas que mapeia o caminho (pathname) para o arquivo HTML correspondente.
 * A chave é o pathname e o valor é o nome do arquivo HTML.
 */
const routes = {
    '/': 'index.html',
    '/index.html': 'index.html',
    '/projetos.html': 'projetos.html',
    '/cadastro.html': 'cadastro.html'
};

/**
 * Carrega o conteúdo da página HTML correspondente à rota.
 * @param {string} path - O caminho da rota (ex: '/cadastro.html').
 */
async function loadContent(path) {
    const fileName = routes[path];
    if (!fileName) {
        console.error(`Rota não encontrada para o caminho: ${path}`);
        return;
    }

    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo ${fileName}: ${response.statusText}`);
        }
        const html = await response.text();
        
        // Cria um elemento temporário para extrair o conteúdo da tag <main>
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMainContent = doc.querySelector('main.container').innerHTML;
        const newTitle = doc.querySelector('title').textContent;

        // Atualiza o conteúdo da tag <main> na página atual
        const mainContainer = document.querySelector('main.container');
        if (mainContainer) {
            mainContainer.innerHTML = newMainContent;
            document.title = newTitle;
            
            // Dispara um evento para que outros módulos saibam que o conteúdo foi carregado
            document.dispatchEvent(new CustomEvent('contentLoaded', { detail: { path } }));
        } else {
            console.error('Elemento <main class="container"> não encontrado.');
        }

    } catch (error) {
        console.error('Falha ao carregar o conteúdo:', error);
    }
}

/**
 * Manipula a navegação do SPA.
 * @param {string} path - O caminho para onde navegar.
 * @param {boolean} pushState - Se deve adicionar um novo estado ao histórico do navegador.
 */
function navigate(path, pushState = true) {
    // Corrige o path para garantir que ele esteja no formato correto para o objeto routes
    let normalizedPath = path;
    if (normalizedPath === '/') {
        normalizedPath = '/index.html';
    } else if (!normalizedPath.endsWith('.html')) {
        // Se for um path sem extensão, assume que é o nome do arquivo
        normalizedPath = `/${normalizedPath}.html`;
    }

    if (routes[normalizedPath]) {
        if (pushState) {
            window.history.pushState({}, '', normalizedPath);
        }
        loadContent(normalizedPath);
    } else {
        // Se a rota não estiver mapeada, faz a navegação tradicional (fallback)
        window.location.href = path;
    }
}

/**
 * Inicializa o roteador do SPA.
 */
function initRouter() {
    // Intercepta cliques em links internos
    document.body.addEventListener('click', (event) => {
        const target = event.target.closest('a');
        if (target && target.href.startsWith(window.location.origin)) {
            const path = target.pathname;
            
            // Verifica se o link é para um dos arquivos HTML mapeados
            if (routes[path]) {
                event.preventDefault();
                navigate(path);
            }
        }
    });

    // Lida com o botão Voltar/Avançar do navegador
    window.addEventListener('popstate', () => {
        navigate(window.location.pathname, false);
    });

    // Carrega o conteúdo inicial
    navigate(window.location.pathname, false);
}

export { initRouter, navigate, loadContent };

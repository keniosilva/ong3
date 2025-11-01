// js/templates.js

/**
 * Objeto contendo funções para gerar templates HTML.
 */
const templates = {
    /**
     * Gera o HTML para um card de projeto usando classes Bootstrap.
     * @param {Object} project - Objeto contendo os dados do projeto.
     * @param {string} project.image - Caminho da imagem do projeto.
     * @param {string} project.alt - Texto alternativo da imagem.
     * @param {string} project.title - Título do projeto.
     * @param {string} project.description - Descrição breve do projeto.
     * @param {Array<string>} project.tags - Lista de tags do projeto.
     * @returns {string} O HTML do card.
     */
    projectCard: (project) => {
        const tagsHtml = project.tags.map(tag => 
            `<span class="badge text-bg-primary me-1">${tag}</span>`
        ).join('');

        return `
            <div class="col">
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.alt}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <div class="mb-2">
                            ${tagsHtml}
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-outline-primary">Ver Detalhes</a>
                    </div>
                </div>
            </div>
        `;
    }
};

/**
 * Renderiza um template e o insere em um elemento do DOM.
 * @param {string} templateName - O nome do template a ser usado (chave no objeto templates).
 * @param {Object} data - Os dados a serem passados para a função do template.
 * @param {HTMLElement|string} target - O elemento DOM ou seletor onde o HTML será inserido.
 * @param {boolean} append - Se deve anexar (true) ou substituir (false) o conteúdo.
 */
function renderTemplate(templateName, data, target, append = false) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;

    if (!targetElement) {
        console.error(`Elemento alvo não encontrado para o seletor/elemento: ${target}`);
        return;
    }

    const templateFunction = templates[templateName];
    if (!templateFunction) {
        console.error(`Template "${templateName}" não encontrado.`);
        return;
    }

    const html = templateFunction(data);

    if (append) {
        targetElement.insertAdjacentHTML('beforeend', html);
    } else {
        targetElement.innerHTML = html;
    }
}

export { templates, renderTemplate };

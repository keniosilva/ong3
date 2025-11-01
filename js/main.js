// js/main.js

import { initRouter } from './router.js';
import { initValidation } from './validation.js';
import { initMasks } from './masks.js';
import { templates, renderTemplate } from './templates.js';

/**
 * Função para inicializar funcionalidades específicas de cada página após o carregamento do conteúdo.
 * @param {string} path - O caminho da rota atual.
 */
function initializePageFeatures(path) {
    // Inicializa validação e máscaras apenas na página de cadastro
    if (path === '/cadastro.html') {
        initValidation();
        initMasks();
    }

    // Simula o carregamento dinâmico de projetos na página de projetos
    if (path === '/projetos.html') {
        // Simulação de dados de projetos para o template
        const projects = [
            {
                image: 'assets/images/project_education.jpg',
                alt: 'Projeto de Educação',
                title: 'Educação para o Futuro',
                description: 'Foco em reforço escolar e acesso a tecnologia para crianças carentes.',
                tags: ['Educação', 'Crianças']
            },
            {
                image: 'assets/images/project_health.jpg',
                alt: 'Projeto de Saúde',
                title: 'Campanha de Saúde Comunitária',
                description: 'Oferece consultas e medicamentos gratuitos em comunidades rurais.',
                tags: ['Saúde', 'Comunidade']
            },
            {
                image: 'assets/images/project_sustainability.jpg',
                alt: 'Projeto de Sustentabilidade',
                title: 'Reciclagem e Meio Ambiente',
                description: 'Incentivo à coleta seletiva e oficinas de conscientização ambiental.',
                tags: ['Sustentabilidade', 'Meio Ambiente']
            }
        ];

        const projectsContainer = document.querySelector('#projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = ''; // Limpa o conteúdo estático
            projects.forEach(project => {
                renderTemplate('projectCard', project, projectsContainer, true);
            });
        }
    }
}

/**
 * Função principal que inicializa a aplicação.
 */
function main() {
    // Ouve o evento 'contentLoaded' disparado pelo roteador
    document.addEventListener('contentLoaded', (event) => {
        initializePageFeatures(event.detail.path);
    });

    // Inicializa o roteador SPA, que por sua vez dispara o primeiro 'contentLoaded'
    initRouter();
    
    // Inicializa as funcionalidades da página atual no carregamento inicial (caso não seja SPA)
    initializePageFeatures(window.location.pathname);
}

// Garante que o DOM esteja pronto antes de executar o script
document.addEventListener('DOMContentLoaded', main);

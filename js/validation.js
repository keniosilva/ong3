// js/validation.js

/**
 * Valida um CPF.
 * @param {string} cpf - O CPF a ser validado (formato 000.000.000-00 ou apenas dígitos).
 * @returns {boolean} True se o CPF for válido, false caso contrário.
 */
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

/**
 * Valida um CEP.
 * @param {string} cep - O CEP a ser validado (formato 00000-000 ou apenas dígitos).
 * @returns {boolean} True se o CEP tiver o formato correto, false caso contrário.
 */
function validateCEP(cep) {
    return /^\d{5}-?\d{3}$/.test(cep);
}

/**
 * Exibe feedback de erro para um campo específico usando classes Bootstrap.
 * @param {HTMLElement} inputElement - O elemento de input.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
function displayError(inputElement, message) {
    inputElement.classList.add('is-invalid');
    
    // Cria o elemento de feedback de erro
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'invalid-feedback';
    feedbackElement.textContent = message;

    // Remove feedback anterior e adiciona o novo
    const parent = inputElement.closest('.mb-3');
    if (parent) {
        parent.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
        parent.appendChild(feedbackElement);
    }
}

/**
 * Remove feedback de erro de um campo.
 * @param {HTMLElement} inputElement - O elemento de input.
 */
function removeError(inputElement) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.remove('is-valid');
    
    const parent = inputElement.closest('.mb-3');
    if (parent) {
        parent.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    }
}

/**
 * Realiza a validação de consistência do formulário de cadastro.
 * @param {Event} event - O evento de submissão do formulário.
 */
function handleFormValidation(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário

    const form = event.target;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        removeError(input); // Limpa erros anteriores

        if (!input.value.trim()) {
            displayError(input, 'Este campo é obrigatório.');
            isValid = false;
            return;
        }

        let fieldIsValid = true;
        switch (input.id) {
            case 'email':
                if (!input.value.includes('@') || !input.value.includes('.')) {
                    displayError(input, 'Por favor, insira um e-mail válido.');
                    fieldIsValid = false;
                }
                break;
            case 'cpf':
                if (!validateCPF(input.value)) {
                    displayError(input, 'CPF inválido ou inconsistente.');
                    fieldIsValid = false;
                }
                break;
            case 'cep':
                if (!validateCEP(input.value)) {
                    displayError(input, 'CEP inválido. Use o formato 00000-000.');
                    fieldIsValid = false;
                }
                break;
            case 'data-nascimento':
                const birthDate = new Date(input.value);
                const today = new Date();
                if (birthDate > today) {
                    displayError(input, 'Data de nascimento não pode ser futura.');
                    fieldIsValid = false;
                }
                break;
        }
        
        if (fieldIsValid) {
            input.classList.add('is-valid');
        } else {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Formulário enviado com sucesso! (Simulação)');
        form.reset();
        // Remove a classe is-valid após o reset
        inputs.forEach(input => input.classList.remove('is-valid'));
    } else {
        // Se não for válido, foca no primeiro campo com erro
        const firstError = form.querySelector('.is-invalid');
        if (firstError) {
            firstError.focus();
        }
    }
}

/**
 * Inicializa a validação de formulário, anexando o listener ao formulário de cadastro.
 */
function initValidation() {
    const form = document.querySelector('#cadastroForm');
    if (form) {
        form.removeEventListener('submit', handleFormValidation);
        form.addEventListener('submit', handleFormValidation);
    }
}

export { initValidation, handleFormValidation };

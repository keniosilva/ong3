// js/masks.js

/**
 * Aplica uma máscara a um campo de input.
 * @param {HTMLInputElement} input - O elemento de input.
 * @param {string} mask - A string da máscara (ex: '000.000.000-00').
 */
function applyMask(input, mask) {
    input.addEventListener('input', (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        let maskedValue = '';
        let k = 0;

        for (let i = 0; i < mask.length; i++) {
            if (k >= value.length) break;

            if (mask[i] === '0') {
                maskedValue += value[k++];
            } else {
                maskedValue += mask[i];
            }
        }
        event.target.value = maskedValue;
    });
}

/**
 * Inicializa as máscaras nos campos do formulário de cadastro.
 * É chamada após o carregamento de conteúdo via SPA.
 */
function initMasks() {
    const cpfInput = document.querySelector('#cpf');
    const telefoneInput = document.querySelector('#telefone');
    const cepInput = document.querySelector('#cep');

    if (cpfInput) {
        applyMask(cpfInput, '000.000.000-00');
    }
    if (telefoneInput) {
        // Máscara para (00) 00000-0000 (celular com 9 dígitos)
        applyMask(telefoneInput, '(00) 00000-0000');
    }
    if (cepInput) {
        applyMask(cepInput, '00000-000');
    }
}

export { initMasks };
Masks };
s };

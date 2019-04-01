// modulo clientes

(()=> {
    const ENDPOINT = '/backend/cliente';

    const form = {
        nome: document.querySelector('[data-form=cliente_nome]'),
        email: document.querySelector('[data-form=cliente_email]'),
        telefone: document.querySelector('[data-form=cliente_telefone]'),
        endereco: document.querySelector('[data-form=cliente_endereco]'),
        cidade: document.querySelector('[data-form=cliente_cidade]'),
        estado: document.querySelector('[data-form=cliente_estado]'),
    };

    const formActiveData = {};

    const btnSalvar = document.querySelector('[data-form=client-btn-save]');

    const submitForm = ()=> {
        ui.ajax.post(ENDPOINT, formActiveData);
    };

    const getList = ()=> {
        ui.ajax.get(ENDPOINT);
    };

    Object.keys(form).forEach((input)=> {
        form[input].addEventListener('input', (evt)=> {
            formActiveData[input] = evt.target.value;
        });
    });
    
    btnSalvar.addEventListener('click', submitForm);

    window.ui.modulo.modulos = {
        cliente: {
            form,
            formActiveData,
            getList,
        }
    };
})();

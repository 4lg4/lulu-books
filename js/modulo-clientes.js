// modulo clientes

(()=> {
    const ENDPOINT = '/backend/cliente';
    
    let list = [];

    let listHtml = [];
    const listHtmlContainer = document.querySelector('[data-name=client-list]');

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
        ui.ajax
            // .post(ENDPOINT, formActiveData)
            .get(`${ENDPOINT}?action=salvar&${ui.modulo.toQueryString(formActiveData)}`)
            .then(()=>getList());
    };

    const getList = ()=> {
        listHtmlContainer.innerHTML = '';
        listHtml = [];

        ui.ajax.get(ENDPOINT).then((_list)=> {
            list = window.ui.modulo.modulos.cliente.list = _list;
            renderList();
        });
    };

    const editClient = (client)=> {
        form.nome.value = client.nome;
        form.email.value = client.email;
        form.telefone.value = client.telefone;
        form.endereco.value = client.endereco;
        form.cidade.value = client.cidade;
        form.estado.value = client.estado;
        // form.status.value = client.status;

        formActiveData.id = client.id;
        formActiveData.nome = client.nome;
        formActiveData.email = client.email;
        formActiveData.telefone = client.telefone;
        formActiveData.endereco = client.endereco;
        formActiveData.cidade = client.cidade;
        formActiveData.estado = client.estado;
        // formActiveData.status = client.status;
    };
    const delClient = (cliente)=> alert(`Não implementado \n deletar cliente id ${cliente.id}`);

    const renderList = ()=> {
        list.forEach((row)=> {
            const rowEl = document.createElement('tr');
            const colNome = document.createElement('td');
            const colEmail = document.createElement('td');
            const colTel = document.createElement('td');
            const colActions = document.createElement('td');
            const edit = document.createElement('button');
            edit.textContent = 'E';
            edit.classList.add('button-secondary');
            edit.addEventListener('click', ()=> editClient(row));
            const del = document.createElement('button');
            del.textContent = 'D';
            del.classList.add('button-error');
            del.addEventListener('click', ()=> delClient(row));

            colNome.textContent = row['nome'];
            rowEl.appendChild(colNome);

            colEmail.textContent = row['email'];
            rowEl.appendChild(colEmail);

            colTel.textContent = row['telefone'];
            rowEl.appendChild(colTel);

            colActions.appendChild(edit);
            colActions.appendChild(del);
            rowEl.appendChild(colActions);

            listHtml.push(rowEl);
            listHtmlContainer.appendChild(rowEl);
        });
    }

    const initialize = ()=> {
        getList();
    }

    Object.keys(form).forEach((input)=> {
        form[input].addEventListener('input', (evt)=> {
            formActiveData[input] = evt.target.value;
        });
    });
    
    btnSalvar.addEventListener('click', submitForm);

    window.ui.modulo.modulos['cliente'] = {
        form,
        formActiveData,
        getList,
        list,
        initialize,
    };
})();

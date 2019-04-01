// modulo funcionarios

(()=> {
    const ENDPOINT = '/backend/funcionario';
    
    let list = [];

    let listHtml = [];
    const listHtmlContainer = document.querySelector('[data-name=funcionario-list]');

    const form = {
        nome: document.querySelector('[data-form=funcionario_nome]'),
        cargo: document.querySelector('[data-form=funcionario_cargo]'),
        endereco: document.querySelector('[data-form=funcionario_endereco]'),
        cidade: document.querySelector('[data-form=funcionario_cidade]'),
        estado: document.querySelector('[data-form=funcionario_estado]'),
        admissao: document.querySelector('[data-form=funcionario_data_admissao]'),
        demissao: document.querySelector('[data-form=funcionario_data_demissao]'),
    };

    const formActiveData = {};

    const btnSalvar = document.querySelector('[data-form=funcionario-btn-save]');

    const submitForm = ()=> {
        ui.ajax
            .post(ENDPOINT, formActiveData)
            .then(()=>getList());
    };

    const getList = ()=> {
        listHtmlContainer.innerHTML = '';
        listHtml = [];

        ui.ajax.get(ENDPOINT).then((_list)=> {
           list = window.ui.modulo.modulos.funcionario.list = _list;
           renderList();
        });
    };

    const editFuncionario = (funcionario)=> {
        form.nome.value = funcionario.nome;
        form.cargo.value = funcionario.cargo;
        form.endereco.value = funcionario.endereco;
        form.cidade.value = funcionario.cidade;
        form.estado.value = funcionario.estado;
        form.admissao.value = funcionario.admissao;
        form.demissao.value = funcionario.demissao;
        // form.status.value = funcionario.status;

        formActiveData.id = funcionario.id;
        formActiveData.nome = funcionario.nome;
        formActiveData.cargo = funcionario.cargo;
        formActiveData.endereco = funcionario.endereco;
        formActiveData.cidade = funcionario.cidade;
        formActiveData.estado = funcionario.estado;
        formActiveData.admissao = funcionario.admissao;
        formActiveData.demissao = funcionario.demissao;
        // formActiveData.status = funcionario.status;
    };
    const delFuncionario = (funcionario)=> alert(`Não implementado \n deletar funcionario id ${funcionario.id}`);

    const renderList = ()=> {
        list.forEach((row)=> {
            const rowEl = document.createElement('tr');
            const colNome = document.createElement('td');
            const colCargo = document.createElement('td');
            const colAdmissao = document.createElement('td');
            const colDemissao = document.createElement('td');
            const colActions = document.createElement('td');
            const edit = document.createElement('button');
            edit.textContent = 'E';
            edit.classList.add('button-secondary');
            edit.addEventListener('click', ()=> editFuncionario(row));
            const del = document.createElement('button');
            del.textContent = 'D';
            del.classList.add('button-error');
            del.addEventListener('click', ()=> delFuncionario(row));

            colNome.textContent = row['nome'];
            rowEl.appendChild(colNome);

            colCargo.textContent = row['cargo'];
            rowEl.appendChild(colCargo);

            colAdmissao.textContent = (row['admissao']) ? new Date(row['admissao']).toLocaleString() : '';
            rowEl.appendChild(colAdmissao);

            colDemissao.textContent = row['demissao'];
            rowEl.appendChild(colDemissao);

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

    window.ui.modulo.modulos['funcionario'] = {
        form,
        formActiveData,
        getList,
        list,
        initialize,
    };
})();

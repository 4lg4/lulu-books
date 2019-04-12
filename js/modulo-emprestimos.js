// modulo emprestimos

(()=> {
    const ENDPOINT = '/backend/emprestimo';
    
    let list = [];

    let listHtml = [];
    const listHtmlContainer = document.querySelector('[data-name=emprestimo-list]');

    const form = {
        clientes: [],
        funcionarios: [],
        livros: [],
    };

    const formActiveData = {};

    const btnSalvar = document.querySelector('[data-form=emprestimo-btn-save]');

    const submitForm = ()=> {
        ui.ajax
            // .post(ENDPOINT, formActiveData)
            .get(`${ENDPOINT}?action=salvar&${ui.modulo.toQueryString(formActiveData)}`)
            .then(()=>{
                clearForm();
                return getList();
            });
    };

    const getList = ()=> {
        listHtmlContainer.innerHTML = '';
        listHtml = [];

        ui.ajax.get(ENDPOINT).then((_list)=> {
           list = window.ui.modulo.modulos.emprestimo.list = _list;
           renderList();
        });
    };

    const clearForm = ()=> {
        // TODO: melhorar essa solucao
        form.cliente.value = null;
        form.livro.value = null;
        form.funcionario.value = null;
        formActiveData.clienteId = '';
        formActiveData.livroId = '';
        formActiveData.funcionarioId = '';
    };

    // const editEmprestimo = (emprestimo)=> {
    //     form.nome.value = emprestimo.nome;
    //     form.autor.value = emprestimo.autor;
    //     form.ano.value = emprestimo.ano;
    //     form.genero.value = emprestimo.genero;
    //     form.editora.value = emprestimo.editora;
    //     form.status.value = emprestimo.status;
    //
    //     formActiveData.id = emprestimo.id;
    //     formActiveData.nome = emprestimo.nome;
    //     formActiveData.autor = emprestimo.autor;
    //     formActiveData.ano = emprestimo.ano;
    //     formActiveData.genero = emprestimo.genero;
    //     formActiveData.editora = emprestimo.editora;
    //     formActiveData.status = emprestimo.status;
    // };

    const delEmprestimo = (emprestimo)=> {
        if (window.confirm(`Remover emprestimo do livro ${emprestimo.livroNome} \nretirado por ${emprestimo.clienteNome}`)) {
            del(emprestimo.id);
        }
    };

    const del = (id)=> {
        ui.ajax
        // .del(ENDPOINT, {})
            .get(`${ENDPOINT}?action=deletar&id=${id}`)
            .then(()=> getList());
    };

    const renderList = ()=> {
        list.forEach((row)=> {
            const rowEl = document.createElement('tr');
            const colCliente = document.createElement('td');
            const colLivro = document.createElement('td');
            const colFuncionario = document.createElement('td');
            const colEmprestimo = document.createElement('td');
            const colActions = document.createElement('td');
            // const edit = document.createElement('button');
            // edit.textContent = 'E';
            // edit.classList.add('button-secondary');
            // edit.addEventListener('click', ()=> editEmprestimo(row));
            const del = document.createElement('button');
            del.textContent = 'D';
            del.classList.add('button-error');
            del.addEventListener('click', ()=> delEmprestimo(row));

            colCliente.textContent = row['clienteNome'];
            rowEl.appendChild(colCliente);

            colLivro.textContent = row['livroNome'];
            rowEl.appendChild(colLivro);

            colFuncionario.textContent = row['funcionarioNome'];
            rowEl.appendChild(colFuncionario);

            colEmprestimo.textContent = (row['emprestimo']) ? new Date(row['emprestimo']).toLocaleString() : '';
            rowEl.appendChild(colEmprestimo);

            // colActions.appendChild(edit);
            colActions.appendChild(del);
            rowEl.appendChild(colActions);

            listHtml.push(rowEl);
            listHtmlContainer.appendChild(rowEl);
        });
    };

    const initialize = ()=> {
        getList();
        getClientes();
        getFuncionarios();
        getLivros();
    };

    const getClientes = ()=> {
        window.ui.modulo.modulos.cliente.get().then((clientes)=> {
            form.clientes = clientes;
            renderSelect('cliente', clientes);
        });
    };

    const getFuncionarios = ()=> {
        window.ui.modulo.modulos.funcionario.get().then((funcionarios)=> {
            form.funcionarios = funcionarios;
            renderSelect('funcionario', funcionarios);
        });
    };

    const getLivros = ()=> {
        window.ui.modulo.modulos.livro.get().then((livros)=> {
            form.livros = livros;
            renderSelect('livro', livros);
        });
    };

    const renderSelect = (field, list)=> {
        const select = form[field] = document.createElement('select');
        select.dataset.form = `emprestimo_${field}`;

        const option = document.createElement('option');
        option.value = null;
        option.innerText = `Selecione ${field}`;
        select.appendChild(option);
        select.addEventListener('input', (evt)=> {
            // form[field] = evt.target.value;
            formActiveData[`${field}Id`] = evt.target.value;
        });

        list.forEach((opt)=> {
            const option = document.createElement('option');
            option.value = opt.id;
            option.innerText = opt.nome;
            select.appendChild(option);
        });

        document.querySelector(`.emprestimo_${field}_container`).innerHTML = '';
        document.querySelector(`.emprestimo_${field}_container`).appendChild(select);
    };

    // Object.keys(form).forEach((input)=> {
    //     form[input].addEventListener('input', (evt)=> {
    //         formActiveData[input] = evt.target.value;
    //     });
    // });
    
    btnSalvar.addEventListener('click', submitForm);

    window.ui.modulo.modulos['emprestimo'] = {
        form,
        formActiveData,
        getList,
        list,
        initialize,
    };
})();

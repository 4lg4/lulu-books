// modulo livros

(()=> {
    const ENDPOINT = '/backend/livro';
    
    let list = [];

    let listHtml = [];
    const listHtmlContainer = document.querySelector('[data-name=livro-list]');

    const form = {
        nome: document.querySelector('[data-form=livro_nome]'),
        autor: document.querySelector('[data-form=livro_autor]'),
        genero: document.querySelector('[data-form=livro_genero]'),
        editora: document.querySelector('[data-form=livro_editora]'),
        status: document.querySelector('[data-form=livro_status]'),
        ano: document.querySelector('[data-form=livro_ano]'),
    };

    const formActiveData = {};

    const btnSalvar = document.querySelector('[data-form=livro-btn-save]');

    const submitForm = ()=> {
        ui.ajax
            // .post(ENDPOINT, formActiveData)
            .get(`${ENDPOINT}?action=salvar&${ui.modulo.toQueryString(formActiveData)}`)
            .then(()=>getList());
    };

    const getList = ()=> {
        listHtmlContainer.innerHTML = '';
        listHtml = [];

        get().then((_list)=> {
           list = window.ui.modulo.modulos.livro.list = _list;
           renderList();
        });
    };

    const get = ()=> ui.ajax.get(ENDPOINT);

    const editLivro = (livro)=> {
        form.nome.value = livro.nome;
        form.autor.value = livro.autor;
        form.ano.value = livro.ano;
        form.genero.value = livro.genero;
        form.editora.value = livro.editora;
        form.status.value = livro.status;

        formActiveData.id = livro.id;
        formActiveData.nome = livro.nome;
        formActiveData.autor = livro.autor;
        formActiveData.ano = livro.ano;
        formActiveData.genero = livro.genero;
        formActiveData.editora = livro.editora;
        formActiveData.status = livro.status;
    };
    const delLivro = (livro)=> alert(`Não implementado \n deletar livro id ${livro.id}`);

    const renderList = ()=> {
        list.forEach((row)=> {
            const rowEl = document.createElement('tr');
            const colNome = document.createElement('td');
            const colAutor = document.createElement('td');
            const colAno = document.createElement('td');
            const colGenero = document.createElement('td');
            const colActions = document.createElement('td');
            const edit = document.createElement('button');
            edit.textContent = 'E';
            edit.classList.add('button-secondary');
            edit.addEventListener('click', ()=> editLivro(row));
            const del = document.createElement('button');
            del.textContent = 'D';
            del.classList.add('button-error');
            del.addEventListener('click', ()=> delLivro(row));

            colNome.textContent = row['nome'];
            rowEl.appendChild(colNome);

            colAutor.textContent = row['autor'];
            rowEl.appendChild(colAutor);

            colAno.textContent = row['ano'];
            rowEl.appendChild(colAno);

            colGenero.textContent = row['genero'];
            rowEl.appendChild(colGenero);

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

    window.ui.modulo.modulos['livro'] = {
        form,
        formActiveData,
        getList,
        get,
        list,
        initialize,
    };
})();

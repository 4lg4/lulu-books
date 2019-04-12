// modulo dashboards

(()=> {
    const ENDPOINT = '/backend/dashboard';

    const initialize = ()=> {
        ui.ajax.get(ENDPOINT).then((_list)=> {
           const list = window.ui.modulo.modulos.dashboard.list = _list;


            document.querySelector('[data-name="dashboard-module-content-emprestimos"]').textContent = list.emprestimos;
            document.querySelector('[data-name="dashboard-module-content-livros"]').textContent = list.livros;
            document.querySelector('[data-name="dashboard-module-content-clientes"]').textContent = list.clientes;
            document.querySelector('[data-name="dashboard-module-content-funcionarios"]').textContent = list.funcionarios;
            document.querySelector('[data-name="dashboard-module-content-funcionarios_inativo"]').textContent = list.funcionarios_inativo;
        });
    };

    window.ui.modulo.modulos['dashboard'] = {
        initialize,
    };
})();

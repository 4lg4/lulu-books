// manipula pages

(()=> {

    var pages = document.querySelectorAll('.main');

    const hidePages = ()=> {
        pages.forEach((page)=> {
            page.classList.remove('active');
        });
    }

    const selectPage = (pageName)=> {
        hidePages();
        pages.forEach((page)=> {
            if (page.dataset.name === `${pageName}-module`) {
                page.classList.add('active');
                ui.modulo.modulos[pageName].initialize();
            }
        });
    };

    window.ui.page = {pages, hidePages, selectPage};
})();

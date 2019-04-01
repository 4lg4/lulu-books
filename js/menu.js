// manipula menus

(()=> {

    var menus = document.querySelectorAll('.menu');

    const uncheckMenus = ()=> {
        menus.forEach((menu)=> {
            menu.classList.remove('pure-menu-selected');
        });
    }

    menus.forEach((menu)=> {
        menu.addEventListener('click', ()=> {
            uncheckMenus();
            menu.classList.add('pure-menu-selected');
            ui.page.selectPage(menu.dataset.menuKey);
        });
    });

    const selectMenu = (key)=> {
        menus.forEach((menu)=> {
            if (menu.dataset.menuKey === key) {
                uncheckMenus();
                menu.classList.add('pure-menu-selected');
                ui.page.selectPage(menu.dataset.menuKey);
            }
        });
    }

    window.ui.menu = {menus, uncheckMenus, selectMenu};
})();

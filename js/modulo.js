// modulos
(()=> {
    window.ui.modulo = {
        modulos: {},
        toQueryString: (params)=> Object.keys(params).map(key => key + '=' + params[key]).join('&')
    };
})();

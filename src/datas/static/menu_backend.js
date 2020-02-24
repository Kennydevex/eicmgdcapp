// jshint esversion:6
const Menu = [
    {
        header: 'Genéricos'
    }, {
        title: 'Dashboard',
        group: 'general',
        icon: 'mdi-view-dashboard-variant',
        name: 'admin_page',
    }, {
        header: 'Sistema'
    }, {
        title: 'Sistema',
        group: 'system',
        role: 'Administrador',
        icon: 'mdi-tune',
        items: [
            {
                name: 'list-users',
                title: 'Utilizadores',
                component: 'list_users',
                icon: 'mdi-square-small',
                permission: 'Gerir'
            },
            {
                name: 'access-role',
                title: 'Permissões e Acessos',
                component: 'access_role',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
        ]
    }, {
        header: 'Gestão de Conteúdos'
    }, {
        title: 'Conteúdos e Publicações',
        group: 'cms',
        role: 'Gestor de Artigo',
        icon: 'mdi-post',
        items: [
            {
                name: 'list-articles',
                title: 'Artigos',
                component: 'list_articles',
                icon: 'mdi-square-small',
                permission: 'Gerir'
            },
            {
                name: 'list-categories',
                title: 'Categorias',
                component: 'list_categories',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
            {
                name: 'list-tags',
                title: 'Marcadores',
                component: 'list_tags',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
        ]
    },
    {
        title: 'Galerias',
        group: 'cms',
        role: 'Gestor de Artigo',
        icon: 'mdi-folder-multiple-image',
        items: [
            {
                name: 'list-medias',
                title: 'Medias',
                icon: 'mdi-square-small',
                component: 'list_medias',
                permission: 'Gerir'
            },

        ]
    },

    {
        divider: true
    },
    {
        header: 'Aplicativo'
    },
    {
        title: 'Configurações',
        group: 'settings',
        icon: 'mdi-help-box',
        name: 'teste',
    },
    {
        title: 'Inteface',
        group: 'settings',
        role: 'Administrador',
        icon: 'mdi-tune',
        items: [
            {
                name: 'app-sliders',
                title: 'Sliders',
                component: 'app_sliders',
                icon: 'mdi-square-small',
                permission: 'Configurar Aplicativo',
            },
        ]
    },

    {
        title: 'Ajuda',
        group: 'extra',
        icon: 'mdi-help-box',
        name: 'teste',
    },
];
// reorder menu
Menu.forEach((item) => {
    if (item.items) {
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
});

export default Menu;

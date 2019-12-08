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
                icon: 'mdi-account',
                permission: 'Gerir'
            },
            {
                name: 'access-role',
                title: 'Permissões e Acessos',
                component: 'access_role',
                icon: 'mdi-door-closed-lock',
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
                icon: 'mdi-newspaper-variant-outline',
                permission: 'Gerir'
            },
            {
                name: 'list-categories',
                title: 'Categorias',
                component: 'list_categories',
                icon: 'mdi-folder',
                permission: 'Gerir',
            },
            {
                name: 'list-tags',
                title: 'Marcadores',
                component: 'list_tags',
                icon: 'mdi-tag',
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
                icon: 'mdi-image',
                component: 'list_medias',
                permission: 'Gerir'
            },

        ]
    },

    {
        divider: true
    }, {
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

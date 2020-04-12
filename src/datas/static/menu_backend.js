// jshint esversion:6
const Menu = [
    {
        header: 'Genéricos'
    }, {
        title: 'Dashboard',
        group: 'general',
        icon: 'mdi-view-dashboard-variant',
        name: 'admin_page',
    },
    
    {
        header: 'EICM-GDC'
    }, {
        title: 'Instituição',
        group: 'institution',
        role: 'Administrador',
        icon: 'mdi-domain',
        items: [
            {
                name: 'list-schools',
                title: 'Escola',
                component: 'list_schools',
                icon: 'mdi-square-small',
                permission: 'Gerir'
            },
            {
                name: 'list-histories',
                title: 'Histórias',
                component: 'list_histories',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
            {
                name: 'list-marks',
                title: 'Marcos Históricos',
                component: 'list_marks',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
            {
                name: 'list-murals',
                title: 'Mural',
                component: 'list_murals',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
            {
                name: 'list-guidelines',
                title: 'Missão, Visão e Valores',
                component: 'list_guidelines',
                icon: 'mdi-square-small',
                permission: 'Gerir',
            },
        ]
    },
    
    {
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
        header: 'Gestão de Conteúdos e Publicações'
    }, {
        title: 'Publicações',
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
        title: 'Layout',
        group: 'settings',
        role: 'Administrador',
        icon: 'mdi-tune',
        items: [
            {
                name: 'list-sliders',
                title: 'Sliders',
                component: 'list_sliders',
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

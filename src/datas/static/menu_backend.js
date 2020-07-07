// jshint esversion:6
const Menu = [
    {
        header: 'Base'
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
        roles: ['Diretor'],
        icon: 'mdi-domain',
        items: [
            {
                name: 'list-schools',
                title: 'Escola',
                component: 'list_schools',
                icon: 'mdi-square-small',
            },

            {
                name: 'schools-geral-settings',
                title: 'Parametros Gerais',
                component: 'schools_geral_settings',
                icon: 'mdi-square-small',
            },
            {
                name: 'list-histories',
                title: 'Histórias',
                component: 'list_histories',
                icon: 'mdi-square-small',
            },
            // {
            //     name: 'list-marks',
            //     title: 'Marcos Históricos',
            //     component: 'list_marks',
            //     icon: 'mdi-square-small',
            //     
            // },
            {
                name: 'list-murals',
                title: 'Mural',
                component: 'list_murals',
                icon: 'mdi-square-small',
                
            },
            {
                name: 'list-guidelines',
                title: 'Missão, Visão e Valores',
                component: 'list_guidelines',
                icon: 'mdi-square-small',
                
            },
        ]
    },

    {
        title: 'RH',
        group: 'resources',
        roles: ['Diretor'],
        icon: 'mdi-account-tie',
        items: [

            {
                name: 'list-charges',
                title: 'Funções/Cargos',
                component: 'list_charges',
                icon: 'mdi-square-small',
            },

            {
                name: 'list-employees',
                title: 'Colaboradores',
                component: 'list_employees',
                icon: 'mdi-square-small',
            },

            {
                name: 'list-teachers',
                title: 'Professores',
                component: 'list_teachers',
                icon: 'mdi-square-small',
            },



        ]
    },

    {
        title: 'Formações',
        group: 'formations',
        roles: ['Diretor', 'Coordenador'],
        icon: 'mdi-school',
        items: [
            {
                name: 'list-courses',
                title: 'Cursos',
                component: 'list_courses',
                icon: 'mdi-square-small',
            },

            {
                name: 'list-outcomes',
                title: 'Saídas/Cursos',
                component: 'list_outcomes',
                icon: 'mdi-square-small',
            },

            {
                name: 'list-disciplines',
                title: 'Disciplinas',
                component: 'list_disciplines',
                icon: 'mdi-square-small',
            },
            {
                name: 'list-departments',
                title: 'Departamentos',
                component: 'list_departments',
                icon: 'mdi-square-small',
            },

        ]
    },

    {
        header: 'Sistema'
    }, {
        title: 'Sistema',
        group: 'system',
        roles: ['Administrador'],
        icon: 'mdi-account-settings',
        items: [
            {
                name: 'list-users',
                title: 'Utilizadores',
                component: 'list_users',
                icon: 'mdi-square-small',
            },
            {
                name: 'access-role',
                title: 'Permissões e Acessos',
                component: 'access_role',
                icon: 'mdi-square-small',
                
            },
        ]
    }, {
        header: 'Gestão de Conteúdos e Publicações'
    }, {
        title: 'Publicações',
        group: 'cms',
        roles: ['Diretor', 'Gestor de Artigo'],
        icon: 'mdi-post-outline',
        items: [
            {
                name: 'list-articles',
                title: 'Artigos',
                component: 'list_articles',
                icon: 'mdi-square-small',
            },
            {
                name: 'list-categories',
                title: 'Categorias',
                component: 'list_categories',
                icon: 'mdi-square-small',
                
            },
            {
                name: 'list-tags',
                title: 'Marcadores',
                component: 'list_tags',
                icon: 'mdi-square-small',
                
            },
        ]
    },
    {
        title: 'Galerias',
        group: 'cms',
        roles: ['Diretor', 'Gestor de Artigo'],
        icon: 'mdi-folder-image',
        items: [
            {
                name: 'list-medias',
                title: 'Medias',
                icon: 'mdi-square-small',
                component: 'list_medias',
            },

        ]
    },

    {
        divider: true
    },
    {
        header: 'Aplicativo'
    },

    // {
    //     title: 'Configurações',
    //     group: 'settings',
    //     icon: 'mdi-cogs',
    //     name: 'teste',
    // },
    {
        title: 'Layout',
        group: 'settings',
        roles: ['Diretor', 'Gestor'],
        icon: 'mdi-widgets-outline',
        items: [
            {
                name: 'list-sliders',
                title: 'Sliders',
                component: 'list_sliders',
                icon: 'mdi-square-small',
            },
        ]
    },

    // {
    //     title: 'Ajuda',
    //     group: 'extra',
    //     icon: 'mdi-help-box',
    //     name: 'teste',
    // },
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

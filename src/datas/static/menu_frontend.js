const Menu = [{
    id: 1,
    title: 'Escola',
    name: 'teste',
    icon: 'fa-school fa-xs',
    submenus: [{
        id: 1,
        name: 'eicm_histories',
        title: 'História',
    }, {
        id: 2,
        name: 'eicm_equipe',
        title: 'Corpo Diretivo',
    }, {
        id: 3,
        name: 'eicm_missions',
        title: 'Missão, Visão e Valores',
    }]
}, {
    id: 2,
    title: 'Estudantes',
    name: 'teste',
    icon: 'fa-user-graduate',
    submenus: [{
        id: 1,
        name: 'quadros',
        title: 'Quadros',
    },
        // {
        //     id: 2,
        //     name: 'teste',
        //     title: 'Comissão de Finalista',
        // },
    ]
}, {
    id: 4,
    title: 'Formações',
    name: 'teste',
    icon: 'fa-book',
    submenus: [
        //     {
        //     id: 1,
        //     name: 'teste',
        //     slug: 'acp',
        //     title: 'ACP',
        // }, 
        {
            id: 2,
            name: 'courses',
            slug: 'via_tecnica',
            title: 'Cursos Via Técnica',
        }, {
            id: 3,
            name: 'courses',
            slug: 'profissional',
            title: 'Formação Profissional',
        },]
},
{
    id: 4,
    title: 'Blog',
    name: 'published_articles',
    slug: 'published_articles',
    icon: 'fa-user-graduate',
},
    // ===============================================
];


// reorder menu
Menu.forEach((item) => {
    if (item.submenus) {
        item.submenus.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
});

export default Menu;

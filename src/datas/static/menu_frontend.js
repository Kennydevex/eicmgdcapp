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
            name: 'cursos_via_tecnica',
            slug: 'cursos_via_tecnica',
            title: 'Cursos Via Técnica',
        }, {
            id: 3,
            name: 'formacao_profissional',
            slug: 'formacao_profissional',
            title: 'Formação Profissional',
        },]
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

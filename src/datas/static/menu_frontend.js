const Menu = [{
    id: 1,
    title: 'Minha Escola',
    name: 'school',
    icon: 'mdi-city',
    submenus: [{
        id: 1, 
        name: 'eicm_histories',
        title: 'História',
         icon: '',
    }, {
        id: 2,
        name: 'eicm_equipe',
        title: 'Corpo Diretivo',
         icon: '',
    }, {
        id: 3,
        name: 'eicm_missions',
        title: 'Missão, Visão e Valores',
         icon: '',
    }]
}, {
    id: 2,
    title: 'Estudantes',
    name: 'students',
    icon: 'mdi-bag-personal',
    submenus: [{
        id: 1,
        name: 'quadros',
        title: 'Quadros',
         icon: '',
    },
        // {
        //     id: 2,
        //     name: 'teste',
        //     title: 'Comissão de Finalista',
        // },
    ]
},

// {
//     id: 4,
//     title: 'Formações',
//     name: 'teste',
//     icon: 'fa-book',
//     submenus: [

//         {
//             id: 2,
//             name: 'courses',
//             slug: 'via_tecnica',
//             title: 'Cursos Via Técnica',
//         }, {
//             id: 3,
//             name: 'courses',
//             slug: 'profissional',
//             title: 'Formação Profissional',
//         },]
// },
{
    id: 4,
    title: 'Cursos',
    name: 'actived_courses',
    slug: 'actived_courses',
    icon: 'mdi-certificate',
},

{
    id: 5,
    title: 'Blog',
    name: 'published_articles',
    slug: 'published_articles',
    icon: 'mdi-post',
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

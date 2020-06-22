//Simple
import AppFront from '@/components/frontend/App.vue';
import AppBack from '@/components/backend/App.vue';
//Frontend pages
import Home from '@/views/frontend/Home.vue';
import LoginPage from '@/views/frontend/Login.vue';
import RegisterPage from '@/views/frontend/Register.vue';
import Perfil from '@/views/common/Perfil.vue';
import Missions from '@/views/frontend/eicm/Missions.vue';
import Blog from '@/views/frontend/articles/Index.vue';
import PublishedArticles from '@/views/frontend/articles/List.vue';
import ReadArticle from '@/views/frontend/articles/View.vue';
import FilteredByCategory from '@/views/frontend/articles/filters/ArticleByCategories.vue';
import FilteredByUser from '@/views/frontend/articles/filters/ArticlesByUser.vue';
import FilteredByTag from '@/views/frontend/articles/filters/ArticlesByTag.vue';
// Menu EICM
import EicmPage from '@/views/frontend/eicm/Index.vue';
import Histories from '@/views/frontend/eicm/Histories.vue';
import Equipe from '@/views/frontend/eicm/Equipe.vue';

// Menu Estudantes
import Quadros from '@/views/frontend/students/Quadros.vue';

// Menu EICM
import CursosHome from '@/views/frontend/courses/Index.vue';
import Cursos from '@/views/frontend/courses/List.vue';
import Curso from '@/views/frontend/courses/View.vue';
// import CursosViaTecnica from '@/views/frontend/courses/CursosViaTecnica.vue';
// import FormacaoProfissional from '@/views/frontend/courses/FormacaoProfissional.vue';

//  Administration pages
import Admin from '@/views/backend/Admin.vue';

import Users from '@/components/backend/system/users/Index.vue';
import ListUsers from '@/components/backend/system/users/List.vue';
import AddUser from '@/components/backend/system/users/Create.vue';
import UserInfo from '@/components/backend/system/users/View.vue';
import UpdateUser from '@/components/backend/system/users/Update.vue';

import Access from '@/components/backend/system/access/Index.vue';

import Articles from '@/components/backend/cms/articles/Index.vue';
import ListArticles from '@/components/backend/cms/articles/List.vue';
import AddArticle from '@/components/backend/cms/articles/Create.vue';
import ArticleInfo from '@/components/backend/cms/articles/View.vue';
import UpdateArticle from '@/components/backend/cms/articles/Update.vue';

import Tags from '@/components/backend/cms/tags/Index.vue';

import Categories from '@/components/backend/cms/categories/Index.vue';

import Medias from '@/components/backend/cms/categories/Index.vue';


// Application/Institution
import Schools from '@/components/backend/application/schools/Index.vue';
import ListSchools from '@/components/backend/application/schools/List.vue';
import AddSchool from '@/components/backend/application/schools/Create.vue';
import SchoolInfo from '@/components/backend/application/schools/View.vue';
import UpdateSchool from '@/components/backend/application/schools/Update.vue';

import SchoolHistories from '@/components/backend/application/histories/Index.vue';
import SchoolsGeralSettings from '@/components/backend/application/settings/Index.vue';

import Marks from '@/components/backend/application/marks/Index.vue';

import Murals from '@/components/backend/application/murals/Index.vue';

import Guidelines from '@/components/backend/application/guidelines/Index.vue';

import Employees from '@/components/backend/resources/employees/Index.vue';
import Teachers from '@/components/backend/resources/teachers/Index.vue';
import Charges from '@/components/backend/resources/charges/Index.vue';

// Courses/Formations
import Courses from '@/components/backend/formations/courses/Index.vue';
import ListCourses from '@/components/backend/formations/courses/List.vue';
import AddCourse from '@/components/backend/formations/courses/Create.vue';
import CourseInfo from '@/components/backend/formations/courses/View.vue';
import UpdateCourse from '@/components/backend/formations/courses/Update.vue';

import Outcomes from '@/components/backend/formations/outcomes/Index.vue';
import Disciplines from '@/components/backend/formations/disciplines/Index.vue';
import Departments from '@/components/backend/formations/departments/Index.vue';

// Layout
import Sliders from '@/components/backend/layout/sliders/Index.vue';
import ListSliders from '@/components/backend/layout/sliders/List.vue';
import AddSlider from '@/components/backend/layout/sliders/Create.vue';
import SliderInfo from '@/components/backend/layout/sliders/View.vue';
import UpdateSlider from '@/components/backend/layout/sliders/Update.vue';




// Errors
import Error_403 from '@/views/errors/403.vue';
import Error_404 from '@/views/errors/404.vue';
 

// Tester
import Teste from '@/views/frontend/Teste.vue';



export default [

    //Frontend Paths
    {
        path: '/',
        component: AppFront,
        children: [
            {
                path: '/',
                component: Home,
                name: 'home_page'
            },

            //Auth
            {
                path: '/autenticar',
                component: LoginPage,
                name: 'login_page'
            },
            {
                path: '/registar',
                component: RegisterPage,
                name: 'register_page'
            },
            {
                path: '/perfil',
                component: Perfil,
                name: 'perfil'
            },

            {
                path: '/eicm-gdc',
                component: EicmPage,
                children: [
                    {
                        path: '/historia',
                        name: 'eicm_histories',
                        component: Histories
                    },

                    {
                        path: '/missao',
                        component: Missions,
                        name: 'eicm_missions'
                    },
                    {
                        path: '/equipe',
                        component: Equipe,
                        name: 'eicm_equipe'
                    },

                ]
            },


            // {
            //     path: '/eicm-gdc/historia',
            //     component: Histories,
            //     name: 'eicm_histories'
            // },

            {
                path: '/estudantes/quadros',
                component: Quadros,
                name: 'quadros'
            },

            {
                // Optimização a se fazer, pois se o utilizador alterar url para cursos, não irá se listar nenhum curso, mas fica-se na página principal (Index)...
                path: '/cursos',
                component: CursosHome,
                children: [
                    {
                        path: '/',
                        name: 'actived_courses',
                        component: Cursos
                    }, {
                        path: ':slug',
                        name: 'course_info',
                        component: Curso
                    },
                ]
            },

            // {
            //     path: '/cursos',
            //     component: CursosHome,
            //     children: [
            //         {
            //             path: ':slug',
            //             name: 'courses',
            //             component: Cursos
            //         }, {
            //             path: 'detalhes/:slug',
            //             name: 'course_info',
            //             component: Curso
            //         },
            //     ]
            // },

            {
                path: '/blog',
                component: Blog,
                children: [
                    {
                        path: '/',
                        name: 'published_articles',
                        component: PublishedArticles
                    }, {
                        path: 'ler/:slug',
                        name: 'read_article',
                        component: ReadArticle
                    }, {
                        path: 'categoria/:slug',
                        name: 'article_categories',
                        component: FilteredByCategory
                    }, {
                        path: 'autor/:slug',
                        name: 'articles_by_user',
                        component: FilteredByUser
                    },
                    {
                        path: 'marcador/:slug',
                        name: 'articles_by_tag',
                        component: FilteredByTag
                    },
                ]
            },

            {
                path: '/403',
                name: 'error_403',
                component: Error_403
            },

            {
                path: '/teste',
                component: Teste,
                name: 'teste'
            },
        ]
    },

    {
        path: '/admin',
        component: AppBack,
        meta: {
            requiresAuth: true,
        },
        children: [
            //  Backent root
            {
                path: '/',
                name: 'admin_page',
                component: Admin,
            },


            //  Users modules
            {
                path: 'users',
                component: Users,
                children: [
                    {
                        path: '/',
                        name: 'list_users',
                        component: ListUsers
                    }, {
                        path: 'add',
                        name: 'add_user',
                        component: AddUser
                    }, {
                        path: 'edit/:username',
                        name: 'update_user',
                        component: UpdateUser
                    }, {
                        path: 'info/:username',
                        name: 'view_user',
                        component: UserInfo
                    },
                ]
            },

            // Generic Access Role
            {
                path: 'access',
                name: 'access_role',
                component: Access
            },
            //  CMS modules
            {
                path: 'articles',
                component: Articles,
                children: [
                    {
                        path: '/',
                        name: 'list_articles',
                        component: ListArticles
                    }, {
                        path: 'add',
                        name: 'add_article',
                        component: AddArticle
                    }, {
                        path: 'editar/:slug',
                        name: 'update_article',
                        component: UpdateArticle
                    }, {
                        path: 'ver/:slug',
                        name: 'view_article',
                        component: ArticleInfo
                    },
                ]
            },

            {
                path: 'tags',
                name: 'list_tags',
                component: Tags
            },

            {
                path: 'categories',
                name: 'list_categories',
                component: Categories
            },

            {
                path: 'medias',
                name: 'list_medias',
                component: Medias
            },
            // Application/Institution
            {
                path: 'escola',
                component: Schools,
                children: [
                    {
                        path: '/',
                        name: 'list_schools',
                        component: ListSchools
                    }, {
                        path: 'add',
                        name: 'add_school',
                        component: AddSchool
                    }, {
                        path: 'editar/:slug',
                        name: 'update_school',
                        component: UpdateSchool
                    }, {
                        path: 'ver/:slug',
                        name: 'view_school',
                        component: SchoolInfo
                    },
                ]
            },

            {
                path: 'schools_geral_settings',
                name: 'schools_geral_settings',
                component: SchoolsGeralSettings
            },

            {
                path: 'histories',
                name: 'list_histories',
                component: SchoolHistories
            },
            {
                path: 'histories_marks',
                name: 'list_marks',
                component: Marks
            },
            {
                path: 'murals',
                name: 'list_murals',
                component: Murals
            },
            {
                path: 'guidelines',
                name: 'list_guidelines',
                component: Guidelines
            },

            {
                path: 'employees',
                name: 'list_employees',
                component: Employees
            },

            {
                path: 'teachers',
                name: 'list_teachers',
                component: Teachers
            },
            {
                path: 'charges',
                name: 'list_charges',
                component: Charges
            },


            {
                path: 'courses',
                component: Courses,
                children: [
                    {
                        path: '/',
                        name: 'list_courses',
                        component: ListCourses
                    }, {
                        path: 'add',
                        name: 'add_course',
                        component: AddCourse
                    }, {
                        path: 'editar/:slug',
                        name: 'update_course',
                        component: UpdateCourse
                    }, {
                        path: 'ver/:slug',
                        name: 'view_course',
                        component: CourseInfo
                    },
                ]
            },

            {
                path: 'outcomes',
                name: 'list_outcomes',
                component: Outcomes
            },

            {
                path: 'disciplines',
                name: 'list_disciplines',
                component: Disciplines
            },

            {
                path: 'departments',
                name: 'list_departments',
                component: Departments
            },



            // Layouts
            {
                path: 'sliders',
                component: Sliders,
                children: [
                    {
                        path: '/',
                        name: 'list_sliders',
                        component: ListSliders
                    }, {
                        path: 'add',
                        name: 'add_slider',
                        component: AddSlider
                    }, {
                        path: 'editar/:slug',
                        name: 'update_slider',
                        component: UpdateSlider
                    }, {
                        path: 'ver/:slug',
                        name: 'view_slider',
                        component: SliderInfo
                    },
                ]
            },
        ]
    },

    {
        path: '*',
        name: 'error_404',
        component: Error_404
    },
];
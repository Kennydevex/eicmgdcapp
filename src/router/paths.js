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
import FilteredByCategory from '@/views/frontend/articles/filters/ArticleCategories.vue';
import FilteredByUser from '@/views/frontend/articles/filters/ArticlesByUser.vue';
import FilteredByTag from '@/views/frontend/articles/filters/ArticlesByTag.vue';
// Menu EICM
import Histories from '@/views/frontend/eicm/Histories.vue';
import Equipe from '@/views/frontend/eicm/Equipe.vue';

// Menu Estudantes
import Quadros from '@/views/frontend/students/Quadros.vue';

// Menu EICM
import CoursesHome from '@/views/frontend/courses/Index.vue';
import Courses from '@/views/frontend/courses/List.vue';
import Course from '@/views/frontend/courses/View.vue';
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


// Errors
import Error_403 from '@/views/errors/403.vue';


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
                path: '/eicm-gdc/historia',
                component: Histories,
                name: 'eicm_histories'
            },

            {
                path: '/eicm-gdc/missao',
                component: Missions,
                name: 'eicm_missions'
            },

            {
                path: '/eicm-gdc/equipe',
                component: Equipe,
                name: 'eicm_equipe'
            },

            // {
            //     path: '/eicm-gdc/equipe',
            //     component: Equipe,
            //     name: 'eicm_equipe'
            // },

            {
                path: '/estudantes/quadros',
                component: Quadros,
                name: 'quadros'
            },

            {
                // Optimização a se fazer, pois se o utilizador alterar url para cursos, não irá se listar nenhum curso, mas fica-se na página principal (Index)...
                path: '/cursos',
                component: CoursesHome,
                children: [
                    {
                        path: ':slug',
                        name: 'courses',
                        component: Courses
                    }, {
                        path: 'detalhes/:slug',
                        name: 'course_info',
                        component: Course
                    },
                ]
            },





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
                path: '/users',
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
                path: '/access',
                name: 'access_role',
                component: Access
            },
            //  CMS modules
            {
                path: '/articles',
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
                path: '/tags',
                name: 'list_tags',
                component: Tags
            },

            {
                path: '/categories',
                name: 'list_categories',
                component: Categories
            },

            {
                path: '/medias',
                name: 'list_medias',
                component: Medias
            },


        ]
    },
];
// jshint esversion:6
import Vue from 'vue';
import Vuex from 'vuex';

//Sys
import users from './modules/system/Users';
import roles from './modules/system/Roles';
import permissions from './modules/system/Permissions';

//CMS
import articles from './modules/cms/Articles';
import tags from './modules/cms/Tags';
import categories from './modules/cms/Categories';
import medias from './modules/cms/Medias';

//Application
import schools from './modules/application/Schools';
import histories from './modules/application/Histories';
import marks from './modules/application/Marks';
import guidelines from './modules/application/Guidelines';
import murals from './modules/application/Murals';

//Formations and resources
import courses from './modules/formations/Courses';
import departments from './modules/formations/Departments';
import disciplines from './modules/formations/Disciplines';
import outcomes from './modules/formations/Outcomes';

import sliders from './modules/layout/Sliders';

import teachers from './modules/resources/Teachers';
import employees from './modules/resources/Employees';
import charges from './modules/resources/Charges';

//Auth
import auth from './modules/auth/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: false,
    modules: {
        users,
        roles,
        permissions,
        articles,
        tags,
        categories,
        medias,
        schools,
        histories,
        marks,
        guidelines,
        murals,
        courses,
        departments,
        disciplines,
        outcomes,
        teachers,
        employees,
        charges,
        sliders,
        auth
    },
});
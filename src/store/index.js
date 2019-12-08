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
        auth
    },
});
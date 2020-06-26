// jshint esversion:6
export default ({
    state: { categories: [], articles_by_categories: [], },
    // Ca bu skeci de bem ivita que tudo artigo bem na 
    //categorais, pois ninguem ca pode tem acesso a 
    //artigos n\ao publicado e atraves des ac;\ao es ta 
    //tem acesso.
    getters: {
        categories(state) { return state.categories; },
        category: (state) => (slug) => {
            return state.categories.find(category => category.slug === slug);
        },

        articles_by_categories(state) { return state.articles_by_categories; },
        article_category: (state) => (slug) => {
            return state.articles_by_categories.find(category => category.slug === slug);
        }

    },

    mutations: {
        updateCategories(state, payload) { state.categories = payload; },
        updateArticlesByCategories(state, payload) { state.articles_by_categories = payload; },

    },

    actions: {
        getCategories(context) {
            // eslint-disable-next-line no-undef
            axios.get('categories').then(function (response) { context.commit('updateCategories', response.data.data); });
        },
        getArticlesByCategories(context) {
            // eslint-disable-next-line no-undef
            axios.get('articlesByCategories').then(function (response) { context.commit('updateArticlesByCategories', response.data.data); });
        },
    }
});
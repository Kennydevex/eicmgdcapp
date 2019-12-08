// jshint esversion:6
export default ({
    state: { articles: [], },

    getters: { articles(state) { return state.articles; }, },

    mutations: {
        updateArticles(state, payload) { state.articles = payload; },
    },

    actions: {
        getArticles(context) {
            // eslint-disable-next-line no-undef
            axios.get('articles').then(function (response) { context.commit('updateArticles', response.data.data); });
        },
    }
});
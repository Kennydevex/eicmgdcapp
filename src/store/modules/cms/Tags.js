// jshint esversion:6
export default ({
    state: { tags: [], articles_by_tag: [] },

    getters: {
        tags(state) { return state.tags; },
        articles_by_tag(state) { return state.articles_by_tag; },

    },

    mutations: {
        updateTags(state, payload) { state.tags = payload; },
        updateArticlesByTag(state, payload) { state.articles_by_tag = payload; },

    },

    actions: {
        getTags(context) {
            // eslint-disable-next-line no-undef
            axios.get('tags').then(function (response) { context.commit('updateTags', response.data.data); });
        },
        getArticleByTag(context) {
            // eslint-disable-next-line no-undef
            axios.get('articlesByTag').then(function (response) { context.commit('updateArticlesByTag', response.data.data); });
        },
    }
});
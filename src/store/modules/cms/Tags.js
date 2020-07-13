// jshint esversion:6
export default ({
    state: { tags: [], articles_by_tags: [] },

    getters: {
        tags(state) { return state.tags; },
        tag: (state) => (slug) => {
            return state.categories.find(tag => tag.slug === slug);
        },
        articles_by_tags(state) { return state.articles_by_tags; },

        article_tag: (state) => (slug) => {
            return state.articles_by_tags.find(tag => tag.slug === slug);
        },
    },

    mutations: {
        updateTags(state, payload) { state.tags = payload; },
        updateArticlesByTags(state, payload) { state.articles_by_tags = payload; },

    },

    actions: {
        getTags(context) {
             window.axios.get('tags').then(function (response) { context.commit('updateTags', response.data.data); });
        },
        getArticlesByTags(context) {
             window.axios.get('articlesByTags').then(function (response) { context.commit('updateArticlesByTags', response.data.data); });
        },
    }
});
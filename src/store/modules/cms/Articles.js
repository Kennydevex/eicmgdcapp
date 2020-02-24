// jshint esversion:6
export default ({
    state: {
        articles: [],
        published_articles: [],
    },

    getters: {
        articles(state) {
            return state.articles;
        },
        article: (state) => (slug) => {
            return state.articles.find(article => article.slug === slug);
        },
        published_articles(state) {
            return state.published_articles;
        },
        published_article: (state) => (slug) => {
            return state.published_articles.find(published_article => published_article.slug === slug);
        },
        featured_articles(state) {
            return state.published_articles.find(featured => featured.featuring === true);
        },
    },

    mutations: {
        updateArticles(state, payload) { state.articles = payload; },
        updatePublishedArticles(state, payload) { state.published_articles = payload; },
    },

    actions: {
        getArticles(context) {
            // eslint-disable-next-line no-undef
            axios.get('articles').then(function (response) { context.commit('updateArticles', response.data.data); });
        },
        getPublishedArticles(context) {
            // eslint-disable-next-line no-undef
            axios.get('publishedArticles').then(function (response) { context.commit('updatePublishedArticles', response.data.data); });
        },
    }
});
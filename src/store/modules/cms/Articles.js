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
            return state.published_articles.filter(function (article) {
                return article.featuring == true;
            });
        },

        articles_by_category: (state) => (slug) => {
            return state.published_articles.filter(function (article) {
                return article.category.slug == slug;
            });
        },

        articles_by_tag: (state) => (slug) => {
            return state.published_articles.filter(function (article) {
                return article.tags.filter(function (tag) {
                    return tag.slug == slug;
                });
            });
        },
    },

    mutations: {
        updateArticles(state, payload) { state.articles = payload; },
        updatePublishedArticles(state, payload) { state.published_articles = payload; },
    },

    actions: {
        getArticles(context) {
             window.axios.get('articles').then(function (response) { context.commit('updateArticles', response.data.data); });
        },
        getPublishedArticles(context) {
             window.axios.get('publishedArticles').then(function (response) { context.commit('updatePublishedArticles', response.data.data); });
        },
    }
});
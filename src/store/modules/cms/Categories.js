// jshint esversion:6
export default ({
    state: { categories: [], },

    getters: { categories(state) { return state.categories; }, },

    mutations: {
        updateCategories(state, payload) { state.categories = payload; },
    },

    actions: {
        getCategories(context) {
            // eslint-disable-next-line no-undef
            axios.get('categories').then(function (response) { context.commit('updateCategories', response.data.data); });
        },
    }
});
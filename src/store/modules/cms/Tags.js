// jshint esversion:6
export default ({
    state: { tags: [], },

    getters: { tags(state) { return state.tags; }, },

    mutations: {
        updateTags(state, payload) { state.tags = payload; },
    },

    actions: {
        getTags(context) {
            // eslint-disable-next-line no-undef
            axios.get('tags').then(function (response) { context.commit('updateTags', response.data.data); });
        },
    }
});
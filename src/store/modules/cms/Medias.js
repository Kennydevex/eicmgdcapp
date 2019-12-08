// jshint esversion:6
export default ({
    state: { medias: [], },

    getters: { medias(state) { return state.medias; }, },

    mutations: {
        updateMedias(state, payload) { state.medias = payload; },
    },

    actions: {
        getMedias(context) {
            // eslint-disable-next-line no-undef
            axios.get('medias').then(function (response) { context.commit('updateMedias', response.data.data); });
        },
    }
});
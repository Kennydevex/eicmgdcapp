// jshint esversion:6
export default ({
    state: {
        murals: [],
    },

    getters: {
        murals(state) { return state.murals; },
        mural: (state) => (id) => {
            return state.murals.find(mural => mural.id === id);
        },
    },

    mutations: {
        updateMurals(state, payload) { state.murals = payload; },
    },

    actions: {
        getMurals(context) {
            // eslint-disable-next-line no-undef
            axios.get('murals').then(function (response) { context.commit('updateMurals', response.data.data); });
        },
    }
});
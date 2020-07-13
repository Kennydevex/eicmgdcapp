// jshint esversion:6
export default ({
    state: {
        outcomes: [],
    },

    getters: {
        outcomes(state) { return state.outcomes; },
        outcome: (state) => (id) => {
            return state.outcomes.find(outcome => outcome.id === id);
        },
    },

    mutations: {
        updateOutcomes(state, payload) { state.outcomes = payload; },
    },

    actions: {
        getOutcomes(context) {
            window.axios.get('outcomes').then(function (response) { context.commit('updateOutcomes', response.data.data); });
        },
    }
});
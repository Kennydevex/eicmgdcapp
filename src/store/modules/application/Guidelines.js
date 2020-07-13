// jshint esversion:6
export default ({
    state: {
        guidelines: [],
    },

    getters: {
        guidelines(state) { return state.guidelines; },
        guideline: (state) => (id) => {
            return state.guidelines.find(guideline => guideline.id === id);
        },
    },

    mutations: {
        updateGuidelines(state, payload) { state.guidelines = payload; },
    },

    actions: {
        getGuidelines(context) {
            window.axios.get('guidelines').then(function (response) { context.commit('updateGuidelines', response.data.data); });
        },
    }
});
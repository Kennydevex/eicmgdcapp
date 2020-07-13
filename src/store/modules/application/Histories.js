// jshint esversion:6
export default ({
    state: {
        histories: [],
    },

    getters: {
        histories(state) { return state.histories; },
        history: (state) => (id) => {
            return state.histories.find(history => history.id === id);
        },
    },

    mutations: {
        updateHistories(state, payload) { state.histories = payload; },
    },

    actions: {
        getHistories(context) {
            window.axios.get('histories').then(function (response) { context.commit('updateHistories', response.data.data); });
        },
    }
});
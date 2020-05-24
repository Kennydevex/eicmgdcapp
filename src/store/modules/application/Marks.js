// jshint esversion:6
export default ({
    state: {
        marks: [],
    },

    getters: {
        marks(state) { return state.marks; },
        mark: (state) => (id) => {
            return state.marks.find(mark => mark.id === id);
        },
    },

    mutations: {
        updateMarks(state, payload) { state.marks = payload; },
    },

    actions: {
        getMarks(context) {
            // eslint-disable-next-line no-undef
            axios.get('marks').then(function (response) { context.commit('updateMarks', response.data.data); });
        },
    }
});
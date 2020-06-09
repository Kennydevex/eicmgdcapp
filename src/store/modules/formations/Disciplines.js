// jshint esversion:6
export default ({
    state: {
        disciplines: [],
    },

    getters: {
        disciplines(state) { return state.disciplines; },
        discipline: (state) => (id) => {
            return state.disciplines.find(discipline => discipline.id === id);
        },
    },

    mutations: {
        updateDisciplines(state, payload) { state.disciplines = payload; },
    },

    actions: {
        getDisciplines(context) {
            // eslint-disable-next-line no-undef
            axios.get('disciplines').then(function (response) { context.commit('updateDisciplines', response.data.data); });
        },
    }
});
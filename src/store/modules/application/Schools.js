// jshint esversion:6
export default ({
    state: {
        schools: [],
    },

    getters: {
        schools(state) { return state.schools; },
        school: (state) => (slug) => {
            return state.schools.find(school => school.slug === slug);
        },
    },

    mutations: {
        updateSchools(state, payload) { state.schools = payload; },
    },

    actions: {
        getSchools(context) {
            // eslint-disable-next-line no-undef
            axios.get('schools').then(function (response) { context.commit('updateSchools', response.data.data); });
        },
    }
});
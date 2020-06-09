// jshint esversion:6
export default ({
    state: {
        teachers: [],
    },

    getters: {
        teachers(state) { return state.teachers; },
        teacher: (state) => (slug) => {
            return state.teachers.find(teacher => teacher.slug === slug);
        },
    },

    mutations: {
        updateTeachers(state, payload) { state.teachers = payload; },
    },

    actions: {
        getTeachers(context) {
            // eslint-disable-next-line no-undef
            axios.get('teachers').then(function (response) { context.commit('updateTeachers', response.data.data); });
        },
    }
});
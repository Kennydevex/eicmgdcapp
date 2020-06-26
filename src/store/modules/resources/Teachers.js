// jshint esversion:6
export default ({
    state: {
        teachers: [],
        actived_teachers: [],
    },

    getters: {
        teachers(state) { return state.teachers; },
        teacher: (state) => (slug) => {
            return state.teachers.find(teacher => teacher.slug === slug);
        },

        actived_teachers(state) {
            return state.actived_teachers;
        },
        actived_teacher: (state) => (slug) => {
            return state.actived_teachere.find(actived_teacher => actived_teacher.slug === slug);
        },
    },

    mutations: {
        updateTeachers(state, payload) { state.teachers = payload; },
        updateActivedTeachers(state, payload) { state.actived_teachers = payload; },

    },

    actions: {
        getTeachers(context) {
            // eslint-disable-next-line no-undef
            axios.get('teachers').then(function (response) { context.commit('updateTeachers', response.data.data); });
        },

        getActivedTeachers(context) {
            // eslint-disable-next-line no-undef
            axios.get('activedTeachers').then(function (response) { context.commit('updateActivedTeachers', response.data.data); });
        },
    }
});
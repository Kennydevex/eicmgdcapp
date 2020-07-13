// jshint esversion:6
export default ({
    state: {
        courses: [],
        actived_courses: [],
        featured_courses: [],
    },

    getters: {
        courses(state) { return state.courses; },
        course: (state) => (slug) => {
            return state.courses.find(course => course.slug === slug);
        },
        actived_courses(state) {
            return state.actived_courses;
        },
        actived_course: (state) => (slug) => {
            return state.actived_courses.find(actived_course => actived_course.slug === slug);
        },

        featured_courses(state) {
            return state.actived_courses.filter(function (course) {
                return course.featured == true;
            });
        },

        cursos_via_tecnica(state) {
            return state.actived_courses.filter(function (course) {
                return course.type == 1;
            }); 
        },

    },

    mutations: {
        updateCourses(state, payload) { state.courses = payload; },
        updateActivedCourses(state, payload) { state.actived_courses = payload; },
    },

    actions: {
        getCourses(context) {
            window.axios.get('courses').then(function (response) { context.commit('updateCourses', response.data.data); });
        },

        getActivedCourses(context) {
            window.axios.get('activedCourses').then(function (response) { context.commit('updateActivedCourses', response.data.data); });
        },
    }
});
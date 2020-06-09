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
            return state.featured_courses;
        },
        featured_course: (state) => (slug) => {
            return state.featured_courses.find(featured_course => featured_course.slug === slug);
        },
    },

    mutations: {
        updateCourses(state, payload) { state.courses = payload; },
        updateActivedCourses(state, payload) { state.actived_courses = payload; },
        updateFeaturedCourses(state, payload) { state.featured_courses = payload; },
    },

    actions: {
        getCourses(context) {
            // eslint-disable-next-line no-undef
            axios.get('courses').then(function (response) { context.commit('updateCourses', response.data.data); });
        },

        getActivedCourses(context) {
            // eslint-disable-next-line no-undef
            axios.get('activedCourses').then(function (response) { context.commit('updateActivedCourses', response.data.data); });
        },

        getFeaturedCourses(context) {
            // eslint-disable-next-line no-undef
            axios.get('featuredCourses').then(function (response) { context.commit('updateFeaturedCourses', response.data.data); });
        },
    }
});
// jshint esversion:6
export default ({
    state: {
        departments: [],
    },

    getters: {
        departments(state) { return state.departments; },
        department: (state) => (id) => {
            return state.departments.find(department => department.id === id);
        },
    },

    mutations: {
        updateDepartments(state, payload) { state.departments = payload; },
    },

    actions: {
        getDepartments(context) {
            window.axios.get('departments').then(function (response) { context.commit('updateDepartments', response.data.data); });
        },
    }
});
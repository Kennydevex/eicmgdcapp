// jshint esversion:6
export default ({
    state: {
        employees: [],
    },

    getters: {
        employees(state) { return state.employees; },
        employee: (state) => (slug) => {
            return state.employees.find(employee => employee.slug === slug);
        },
    },

    mutations: {
        updateEmployees(state, payload) { state.employees = payload; },
    },

    actions: {
        getEmployees(context) {
            // eslint-disable-next-line no-undef
            axios.get('employees').then(function (response) { context.commit('updateEmployees', response.data.data); });
        },
    }
});
// jshint esversion:6
export default ({
    state: {
        employees: [],
        teams: []
    },



    getters: {
        employees(state) { return state.employees; },
        teams(state) { return state.teams; },
        employee: (state) => (id) => {
            return state.employees.find(employee => employee.id === id);
        },
    },

    mutations: {
        updateEmployees(state, payload) { state.employees = payload; },
        updateTeams(state, payload) { state.teams = payload; },
    },

    actions: {
        getEmployees(context) {
            // eslint-disable-next-line no-undef
            axios.get('employees').then(function (response) { context.commit('updateEmployees', response.data.data); });
        },
        getTeams(context) {
            // eslint-disable-next-line no-undef
            axios.get('principalTeam').then(function (response) { context.commit('updateTeams', response.data.data); });
        },
    }
});
// jshint esversion:6
export default ({
    state: { roles: [], },

    getters: { roles(state) { return state.roles; }, },

    mutations: {
        updateRoles(state, payload) { state.roles = payload; },
    },

    actions: {
        getRoles(context) {
            window.axios.get('roles').then(function (response) { context.commit('updateRoles', response.data.data); });
        },
    }
});
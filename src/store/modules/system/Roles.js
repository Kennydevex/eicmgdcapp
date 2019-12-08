// jshint esversion:6
export default ({
    state: { roles: [], },

    getters: { roles(state) { return state.roles; }, },

    mutations: {
        updateRoles(state, payload) { state.roles = payload; },
    },

    actions: {
        getRoles(context) {
            // eslint-disable-next-line no-undef
            axios.get('roles').then(function (response) { context.commit('updateRoles', response.data.data); });
        },
    }
});
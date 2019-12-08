// jshint esversion:6
export default ({
    state: { permissions: [], },

    getters: { permissions(state) { return state.permissions; }, },

    mutations: {
        updatePermissions(state, payload) { state.permissions = payload; },
    },

    actions: {
        getPermissions(context) {
            // eslint-disable-next-line no-undef
            axios.get('permissions').then(function (response) { context.commit('updatePermissions', response.data.data); });
        },
    }
});
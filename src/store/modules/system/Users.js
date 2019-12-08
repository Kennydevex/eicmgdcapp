// jshint esversion:6
export default ({
    state: { users: [], },

    getters: { users(state) { return state.users; }, },

    mutations: {
        updateUsers(state, payload) { state.users = payload; },
    },

    actions: {
        getUsers(context) {
            // eslint-disable-next-line no-undef
            axios.get('users').then(function (response) { context.commit('updateUsers', response.data.data); });
        },
    }
});
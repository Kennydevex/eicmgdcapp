// jshint esversion:6
export default ({
    state: {
        charges: [],
    },

    getters: {
        charges(state) { return state.charges; },
        charge: (state) => (id) => {
            return state.charges.find(charge => charge.id === id);
        },
    },

    mutations: {
        updateCharges(state, payload) { state.charges = payload; },
    },

    actions: {
        getCharges(context) {
            // eslint-disable-next-line no-undef
            axios.get('charges').then(function (response) { context.commit('updateCharges', response.data.data); });
        },
    }
});
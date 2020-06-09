// jshint esversion:6
export default ({
    state: {
        sliders: [],
        actived_sliders: []
    },

    getters: {
        sliders(state) { return state.sliders; },

        // slider: (state) => (id) => {
        //     return state.sliders.find(slider => slider.id === id);
        // },

        slider: (state) => (slug) => {
            return state.sliders.find(slider => slider.slug === slug);
        },
        actived_sliders(state) {
            return state.actived_sliders;
        },
        // actived_slider: (state) => (id) => {
        //     return state.actived_sliders.find(actived_slider => actived_slider.id === id);
        // },

        actived_slider: (state) => (slug) => {
            return state.actived_sliders.find(actived_slider => actived_slider.slug === slug);
        },
    },

    mutations: {
        updateSliders(state, payload) { state.sliders = payload; },
        updateActivedSliders(state, payload) { state.actived_sliders = payload; },
    },

    actions: {
        getSliders(context) {
            // eslint-disable-next-line no-undef
            axios.get('sliders').then(function (response) { context.commit('updateSliders', response.data.data); });
        },

        getActivedSliders(context) {
            // eslint-disable-next-line no-undef
            axios.get('activedSliders').then(function (response) { context.commit('updateActivedSliders', response.data.data); });
        },
    }
});
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: '#2698d9',
                secondary: '#D96726',
                accent: '#8c9eff',
                error: '#b71c1c',
                facebook: '#3b5998',
                twitter: '#1DA1F2',
                google: '#DB4437',
            },
        },
    },
});

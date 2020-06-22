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
                primary: '#3E4095',
                // primary: '#2698d9', rgb(62, 64, 149), hsl(239, 41%, 42%)
                secondary: '#683e95',
                info: '#3e6c95',
                accent: '#3e6c95',
                sucess: '#40953E',
                warning: '#95933E',
                error: '#953E40',
                facebook: '#3b5998',
                twitter: '#1DA1F2',
                google: '#DB4437',
            },
        },
    },
});

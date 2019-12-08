
export function init(store, router) {
    router.beforeEach((to, from, next) => {
        const authUser = store.state.auth.authUser;
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

        if (authUser) {
            // eslint-disable-next-line no-undef
            axios.defaults.headers.common = {
                "Authorization": `Bearer ${authUser.token}`,
                "Content-Type": "multipart/form-data",
                "X-Requested-With": "XMLHttpRequest"
            };
        }

        if (requiresAuth && !authUser) {
            next({ name: 'login_page' });
        } else if (to.path == '/autenticar' && authUser) {
            next('/');
        } else {
            next();
        }
    });

    // eslint-disable-next-line no-undef
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('logout');
            router.push('/autenticar');
        }
        if (error.response.status == 403) {
            router.push('/403');
        }
        return Promise.reject(error);
    });
}
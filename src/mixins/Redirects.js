export const viewAndUpdate = {

    methods: {
        onView: function (name, slug) {

            // eslint-disable-next-line no-console
            // console.log(this.$router);
            
            if (this.$router.history.current.name == name) {
                return;
            }
            this.$router.push({ name: name, params: { slug } });
        },

        onUpdate: function (name, slug) {
            if (this.$router.history.current.name == name) {
                return;
            }
            this.$router.push({ name: name, params: { slug } });
        },
    }
}

export const cancelActions = {
    methods: {
        back() {
            this.$router.go(-1);
        },

        back2(name) {
            this.$router.push({ name: name });
        },
        redirectTo(name) {
            this.$router.push({ name: name });
        },
    }
}
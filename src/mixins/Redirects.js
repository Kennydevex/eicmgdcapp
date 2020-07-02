export const viewAndUpdate = {
    methods: {
        onView: function (name, slug = null) {
            if (this.$router.history.current.name == name)
                return;
            if (slug) {
                this.$router.push({ name: name, params: { slug } });
                return;
            }
            this.$router.push({ name: name });
        },

        onUpdate: function (name, slug) {
            if (this.$router.history.current.name == name)
                return;
            this.$router.push({ name: name, params: { slug } });
        },
    }
};

export const cancelActions = {
    methods: {
        back() {
            this.$router.go(-1);
        },

        redirectTo(name) {
            if (this.$router.history.current.name == name)
                return;
            this.$router.push({ name: name });
        },
    }
};
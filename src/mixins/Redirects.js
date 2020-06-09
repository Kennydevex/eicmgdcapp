export const viewAndUpdate = {

    methods: {
        onView: function (name, slug) {
            this.$router.push({ name: name, params: { slug } });
        },

        onUpdate: function (name, slug) {
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
    }
}
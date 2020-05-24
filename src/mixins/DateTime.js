import moment from 'moment';
export const dateFormat = {
    computed: {
        actual_date() {
            return moment(new Date().toISOString().substr(0, 10)).format(
                "DD/MM/YYYY"
            );
        },
    },
    methods: {
        formated(date) {
            return date ? moment(date).format("DD/MM/YYYY") : "";
        },

    },
}

export const timeFormat = {
    computed: {},
    methods: {},
}

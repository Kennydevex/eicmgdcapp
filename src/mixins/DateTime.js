// import moment from 'moment';
// moment.locale("pt-pt");
export const dateFormat = {
    computed: {
        actual_date() {
            return window.moment(new Date().toISOString().substr(0, 10)).format(
                "DD/MM/YYYY"
            );
        },
    },
    methods: {
        formated(date) {
            return date ? window.moment(date).format("DD/MM/YYYY") : "";
        },

        dateForHumanPresentation(date) {
            return date ? window.moment(date).fromNow() : "";
        },

        displayDate(date) {
            return date ? window.moment().format("LL") : "";
        },

        displayDayAndMonth(date) {
            return date ? window.moment().format("MM-YYYY") : "";
        }

    },
}

export const timeFormat = {
    computed: {},
    methods: {},
}

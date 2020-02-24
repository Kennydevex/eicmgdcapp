// jshint esversion:6

export const truncateFilter = {
    filters: {
        truncate: function (value, limit) {
            if (value.length > limit) {
                value = value.substring(0, limit - 3) + "...";
            }
            return value.replace(/(<([^>]+)>)/gi, "");
        }
    },
};

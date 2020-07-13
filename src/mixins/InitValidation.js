import validateDictionary from "@/helpers/api/validateDictionary";
export const dictionary = {
    
    data() {
        return {
            dictionary: validateDictionary
        };
    },

    mounted() {
        this.$validator.localize("pt", this.dictionary);
    },

};
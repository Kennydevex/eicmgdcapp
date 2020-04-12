export const imageFilesRules = {
    data() {
        return {
            coverRules: [
                value =>
                    !value ||
                    value.size < 3000000 ||
                    "Uma imagem de capa não pode ter um tamanho superior a 3MB"
            ],

            logoRules: [
                value =>
                    !value ||
                    value.size < 1000000 ||
                    "Um logo tipo não pode ser superior a 1MB"
            ],
        };
    },
};
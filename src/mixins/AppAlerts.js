// jshint esversion:6
export const flashAlert = {
    methods: {
        feedback(type, msg, timer, toast, position) {
            this.$swal({
                toast: toast,
                position: position ? position : 'top-end',
                type: type,
                title: msg,
                showConfirmButton: false,
                timer: timer ? timer : 3000
            });
        },

        registerCreated(type, title, text, footer) {
            this.$swal({
                type: type,
                title: title,
                text: text,
                footer: footer
            });
        }
    },
};

export const actionAlert = {
    methods: {
        deleteAlert(type, msg, text = "Ação iurreversível, queres continuar?", confirmText = "Eliminar", cancelText = "Cancelar") {
            return this.$swal({
                title: msg,
                text: text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, " + confirmText,
                cancelButtonText: "Não, " + cancelText
            });
        },
    },
};

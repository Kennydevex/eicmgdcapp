/* eslint-disable no-undef */
/*jshint esversion: 6 */

import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { cancelActions } from "@/mixins/Redirects";

export const getDatas = {
    methods: {
        getAll: function (entity, mMutation) {
            if (entity.length) {
                return;
            }
            this.refresh(mMutation);
        },

        refresh: function (mMutation) {
            this.$store.dispatch(mMutation);
        },
    },
};

export const sendFormData = {
    mixins: [clearForm, flashAlert, cancelActions],

    data() {
        return {
            formErrors: {},
            hasError: false,
            dictionary: validateDictionary
        };
    },
    mounted() {
        this.$validator.localize("pt", this.dictionary);
    },
    methods: {
        add(add_new, url, form_data, data_update, modal, simple_form_page = false, rdr_page = '') {
            this.$validator.validateAll().then(noErrorOnValidate => {
                if (noErrorOnValidate) {
                    this.$Progress.start();
                    this.hasError = false;
                    this.formErrors = [];
                    axios
                        .post(url, form_data)
                        .then(response => {
                            this.feedback("success", response.data.msg, 3000, true, "top");
                            window.getApp.$emit(data_update);
                            this.clear();
                            if (!add_new) {
                                if (!simple_form_page) {
                                    window.getApp.$emit(modal);
                                } else {
                                    if (rdr_page != '')
                                        this.$router.push({ name: rdr_page });
                                    else
                                        this.back();
                                }
                            }
                            this.$Progress.finish();

                        })
                        .catch(err => {
                            if (err.response) {
                                this.hasError = true;
                                this.formErrors = err.response.data.errors;
                                this.$Progress.fail();
                            }
                        });
                }
            });
        },

        update(url, form_data, modal, simple_form_page = false, rdr_page = '') {
            this.$validator.validateAll().then(noErrorOnValidate => {
                if (noErrorOnValidate) {
                    this.$Progress.start();
                    this.hasError = false;
                    this.formErrors = [];
                    axios
                        .put(url + "/", form_data)
                        .then(response => {
                            if (!simple_form_page) {
                                window.getApp.$emit(modal);
                            } else {
                                if (rdr_page != '')
                                    this.$router.push({ name: rdr_page });
                                else
                                    this.back();
                            }
                            this.$Progress.finish();
                            this.feedback("success", response.data.msg, 3000, true, "top");
                            this.clear();
                        })
                        .catch(err => {
                            if (err.response) {
                                this.hasError = true;
                                this.formErrors = err.response.data.errors;
                                this.$Progress.fail();
                            }
                        });
                }
            });
        }
    }
};

export const getData = {
    methods: {
        getSingle(url, give_id, entity) {
            if (entity.length) {
                return entity.find(
                    finded => finded.id == give_id
                );
            }

        },
    }
};

export const deleteData = {
    data() {
        return {
            ids: [],
            selected: [],
        };
    },
    methods: {
        setDeleteMult() {
            let mthis = this;
            this.ids = [];
            this.selected.forEach(function (mdata) {
                mthis.ids.push(mdata.id);
            });
            return this.ids;
        },

        onDelete: function (url, id, update_datas, delete_mult = false) {
            this.setDeleteMult();
            if (!delete_mult) {
                this.ids = id;
            }
            this.deleteAlert(
                "warning",
                "Eliminar Registo(s) ",
                this.selected.length > 1 && delete_mult ? "Preste a Eliminar " + this.selected.length + " Registos"
                    : "Eliminar este Registo"
            ).then(result => {
                if (result.value) {
                    this.selected = [];
                    this.deleteData(url, this.ids, update_datas);
                    this.ids = [];
                } else if (result.dismiss === "cancel") {
                    this.selected = [];
                    this.ids = [];
                    this.feedback(
                        "error",
                        "Operação cancelada!",
                        3000,
                        true,
                        "bottom-end"
                    );
                }
            });
        },

        deleteData: function (url, id, update_datas) {
            axios
                .delete(url + "/" + id)
                .then(response => {
                    this.feedback("success", response.data.msg, 3000, true, "top");
                    window.getApp.$emit(update_datas);

                })
                .catch(() => {
                });
        }
    }
};

export const handleActivation = {

    data() {
        return {
            loadAtivaction: {},
        };
    },

    methods: {
        toggleStatus: function (url, id, status, entity, update_all_data) {
            this.$set(this.loadAtivaction, id, false);
            this.$swal({
                title: status ? "Desativar " + entity + "?" : "Ativar " + entity + "?",
                text: "Tens certeza que queres efetuar esta ação?",
                type: "question",
                showCancelButton: true,
                confirmButtonColor: status ? "#ef9309" : "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: status ? "Sim, Desativar" : "Sim, Ativar",
                cancelButtonText: "Cancelar!"
            }).then(result => {
                if (result.value) {
                    this.$set(this.loadAtivaction, id, true);
                    axios
                        .get(url + "/" + id)
                        .then(response => {
                            this.refresh(update_all_data);
                            this.feedback(
                                "success",
                                response.data.msg,
                                3000,
                                true,
                                "top"
                            );
                            this.$set(this.loadAtivaction, id, false);
                        })
                        // eslint-disable-next-line no-unused-vars
                        .catch(_err => {
                            this.feedback(
                                "error",
                                "Erro de operação, tente outra vez",
                                3000,
                                true,
                                "bottom-end"
                            );
                        });
                } else if (result.dismiss === "cancel") {
                    this.feedback(
                        "error",
                        "Operação cancelada!",
                        3000,
                        true,
                        "bottom-end"
                    );
                }
            });
        }
    }
};


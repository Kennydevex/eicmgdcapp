<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mb-0 py-0">
          <v-text-field
            dense
            label="Nome da Disciplina*"
            name="name"
            v-model="formData.name"
            outlined
            v-validate="'required'"
            data-vv-name="name"
            :error-messages="errorMsg('name') || errors.collect('name')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            dense
            label="Descrição"
            name="description"
            hint="Descrição da Disciplina"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            v-validate="'max:500'"
            data-vv-name="description"
            :error-messages="errorMsg('description') || errors.collect('description')"
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-4 py-0">
          <v-divider class="pa-2"></v-divider>
          <span>Natureza da Disciplina</span>
          <v-radio-group v-model="formData.type" row>
            <v-radio label="Compomentes Gerais" value="1"></v-radio>
            <v-radio label="Técnica Tecnológicas" value="2"></v-radio>
            <v-radio label="Práticas" value="3"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getBackEndError],
  props: ["formData"],

  data() {
    return {
      formErrors: [],
    };
  },

  created() {
    window.getApp.$on("APP_ADD_DISCIPLINE", add_new => {
      this.add(
        add_new,
        "disciplines",
        this.$props.formData,
        "APP_UPDATE_ALL_DISCIPLINES_DATA",
        "APP_ADD_DISCIPLINE_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_DISCIPLINE", () => {
      this.update(
        "disciplines/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_DISCIPLINE_MODAL"
      );
    });
  },

  computed: {
    schools: function() {
      return this.$store.getters.schools;
    }
  }
};
</script>
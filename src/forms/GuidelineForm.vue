<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mb-0 py-0">
          <v-combobox
            dense
            name="name"
            outlined
            v-model="formData.name"
            color="primary"
            label="Desiguinação"
            :items="['Missão', 'Visão', 'Valores']"
            v-validate="'required'"
            data-vv-name="name"
            :error-messages="errorMsg('name') || errors.collect('name')"
          ></v-combobox>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            dense
            label="Descrição*"
            name="description"
            hint="Apresente a descrição deste marco"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            v-validate="'required|max:500'"
            data-vv-name="description"
            :error-messages="errorMsg('description') || errors.collect('description')"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getDatas, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas, getBackEndError],
  props: ["formData"],

  data() {
    return {
      formErrors: [],
    };
  },

  created() {
    window.getApp.$on("APP_ADD_GUIDELINE", add_new => {
      this.add(
        add_new,
        "guidelines",
        this.$props.formData,
        "APP_UPDATE_ALL_GUIDELINES_DATA",
        "APP_ADD_GUIDELINE_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_GUIDELINE", () => {
      this.update(
        "guidelines/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_GUIDELINE_MODAL"
      );
    });
  }
};
</script>
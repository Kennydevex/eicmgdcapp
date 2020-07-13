<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mt-2 mb-0 py-0">
          <v-text-field
            dense
            label="Nome*"
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
            label="Descrição do marcador (Opcional)"
            name="description"
            hint="Apresente um pequena descrição deste marcador"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            counter
            v-validate="'max:250'"
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
import { sendFormData, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getBackEndError],
  props: ["formData"],

  data() {
    return {
      formErrors: []
    };
  },

  created() {
    window.getApp.$on("APP_ADD_TAG", add_new => {
      this.add(
        add_new,
        "tags",
        this.$props.formData,
        "APP_UPDATE_ALL_TAGS_DATA",
        "APP_ADD_TAG_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_TAG", () => {
      this.update(
        "tags/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_TAG_MODAL"
      );
    });
  }
};
</script>
<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mt-2 mb-0 py-0">
          <v-text-field
            label="Nome*"
            name="name"
            v-model="formData.name"
            outlined
            v-validate="'required'"
            data-vv-name="name"
            :error-messages="(errors.has('name')) ? errors.collect('name'): formErrors.name"
          ></v-text-field>
        </v-col>
         <v-col cols="12" class="my-0 py-0">
          <v-textarea
            label="Descrição da Categoria (Opcional)"
            name="description"
            hint="Apresente um pequena descrição desta categoria"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            counter
            v-validate="'max:250'"
            data-vv-name="description"
             :error-messages="(errors.has('description')) ? errors.collect('description'): formErrors.description"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData } from "@/mixins/SendForm";
import moment from "moment";

export default {
  mixins: [clearForm, flashAlert, sendFormData],
  props: ["formData"],

  data() {
    return {
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_ADD_CATEGORY", add_new => {
      this.add(
        add_new,
        "categories",
        this.$props.formData,
        "APP_UPDATE_ALL_CATEGORIES_DATA",
        "APP_ADD_CATEGORY_MODAL"
      );
    });


    window.getApp.$on("APP_UPDATE_CATEGORY", () => {
      this.update(
        "categories/" + this.$props.formData.slug,
        this.$props.formData,
        "APP_UPDATE_CATEGORY_MODAL"
      );
    });
  }
};
</script>
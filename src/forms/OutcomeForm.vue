<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mb-0 py-0">
          <v-text-field
            label="Designação"
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
            label="Descrição*"
            name="description"
            hint="Apresente uma descrição"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            v-validate="'required|max:500'"
            data-vv-name="description"
            :error-messages="(errors.has('description')) ? errors.collect('description'): formErrors.description"
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-4 py-0">
          <v-divider class="pa-2"></v-divider>
          <span>Tipo de saída do curso</span>
          <v-radio-group v-model="formData.type" row>
            <v-radio label="Saída Académica" value="1"></v-radio>
            <v-radio label="Saída Profissional" value="2"></v-radio>
          </v-radio-group>
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

export default {
  mixins: [clearForm, flashAlert, sendFormData],
  props: ["formData"],

  data() {
    return {
      dictionary: validateDictionary,
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_ADD_OUTCOME", add_new => {
      this.add(
        add_new,
        "outcomes",
        this.$props.formData,
        "APP_UPDATE_ALL_OUTCOMES_DATA",
        "APP_ADD_OUTCOME_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_OUTCOME", () => {
      this.update(
        "outcomes/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_OUTCOME_MODAL"
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
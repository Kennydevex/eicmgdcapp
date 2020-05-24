<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <v-autocomplete
            v-model="formData.school_id"
            outlined
            no-data-text="Nenhuma instituição com este nome"
            hide-selected
            label="Instituição*"
            clearable
            :items="schools"
            item-text="name"
            item-value="id"
            prepend-inner-icon="mdi-folder-plus-outline"
            v-validate="'required'"
            data-vv-name="school"
            :error-messages="errors.collect('school')"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="mt-2 mb-0 py-0">
          <v-text-field
            label="Titulo*"
            name="title"
            v-model="formData.title"
            outlined
            v-validate="'required'"
            data-vv-name="title"
            :error-messages="(errors.has('title')) ? errors.collect('title'): formErrors.title"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            label="Conteúdo"
            name="content"
            hint="Descreva a história da instituição"
            persistent-hint
            v-model="formData.content"
            outlined
            rows="4"
            v-validate="'max:500'"
            data-vv-name="content"
            :error-messages="(errors.has('content')) ? errors.collect('content'): formErrors.content"
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
import { sendFormData, getDatas } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas],
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
    this.getAll(this.schools, "getSchools");

    window.getApp.$on("APP_ADD_HISTORY", add_new => {
      this.add(
        add_new,
        "histories",
        this.$props.formData,
        "APP_UPDATE_ALL_HISTORIES_DATA",
        "APP_ADD_HISTORY_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_HISTORY", () => {
      this.update(
        "histories/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_HISTORY_MODAL"
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
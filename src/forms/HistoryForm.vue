<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col class="py-0" cols="12" v-if="schools.length==0">
          <v-alert
            border="top"
            colored-border
            type="error"
            elevation="2"
            dismissible
            prominent
            icon="mdi-alert"
            tile
          >
            <v-row align="center">
              <v-col
                class="grow"
              >Nenhuma instituição encontrada na base de dados, é preciso o seu registo para poder criar a sua história</v-col>
              <v-col class="shrink">
                <v-btn
                  small
                  :to="{ name: 'add_school'}"
                  v-if="canAdd()"
                  rounded
                  outlined
                  color="primary"
                  text
                  class="text-none"
                >Registar Instituição</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>

        <!-- <v-col cols="12" class="my-0 py-0">
          <v-autocomplete
            dense
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
        </v-col>-->

        <v-col cols="12" class="mt-2 mb-0 py-0">
          <v-text-field
            :disabled="schools.length==0"
            dense
            label="Titulo*"
            name="title"
            v-model="formData.title"
            outlined
            v-validate="'required'"
            data-vv-name="title"
            :error-messages="errorMsg('title') || errors.collect('title')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <v-textarea
            :disabled="schools.length==0"
            dense
            label="Desenvolvimento desta história"
            name="content"
            hint="Descreva a história da instituição"
            persistent-hint
            v-model="formData.content"
            outlined
            rows="8"
            counter
            v-validate="'max:1000'"
            data-vv-name="content"
            :error-messages="errorMsg('content') || errors.collect('content')"
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
import { sendFormData, getDatas, getBackEndError } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas, getBackEndError],
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
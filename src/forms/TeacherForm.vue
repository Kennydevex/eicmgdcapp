<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" md="4" class="mb-0 py-0">
          <v-autocomplete
            v-model="formData.school_id"
            auto-select-first
            outlined
            readonly
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

        <v-col cols="12" md="8" class="mb-0 py-0">
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
            label="Descrição*"
            name="description"
            hint="Apresente a descrição deste marco"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="4"
            v-validate="'required|max:500'"
            data-vv-name="description"
            :error-messages="(errors.has('description')) ? errors.collect('description'): formErrors.description"
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-5 mb-0 pb-0">
          <v-divider></v-divider>
          <v-subheader>Data do acontecimento</v-subheader>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <input
            style="display:none"
            name="begin_mark_field_target"
            ref="valStartMarkRef"
            v-model="actual_date"
            type="text"
          />
          <v-menu
            v-model="begin_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                name="begin"
                :value="formated(formData.begin)"
                label="Início*"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                v-validate="'required|date_format:dd/MM/yyyy|before:valStartMarkRef'"
                data-vv-as="begin"
                :error-messages="(errors.has('begin')) ? errors.collect('begin'): formErrors.begin"
              ></v-text-field>
              <!-- error-messages="Teste" -->
            </template>
            <v-date-picker v-model="formData.begin" @input="begin_menu=false" locale="pt-pt"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <input
            style="display:none"
            name="end_mark_field_target"
            v-model="initialEndDate"
            ref="valEndMarkRef"
            type="text"
          />
          <v-menu
            v-model="end_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                name="end"
                :value="formated(formData.end)"
                label="Fím"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                v-validate="'date_format:dd/MM/yyyy|after:valEndMarkRef|before:valStartMarkRef'"
                data-vv-as="end"
                :error-messages="(errors.has('end')) ? errors.collect('end'): formErrors.end"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formData.end" @input="end_menu=false" locale="pt-pt"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" class="mt-5 mb-0 pb-0">
          <small>(*) campos de preenchimento obrigatório</small>
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
import moment from "moment";
import { dateFormat } from "@/mixins/DateTime";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas, dateFormat],
  props: ["formData"],

  data() {
    return {
      //  formData: {
      //   name: "",
      //   description: "",
      //   release: "",
      //   requirement: "",
      //   duration: "",
      //   status: "",
      //   featured: "",
      //   type: "",
      //   color:","
      //   departament_id: "",
      //   school_id: "",
      // },

      begin_menu: false,
      end_menu: false,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.getAll(this.schools, "getSchools");

    window.getApp.$on("APP_ADD_MARK", add_new => {
      this.add(
        add_new,
        "marks",
        this.$props.formData,
        "APP_UPDATE_ALL_MARKS_DATA",
        "APP_ADD_MARK_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_MARK", () => {
      this.update(
        "marks/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_MARK_MODAL"
      );
    });
  },

  computed: {
    schools: function() {
      return this.$store.getters.schools;
    },

    initialEndDate() {
      return moment(this.$props.formData.begin).format("DD/MM/YYYY");
    }
  }
};
</script>
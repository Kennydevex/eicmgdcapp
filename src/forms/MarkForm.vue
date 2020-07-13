<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mb-0 py-0">
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
            label="Descrição*"
            name="description"
            hint="Apresente a descrição deste marco de no máximo 500 caracteres"
            persistent-hint
            v-model="formData.description"
            outlined
            counter
            rows="4"
            v-validate="'required|max:500'"
            data-vv-name="description"
            :error-messages="errorMsg('description') || errors.collect('description')"
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
                :disabled="schools.length==0"
                dense
                outlined
                name="begin"
                :value="formated(formData.begin)"
                label="Início*"
                prepend-inner-icon="mdi-calendar-arrow-right"
                readonly
                v-on="on"
                v-validate="'required|date_format:dd/MM/yyyy|before:valStartMarkRef'"
                data-vv-as="begin"
                :error-messages="errorMsg('begin') || errors.collect('begin')"
              ></v-text-field>
              <!-- error-messages="Teste" -->
            </template>
            <v-date-picker
              no-title
              :max="new Date().toISOString().substr(0, 10)"
              v-model="formData.begin"
              @input="begin_menu=false"
              locale="pt-pt"
            ></v-date-picker>
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
                :disabled="schools.length==0"
                dense
                outlined
                name="end"
                :value="formated(formData.end)"
                label="Fím"
                prepend-inner-icon="mdi-calendar-arrow-left"
                readonly
                v-on="on"
                v-validate="'required|date_format:dd/MM/yyyy|after:valEndMarkRef|before:valStartMarkRef'"
                data-vv-as="end"
                :error-messages="errorMsg('end') || errors.collect('end')"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              :max="new Date().toISOString().substr(0, 10)"
              :min="formData.begin"
              v-model="formData.end"
              @input="end_menu=false"
              locale="pt-pt"
            ></v-date-picker>
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
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getDatas, getBackEndError } from "@/mixins/SendForm";
import { dateFormat } from "@/mixins/DateTime";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas, getBackEndError, dateFormat],
  props: ["formData"],

  data() {
    return {
      formErrors: [],
      begin_menu: false,
      end_menu: false,
    };
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
      return window.moment(this.$props.formData.begin).format("DD/MM/YYYY");
    }
  }
};
</script>
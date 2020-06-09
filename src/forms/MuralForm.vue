<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" md="4" class="mb-0 py-0">
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
        </v-col>

        <v-col cols="12" md="8" class="mb-0 py-0">
          <v-text-field
            dense
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
            dense
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

        <v-col cols="12" class="mt-5 mb-0 pb-0">
          <v-divider></v-divider>
          <v-subheader>Represente este lema com um Ícone</v-subheader>
        </v-col>

        <v-col cols="12" md="6" class="mb-0 py-0">
          <v-autocomplete
            dense
            outlined
            v-model="formData.icon"
            no-data-text="Nenhuma instituição com este nome"
            hide-selected
            label="Ícones*"
            :items="icons"
            item-text="name"
            item-value="key"
            :prepend-inner-icon="formData.icon"
            v-validate="'required'"
            data-vv-name="icon"
            :error-messages="errors.collect('icon')"
          ></v-autocomplete>
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
      begin_menu: false,
      end_menu: false,
      dictionary: validateDictionary,

      icons: [
        { key: "mdi-home", name: "Home" },
        { key: "mdi-heart", name: "Coração" },
        { key: "mdi-school", name: "Formação" },
        { key: "mdi-home-city-outline", name: "Metrópole" },
        { key: "mdi-flower", name: "Crescimento" },
        { key: "mdi-hammer-wrench", name: "Ferramentas" },
        { key: "mdi-hand-heart", name: "Amor" },
        { key: "mdi-handshake", name: "Negócio" },
        { key: "mdi-domain", name: "Instituição" },
        { key: "mdi-charity", name: "Caridade" },
        { key: "mdi-engine", name: "Engenharia" },
        { key: "mdi-compass", name: "Explorar" },
        { key: "mdi-pencil-ruler", name: "Design" },
        { key: "mdi-brain", name: "Cerebro" },
        { key: "mdi-math-compass", name: "Projetar" },
        { key: "mdi-head-cog-outline", name: "Pisicologia" },
        { key: "mdi-desktop-classic", name: "Computação" },
        { key: "mdi-home-heart", name: "Família" },
        { key: "mdi-alphabetical", name: "Afabetização" },
        { key: "mdi-currency-usd", name: "Dinheiro" },
        { key: "mdi-certificate-outline", name: "Diploma" },
        { key: "mdi-diamond", name: "Furtuna" },
        { key: "mdi-key", name: "Chave" },
        { key: "mdi-star-outline", name: "Estrela" },
        { key: "mdi-earth", name: "Globalização" }
      ]
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.getAll(this.schools, "getSchools");
    window.getApp.$on("APP_ADD_MURAL", add_new => {
      this.add(
        add_new,
        "murals",
        this.$props.formData,
        "APP_UPDATE_ALL_MURALS_DATA",
        "APP_ADD_MURAL_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_MURAL", () => {
      this.update(
        "murals/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_MURAL_MODAL"
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
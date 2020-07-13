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

        <v-col cols="12" class="mb-0 py-0">
          <v-text-field
            dense
            :disabled="schools.length==0"
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
            counter
            label="Descrição*"
            name="description"
            hint="Apresente uma descrição"
            persistent-hint
            v-model="formData.description"
            outlined
            rows="3"
            v-validate="'required|max:100'"
            data-vv-name="description"
            :error-messages="errorMsg('description') || errors.collect('description')"
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-5 mb-0 pb-0">
          <v-divider></v-divider>
          <v-subheader>Represente este lema com um Ícone</v-subheader>
        </v-col>

        <v-col cols="12" md="6" class="mb-0 py-0">
          <v-autocomplete
            v-model="formData.icon"
            :items="icons"
            outlined
            clearable
            item-text="name"
            item-value="key"
            dense
            name="icon"
            label="Ícone"
            v-validate="'required'"
            data-vv-name="icon"
            :error-messages="errors.collect('icon')"
          ></v-autocomplete>
          <v-avatar v-if="formData.icon" color="grey lighten-2">
            <v-icon large color="primary">{{formData.icon}}</v-icon>
          </v-avatar>
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
  mixins: [
    clearForm,
    flashAlert,
    sendFormData,
    getDatas,
    dateFormat,
    getBackEndError
  ],
  props: ["formData"],

  data() {
    return {
      formErrors: [],
      begin_menu: false,
      end_menu: false,
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
      return window.moment(this.$props.formData.begin).format("DD/MM/YYYY");
    }
  }
};
</script>
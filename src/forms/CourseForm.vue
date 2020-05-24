<template>
  <div>
    <v-stepper v-model="step" non-linear vertical>
      <v-stepper-step
        :editable="update_form"
        :complete="step > 1"
        step="1"
        :rules="[() => courseForm1Error()]"
      >
        Informações Básicas
        <small>Registe as informações básicas da escola</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-form ref="form" @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
          <v-row>Passo 1</v-row>

          <v-divider></v-divider>
          <v-row class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
              <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step
        :editable="update_form"
        :complete="step > 2"
        step="2"
        :rules="[() => contactFormError()]"
      >
        Coordenação
        <small>Regsite os principais contactos da instituição</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-form ref="form" @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
          <v-row>
            <v-col cols="12">Registo de Contactos</v-col>
            <div>Passo 2</div>
          </v-row>
          <v-divider></v-divider>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
              <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
              <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step
        :editable="update_form"
        :complete="step > 3"
        step="3"
        :rules="[() => addressFormError()]"
      >
        Parametrizações Gerais
        <small>Apresende o endereço da isntituição e as suas coordenadas no mapa</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-form ref="form" @submit.prevent="nextStep('form-step-3')" data-vv-scope="form-step-3">
          <v-row>
            <div>Passo 3</div>
          </v-row>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
              <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
              <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step
        :editable="update_form"
        :complete="step > 4"
        step="4"
        :rules="[() => courseForm4Error()]"
      >
        Apresentação
        <small>Configure as informações de apresentação da isntituição</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-form ref="form" @submit.prevent="nextStep('form-step-4')" data-vv-scope="form-step-4">
          <v-row></v-row>
          <v-divider></v-divider>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
              <v-btn
                class="text-none"
                text
                :color="hasError? 'error':'primary'"
                rounded
                @click.stop="update_form?updateCourse():addCourse(false)"
              >
                <v-icon small v-if="hasError">mdi-alert</v-icon>Salvar
              </v-btn>
              <v-btn class="text-none" @click.native="back()" text rounded>Sair</v-btn>
              <v-spacer></v-spacer>
            </v-col>
            <v-col align="end" v-if="hasError">
              <small
                class="error--text"
              >**Os dados enviados não foram guardados, por causa de erros, verefique-os nas sessões anteriores para prosseguir com a operação</small>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { dateFormat } from "@/mixins/DateTime";
import { sendFormData } from "@/mixins/SendForm";
import { imageFilesRules } from "@/mixins/FileRules";
import { multFormData } from "@/mixins/HandleMultFormData";
import { cancelActions } from "@/mixins/Redirects";

export default {
  props: ["formData", "update_form"],

  mixins: [
    clearForm,
    dateFormat,
    sendFormData,
    imageFilesRules,
    multFormData,
    cancelActions
  ],

  data() {
    return {
      testi: "Erro acontecendo",
      tempCover: null,
      tempLogo: null,
      step: 1,
      opningDateMenu: false,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  methods: {
    editContact(id) {
      // eslint-disable-next-line no-console
      console.log(id);
    },

    backendErrorMsg(obj_prop) {
      if (obj_prop in this.formErrors) {
        return this.formErrors[obj_prop][0];
      }
      return;
    },

    courseForm1Error() {
      if (this.formErrors.length != 0) {
        if (this.formErrors.name || this.formErrors.opning) {
          return false;
        }
      }
      return true;
    },

    courseForm4Error() {
      if (this.formErrors.length != 0) {
        if (this.formErrors.logo || this.formErrors.cover) {
          return false;
        }
      }
      return true;
    },

    addressFormError() {
      if (this.formErrors.length != 0) {
        if (this.formErrors["address.state"]) {
          return false;
        }
      }
      return true;
    },

    contactFormError() {
      if (this.formErrors.length != 0) {
        for (let i = 0; i < this.formData.contacts.length; i++) {
          if (
            this.formErrors["contacts." + i + ".contact"] ||
            this.formErrors["contacts." + i + ".description"]
          ) {
            return false;
          }
        }
      }
      return true;
    },

    nextStep(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step++;
        }
      });
    },

    prevStep: function() {
      this.step--;
    },

    onCoverUpload(e) {
      let fileReader = new FileReader();
      try {
        fileReader.readAsDataURL(e);
        fileReader.onload = ev => {
          this.formData.cover = ev.target.result;
        };
      } catch (error) {
        //eslint-disable-next-line
        console.log(error);
      }
    },

    onLogoUpload(e) {
      let fileReader = new FileReader();
      try {
        fileReader.readAsDataURL(e);
        fileReader.onload = ev => {
          this.formData.logo = ev.target.result;
        };
      } catch (error) {
        //eslint-disable-next-line
        console.log(error);
      }
    },

    addCourse(add_new) {
      this.add(
        add_new,
        "courses",
        this.$props.formData,
        "APP_UPDATE_ALL_COURSES_DATA",
        "",
        true
      );
    },

    updateCourse() {
      this.update(
        "courses/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_ALL_COURSES_DATA",
        true
      );
    }
  }
};
</script>
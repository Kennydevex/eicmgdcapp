<template>
  <div>
    <v-stepper v-model="step" non-linear vertical>
      <v-stepper-step
        :editable="update_form"
        :complete="step > 1"
        step="1"
        :rules="[() => schoolForm1Error()]"
      >
        Informações da Instituição
        <small>Registe as informações básicas da escola</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-form ref="form" @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
          <v-row>
            <v-col cols="12" md="10">
              <v-text-field
                outlined
                name="name"
                label="Nome da Escola"
                v-model="formData.name"
                v-validate="'required|alpha_spaces'"
                data-vv-name="form-step-1.name"
                :error-messages=" backendErrorMsg('name') || errors.collect('form-step-1.name')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field
                outlined
                name="abbr"
                label="Abreviatura"
                v-model="formData.abbr"
                v-validate="'required|alpha'"
                data-vv-name="form-step-1.abbr"
                :error-messages="backendErrorMsg('abbr') || errors.collect('form-step-1.abbr')"
                hint="Abreviatura do nome da Escola"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                outlined
                rows="1"
                name="slogan"
                label="Apresente um slogan"
                v-model="formData.slogan"
                auto-grow
                v-validate="'max:200'"
                data-vv-name="form-step-1.slogan"
                :error-messages="errors.collect('form-step-1.slogan')"
                hint="Um lema da escola"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-textarea
                outlined
                rows="4"
                name="description"
                label="Descrição da Escola"
                v-model="formData.description"
                auto-grow
                hint="Descriva esta escola"
                v-validate="'max:500'"
                data-vv-name="form-step-1.description"
                :error-messages="errors.collect('form-step-1.description')"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6">
              <input
                style="display:none"
                name="opning_field_target"
                ref="valOpningRef"
                v-model="actual_date"
                type="text"
              />
              <v-menu
                v-model="opningDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    name="opning"
                    :value="formated(formData.opning)"
                    label="Data de Abertura"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    v-validate="'required|date_format:dd/MM/yyyy|before:valOpningRef'"
                    data-vv-as="form-step-1.opning"
                    :error-messages="backendErrorMsg('opning') || errors.collect('form-step-1.opning')"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.opning"
                  @input="opningDateMenu = false"
                  locale="pt-pt"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

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
        Contactos da Instituição
        <small>Regsite os principais contactos da instituição</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-form ref="form" @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
          <v-row>
            <v-col cols="12">Registo de Contactos</v-col>

            <v-col cols="12">
              <!-- <v-data-table
                :headers="headers"
                :items="formData.contacts"
                class="elevation-1"
                item-key="id"
              >
                <template v-slot:item.action="{ item }">
                  <v-icon small class="mr-2" @click="editContact(item.id)">mdi-pencil</v-icon>

                  <v-icon small>mdi-delete</v-icon>
                </template>
              </v-data-table>-->

              <template v-for="(contact,k) in formData.contacts">
                <v-row :key="k+'contact'">
                  <v-col cols="12" md="2">
                    <v-autocomplete
                      v-model="contact.type"
                      label="Tipo de Contacto"
                      :items="[{id:'1',name:'Tel(Móvel)'},{id:'2',name:'Email'}]"
                      item-text="name"
                      item-value="id"
                      :prepend-inner-icon="contact.type==1?'mdi-phone':'mdi-email'"
                      @change="contact.contact = contact.description = ''"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" :md="contact.type==1?'3':'4'">
                    <v-text-field
                      :name="'contact'+k"
                      :label="contact.type==1?'Telefone/Móvel '+(k+1):'Correio Eletrónico '+(k+1)"
                      v-model="contact.contact"
                      v-validate="contact.type==2?'required|email':'required|max:11'"
                      :data-vv-name="'form-step-2.contact'+k"
                      :error-messages="backendErrorMsg('contacts.'+k+'.contact') || errors.collect('form-step-2.contact'+k)"
                      @change="findRepeatedContact(contact.contact, k)"
                      :hint="contact.type==1?'Insira um número de telefone válido e funcional':'Insira um correio eletrónico válido e em utilização na instituição'"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" :md="contact.type==1?'7':'6'">
                    <v-text-field
                      :disabled="!contact.contact"
                      :name="'description'+k"
                      :label="contact.type==1?'Descrição do número '+(k+1):'Descrição do email '+(k+1)"
                      v-model="contact.description"
                      v-validate="'required'"
                      :data-vv-name="'form-step-2.description'+k"
                      :error-messages="backendErrorMsg('contacts.'+k+'.description') ||errors.collect('form-step-2.description'+k)"
                      :hint="contact.type==1?'Apresente uma pequena descrição do número '+contact.contact:'Apresente uma pequena descrição do  email '+contact.contact"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" align="start">
                    <v-btn
                      outlined
                      class="text-none font-weight-regular mr-1 mb-1"
                      small
                      color="warning"
                      @click="removeContact(k)"
                      v-show="k || ( !k && formData.contacts.length > 1)"
                    >
                      <v-icon small>mdi-minus</v-icon>Eliminar este contacto
                    </v-btn>

                    <v-btn
                      :disabled="canAddContact(k)"
                      outlined
                      class="text-none font-weight-regular mb-1"
                      small
                      :color="repeatedContact?'error':'primary'"
                      @click="repeatedContact?'':moreContact(k)"
                      v-show="k == formData.contacts.length-1"
                    >
                      <v-icon v-if="repeatedContact" small>mdi-alert</v-icon>
                      <v-icon v-else small>mdi-plus</v-icon>Inserir mais contactos
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
              <v-row>
                <v-col cols="12" v-if="repeatedContact">
                  <small class="error--text">
                    <v-icon color="error" small>mdi-alert</v-icon>Verefique os campos porque existe contactos repitidos, caso contrário os dados não serão guardados na base de dados!!
                  </small>
                </v-col>
              </v-row>
            </v-col>
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
        Enderço e Localização Geográfica
        <small>Apresende o endereço da isntituição e as suas coordenadas no mapa</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-form ref="form" @submit.prevent="nextStep('form-step-3')" data-vv-scope="form-step-3">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                outlined
                disabled
                name="country"
                label="País"
                v-model="formData.address.country"
                v-validate="'required'"
                data-vv-name="form-step-3.country"
                :error-messages="errors.collect('form-step-3.country')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                name="state"
                label="Ilha/Estado"
                v-model="formData.address.state"
                v-validate="'required'"
                data-vv-name="form-step-3.state"
                :error-messages="errors.collect('form-step-3.state')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                name="city"
                label="Cidade"
                v-model="formData.address.city"
                v-validate="'required'"
                data-vv-name="form-step-3.city"
                :error-messages="errors.collect('form-step-3.city')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                name="zone"
                label="Zona"
                v-model="formData.address.zone"
                v-validate="'required'"
                data-vv-name="form-step-3.zone"
                :error-messages="errors.collect('form-step-3.zone')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                name="street"
                label="Rua"
                v-model="formData.address.street"
                v-validate="'required'"
                data-vv-name="form-step-3.street"
                :error-messages="errors.collect('form-step-3.street')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                outlined
                name="post_code"
                label="Código Postal"
                v-model="formData.address.post_code"
                v-validate="'required'"
                data-vv-name="form-step-3.post_code"
                :error-messages="errors.collect('form-step-3.post_code')"
              ></v-text-field>
            </v-col>
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
        :rules="[() => schoolForm4Error()]"
      >
        Apresentações Gerais
        <small>Configure as informações de apresentação da isntituição</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-form ref="form" @submit.prevent="nextStep('form-step-4')" data-vv-scope="form-step-4">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="6">
                  <v-file-input
                    outlined
                    name="cover"
                    label="Imagem de rosto"
                    placeholder="Carregar uma imagem de rosto"
                    prepend-icon="mdi-camera"
                    show-size
                    v-model="tempCover"
                    accept="image/png, image/jpeg, image/bmp"
                    :rules="coverRules"
                    v-validate="'image'"
                    data-vv-name="cover"
                    :error-messages="errors.collect('cover')"
                    @change.self="onCoverUpload"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    outlined
                    name="logo"
                    label="Logo da Instituição"
                    placeholder="Carregar logotipo"
                    prepend-icon="mdi-camera"
                    show-size
                    :rules="logoRules"
                    accept="image/png, image/jpeg, image/bmp"
                    v-model="tempLogo"
                    v-validate="'image'"
                    data-vv-name="logo"
                    :error-messages="backendErrorMsg('logo') || errors.collect('logo')"
                    @change.self="onLogoUpload"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6">Configuração de cores</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
              <v-btn
                class="text-none"
                text
                :color="hasError? 'error':'primary'"
                rounded
                @click.stop="update_form?updateSchool():addSchool(false)"
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
      dictionary: validateDictionary,

      headers: [
        {
          text: "contacto",
          value: "contact"
        },
        {
          text: "Descrição",
          value: "description"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ]
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

    schoolForm1Error() {
      if (this.formErrors.length != 0) {
        if (
          this.formErrors.name ||
          this.formErrors.abbr ||
          this.formErrors.slogan ||
          this.formErrors.description ||
          this.formErrors.opning
        ) {
          return false;
        }
      }
      return true;
    },

    schoolForm4Error() {
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

    addSchool(add_new) {
      this.add(
        add_new,
        "schools",
        this.$props.formData,
        "APP_UPDATE_ALL_SCHOOLS_DATA",
        "",
        true
      );
    },

    updateSchool() {
      this.update(
        "schools/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_ALL_SCHOOLS_DATA",
        true
      );
    }
  }
};
</script>
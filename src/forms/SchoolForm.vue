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
            <v-col cols="12" md="10" class="mb-0 mt-2 py-0">
              <v-text-field
                dense
                outlined
                name="name"
                label="Nome da Escola"
                v-model="formData.name"
                v-validate="'required|alpha_spaces'"
                data-vv-name="form-step-1.name"
                :error-messages=" errorMsg('name') || errors.collect('form-step-1.name')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="2" class="mb-0 mt-2 py-0">
              <v-text-field
                dense
                outlined
                name="abbr"
                label="Abreviatura"
                v-model="formData.abbr"
                v-validate="'required|alpha_dash|max:15'"
                data-vv-name="form-step-1.abbr"
                :error-messages="errorMsg('abbr') || errors.collect('form-step-1.abbr')"
                hint="Abreviatura do nome da Escola"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="my-0 py-0">
              <v-textarea
                dense
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

            <v-col cols="12" class="my-0 py-0">
              <v-textarea
                dense
                outlined
                rows="4"
                name="description"
                label="Descrição da Escola"
                v-model="formData.description"
                auto-grow
                hint="Descriva esta escola"
                v-validate="'max:500'"
                counter
                data-vv-name="form-step-1.description"
                :error-messages="errors.collect('form-step-1.description')"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6" class="my-0 py-0">
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
                    dense
                    outlined
                    name="opning"
                    :value="formated(formData.opning)"
                    label="Data de Abertura"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    v-validate="'required|date_format:dd/MM/yyyy|before:valOpningRef'"
                    data-vv-as="form-step-1.opning"
                    :error-messages="errorMsg('opning') || errors.collect('form-step-1.opning')"
                  ></v-text-field>
                </template>
                <v-date-picker
                  no-title
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
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

            <v-col cols="12" class="my-0 py-0">
              <template v-for="(contact,k) in formData.contacts">
                <v-row :key="k+'contact'">
                  <v-col cols="12" md="2" class="my-0 py-0">
                    <v-autocomplete
                      dense
                      v-model="contact.type"
                      label="Tipo de Contacto"
                      :items="[{id:'1',name:'Tel(Móvel)'},{id:'2',name:'Email'}]"
                      item-text="name"
                      item-value="id"
                      :prepend-inner-icon="contact.type==1?'mdi-phone':'mdi-email'"
                      @change="contact.contact = contact.description = ''"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" :md="contact.type==1?'3':'4'" class="my-0 py-0">
                    <v-text-field
                      v-if="contact.type==1"
                      dense
                      :name="'contact'+k"
                      :label="'Telefone/Móvel '+(k+1)"
                      v-mask="'(+238) ###-##-##'"
                      placeholder="(+238) 000-00-00"
                      v-model="contact.contact"
                      v-validate="'required|length:16'"
                      :data-vv-name="'form-step-2.contact'+k"
                      :error-messages="errorMsg('contacts.'+k+'.contact') || errors.collect('form-step-2.contact'+k)"
                      @change="findRepeatedContact(contact.contact, k)"
                      hint="Insira um número de telefone válido e funcional"
                    ></v-text-field>

                    <v-text-field
                      v-else
                      dense
                      :name="'contact'+k"
                      :label="'Correio Eletronico '+(k+1)"
                      placeholder="exemplo@email.com"
                      v-model="contact.contact"
                      v-validate="'required|email'"
                      :data-vv-name="'form-step-2.contact'+k"
                      :error-messages="errorMsg('contacts.'+k+'.contact') || errors.collect('form-step-2.contact'+k)"
                      @change="findRepeatedContact(contact.contact, k)"
                      hint="Insira um correio eletrónico válido e em utilização na instituição"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" :md="contact.type==1?'7':'6'" class="my-0 py-0">
                    <v-text-field
                      dense
                      :disabled="!contact.contact"
                      :name="'description'+k"
                      :label="contact.type==1?'Descrição do número '+(k+1):'Descrição do email '+(k+1)"
                      v-model="contact.description"
                      v-validate="'required'"
                      :data-vv-name="'form-step-2.description'+k"
                      :error-messages="errorMsg('contacts.'+k+'.description') ||errors.collect('form-step-2.description'+k)"
                      :hint="contact.type==1?'Apresente uma pequena descrição do número '+contact.contact:'Apresente uma pequena descrição do  email '+contact.contact"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                          outlined
                          icon
                          small
                          color="error"
                          @click="removeContact(k)"
                          v-show="k || ( !k && formData.contacts.length > 1)"
                        >
                          <v-icon small>mdi-minus</v-icon>
                        </v-btn>

                        <v-btn
                          :disabled="canAddContact(k)"
                          outlined
                          icon
                          small
                          :color="repeatedContact?'error':'primary'"
                          @click="repeatedContact?'':moreContact(k)"
                          v-show="k == formData.contacts.length-1"
                        >
                          <v-icon v-if="repeatedContact" small>mdi-alert</v-icon>
                          <v-icon v-else small>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
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
          <v-row class="mt-3">
            <v-col cols="12" md="4" class="my-0 py-0">
              <v-text-field
                dense
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

            <v-col cols="12" md="4" class="my-0 py-0">
              <v-text-field
                dense
                outlined
                name="state"
                label="Ilha/Estado"
                v-model="formData.address.state"
                v-validate="'required'"
                data-vv-name="form-step-3.state"
                :error-messages="errors.collect('form-step-3.state')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="my-0 py-0">
              <v-text-field
                dense
                outlined
                name="city"
                label="Cidade"
                v-model="formData.address.city"
                v-validate="'required'"
                data-vv-name="form-step-3.city"
                :error-messages="errors.collect('form-step-3.city')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="my-0 py-0">
              <v-text-field
                dense
                outlined
                name="zone"
                label="Zona"
                v-model="formData.address.zone"
                v-validate="'required'"
                data-vv-name="form-step-3.zone"
                :error-messages="errors.collect('form-step-3.zone')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="my-0 py-0">
              <v-text-field
                dense
                outlined
                name="street"
                label="Rua"
                v-model="formData.address.street"
                v-validate="'required'"
                data-vv-name="form-step-3.street"
                :error-messages="errors.collect('form-step-3.street')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="my-0 py-0">
              <v-text-field
                dense
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
        :rules="[() => schoolFormError()]"
      >
        Apresentações Gerais
        <small>Configure as informações de apresentação da isntituição</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-form ref="form" @submit.prevent="nextStep('form-step-4')" data-vv-scope="form-step-4">
          <v-row>
            <v-col cols="12" class="mt-3 py-0">
              <v-row>
                <v-col cols="12" md="6" class="my-0 py-0">
                  <v-file-input
                    dense
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
                <v-col cols="12" md="6" class="my-0 py-0">
                  <v-file-input
                    dense
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
                    :error-messages="errorMsg('logo') || errors.collect('logo')"
                    @change.self="onLogoUpload"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">Configuração de cores</v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    v-model="school_color_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        dense
                        outlined
                        name="school_color"
                        :value="formData.primary_color"
                        label="Cor"
                        prepend-inner-icon="mdi-palette"
                        placeholder="Selecione uma cor para esta categoria"
                        readonly
                        v-on="on"
                      >
                        <template v-slot:append>
                          <v-chip :color="formData.primary_color" small label></v-chip>
                        </template>
                      </v-text-field>
                    </template>
                    <v-color-picker flat v-model="formData.primary_color"></v-color-picker>
                  </v-menu>
                </v-col>
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
import { sendFormData, getBackEndError } from "@/mixins/SendForm";
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
    cancelActions,
    getBackEndError
  ],

  data() {
    return {
      formErrors: [],
      school_color_menu: false,
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

    schoolFormError() {
      if (this.formErrors.length != 0) {
        if (this.formErrors.logo || this.formErrors.cover) return false;
      }
      return true;
    },

    addressFormError() {
      if (this.formErrors.length != 0) {
        if (this.formErrors["address.state"]) return false;
      }
      return true;
    },

    contactFormError() {
      if (this.formErrors.length != 0) {
        for (let i = 0; i < this.formData.contacts.length; i++) {
          if (
            this.formErrors["contacts." + i + ".contact"] ||
            this.formErrors["contacts." + i + ".description"]
          )
            return false;
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
        true,
        "list_schools"
      );
    },

    updateSchool() {
      this.update(
        "schools/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_ALL_SCHOOLS_DATA",
        true,
        "list_schools"
      );
    }
  }
};
</script>
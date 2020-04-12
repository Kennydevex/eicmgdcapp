<template>
  <v-container grid-list-lg fluid ma-0 pa-0>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text class="ma-0 pa-0">
            <v-subheader>Registo da instituição</v-subheader>
            <v-stepper v-model="step" non-linear vertical>
              <v-stepper-step
                editable
                :complete="step > 1"
                step="1"
                :rules="[() => formErrors.school.length == 0]"
              >
                Informações da Instituição
                <small>Registe as informações básicas da escola</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-form @submit.prevent="nextStep('form-step-1')" data-vv-scope="form-step-1">
                  <v-row>
                    <v-col cols="12" md="10">
                      <v-text-field
                        outlined
                        name="name"
                        label="Nome da Escola"
                        v-model="formData.name"
                        v-validate="'required'"
                        data-vv-name="form-step-1.name"
                        :error-messages="errors.collect('form-step-1.name')"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="2">
                      <v-text-field
                        outlined
                        name="abbreviation"
                        label="Abreviatura"
                        v-model="formData.abbreviation"
                        v-validate="'required'"
                        data-vv-name="form-step-1.abbreviation"
                        :error-messages="errors.collect('form-step-1.abbreviation')"
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
                        v-validate="'required'"
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
                        v-validate="'required'"
                        data-vv-name="form-step-1.description"
                        :error-messages="errors.collect('form-step-1.description')"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" md="6">
                      <input
                        style="display:none"
                        name="opning_field_target"
                        ref="valOpningRef"
                        v-model="valOpning"
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
                            :value="formattingOpningDate"
                            label="Data de Abertura"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                            v-validate="'required|date_format:dd/MM/yyyy|before:valOpningRef'"
                            data-vv-as="form-step-1.opning"
                            :error-messages="errors.collect('form-step-1.opning')"
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
                      <v-btn class="text-none" @click.native="cancel()" text rounded>Sair</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>

              <v-stepper-step
                editable
                :complete="step > 2"
                step="2"
                :rules="[() => formErrors.school.length == 0]"
              >
                Contactos da Instituição
                <small>Regsite os principais contactos da instituição</small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-form @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
                  <v-row>
                    <v-col cols="12">
                      <small>Registo de Contactos</small>
                    </v-col>

                    <v-col cols="12">
                      <template v-for="(phone,k) in formData.phones">
                        <v-row :key="k+'p'">
                          <v-col cols="12" md="4" class="my-0 py-0">
                            <v-text-field
                              outlined
                              :name="'phone'+k"
                              :label="'Número '+(k+1)"
                              v-model="phone.number"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.number'+k"
                              :error-messages="errors.collect('form-step-2.number'+k)"
                              @change="findRepeatedPhone(phone.number)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="7" class="my-0 py-0">
                            <v-text-field
                              outlined
                              :disabled="!phone.number"
                              :name="'description'+k"
                              :label="'Descrição do numero '+(k+1)"
                              v-model="phone.description"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.phone_description'+k"
                              :error-messages="errors.collect('form-step-2.phone_description'+k)"
                              @change="findRepeatedPhone(phone.description)"
                              :hint="'Apresente uma pequena descrição do número '+phone.number"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="1" align="start" class="my-0 py-0">
                            <v-btn
                              text
                              small
                              icon
                              color="warning"
                              @click="removePhone(k)"
                              v-show="k || ( !k && formData.phones.length > 1)"
                            >
                              <v-icon>mdi-phone-minus</v-icon>
                            </v-btn>

                            <v-btn
                              :disabled="canAddPhone(k)"
                              text
                              small
                              icon
                              color="primary"
                              @click="morePhone(k)"
                              v-show="k == formData.phones.length-1 && formData.phones.length < 3"
                            >
                              <v-icon>mdi-phone-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </template>
                      <v-row>
                        <v-col cols="12" v-if="repeatedPhone">
                          <small
                            class="red--text"
                          >Atenção que numeros repitidos não serão guardados na base de dados!!</small>
                        </v-col>
                        <v-col cols="12" v-if="formData.phones.length == 3">
                          <small class="warning--text">Atingiu a quantidade máxima de números</small>
                        </v-col>
                      </v-row>
                      <v-divide></v-divide>
                    </v-col>

                    <v-col cols="12">
                      <small>Registo de Correios Eletrónicos</small>
                    </v-col>

                    <v-col cols="12">
                      <template v-for="(email,k) in formData.emails">
                        <v-row :key="k+'p'">
                          <v-col cols="12" md="4" class="my-0 py-0">
                            <v-text-field
                              outlined
                              :name="'email'+k"
                              :label="'Email '+(k+1)"
                              v-model="email.email"
                              v-validate="'required|email'"
                              :data-vv-name="'form-step-2.email'+k"
                              :error-messages="errors.collect('form-step-2.email'+k)"
                              @change="findRepeatedEmail(email.email)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="7" class="my-0 py-0">
                            <v-text-field
                              outlined
                              :disabled="!email.email"
                              :name="'description'+k"
                              :label="'Descrição do email '+(k+1)"
                              v-model="email.description"
                              v-validate="'required'"
                              :data-vv-name="'form-step-2.email_description'+k"
                              :error-messages="errors.collect('form-step-2.email_description'+k)"
                              @change="findRepeatedEmail(email.description)"
                              :hint="'Apresente uma pequena descrição do email '+ email.email"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="1" align="start" class="my-0 py-0">
                            <v-btn
                              text
                              small
                              icon
                              color="warning"
                              @click="removeEmail(k)"
                              v-show="k || ( !k && formData.emails.length > 1)"
                            >
                              <v-icon>mdi-email-minus-outline</v-icon>
                            </v-btn>

                            <v-btn
                              :disabled="canAddEmail(k)"
                              text
                              small
                              icon
                              color="primary"
                              @click="moreEmail(k)"
                              v-show="k == formData.emails.length-1 && formData.emails.length < 3"
                            >
                              <v-icon>mdi-email-plus-outline</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </template>
                      <v-row>
                        <v-col cols="12" v-if="repeatedEmail">
                          <small
                            class="red--text"
                          >Atenção que numeros repitidos não serão guardados na base de dados!!</small>
                        </v-col>
                        <v-col cols="12" v-if="formData.emails.length == 3">
                          <small class="warning--text">Atingiu a quantidade máxima de números</small>
                        </v-col>
                      </v-row>
                      <v-divide></v-divide>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row row wrap class="my-3">
                    <v-col cols="12">
                      <v-btn class="text-none" text @click.native="prevStep()" rounded>Voltar</v-btn>
                      <v-btn class="text-none" text type="submit" color="primary" rounded>Seguinte</v-btn>
                      <v-btn class="text-none" @click.native="cancel()" text rounded>Sair</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>

              <v-stepper-step
                editable
                :complete="step > 3"
                step="3"
                :rules="[() => formErrors.school.length == 0]"
              >
                Enderço e Localização Geográfica
                <small>Apresende o enderço da isntituição e as suas coordenadas no mapa</small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-form @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
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
                      <v-btn class="text-none" @click.native="cancel()" text rounded>Sair</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>

              <v-stepper-step
                editable
                :complete="step > 4"
                step="4"
                :rules="[() => formErrors.school.length == 0]"
              >
                Apresentações Gerais
                <small>Configure as informações de apresentação da isntituição</small>
              </v-stepper-step>

              <v-stepper-content step="4">
                <v-form @submit.prevent="nextStep('form-step-2')" data-vv-scope="form-step-2">
                  <v-row>
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="12" md="6">
                          <upload-image-files
                            @handleFileUpload="uploadCover"
                            :rules="coverRules"
                            :label="'Imagem de rosto'"
                            :placeholder="'Carregar uma imagem de rosto'"
                          ></upload-image-files>
                        </v-col>
                        <v-col cols="12" md="6">
                          <upload-image-files
                            @handleFileUpload="uploadLogo"
                            :rules="logoRules"
                            :label="'Logotipo da isntituição'"
                            :placeholder="'Carregar um logo'"
                          ></upload-image-files>
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
                      <v-btn class="text-none" text type="submit" color="primary" rounded>Salvar</v-btn>
                      <v-btn class="text-none" @click.native="cancel()" text rounded>Sair</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import UploadImageFiles from "@/forms/UploadImageFiles";
import moment from "moment";
import { flashAlert } from "@/mixins/AppAlerts";
import { imageFilesRules } from "@/mixins/FileRules";
import { multFormData } from "@/mixins/HandleMultFormData";

export default {
  mixins: [imageFilesRules, flashAlert, multFormData],
  data() {
    return {
      step: 1,
      opningDateMenu: false,
      formErrors: {
        school: [],
        address: [],
        location: []
      },

      formData: {
        name: "",
        abbreviation: "",
        description: "",
        slogan: "",
        logo: "default.png",
        cover: "default.png",
        primary_color: "",
        secundary_color: "",
        opning: new Date().toISOString().substr(0, 10),
        phones: [
          {
            number: "",
            description: ""
          }
        ],
        emails: [
          {
            email: "",
            description: ""
          }
        ],
        address: {
          country: "Cabo Verde",
          state: "",
          city: "",
          zone: "",
          street: "",
          post_code: "",
          location: {
            lat: "22",
            lng: "29"
          }
        }
      },

      dictionary: validateDictionary
    };
  },
  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    valOpning() {
      return moment(new Date().toISOString().substr(0, 10)).format(
        "DD/MM/YYYY"
      );
    },

    formattingOpningDate() {
      return this.formData.opning
        ? moment(this.formData.opning).format("DD-MM-YYYY")
        : "";
    }
  },
  methods: {
    uploadCover(file) {
      this.formData.cover = file;
    },

    uploadLogo(file) {
      this.formData.logo = file;
    },

    cancel: function() {
      this.$router.go(-1);
    },

    // nextStep(scope) {
    //   this.$validator.validateAll(scope).then(result => {
    //     if (result) {
    //       this.step++;
    //     }
    //   });
    // },

    nextStep() {
      this.step++;
    },

    prevStep: function() {
      this.step--;
    }
  },
  components: {
    UploadImageFiles
  }
};
</script>
<template>
  <div class="background-login">
    <v-row align="center" justify="center">
      <v-col align="center" cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-10 pa-3" width="500">
          <v-card-text class="mb-0 pb-0">
            <div class="layout column align-center">
              <v-avatar color="primary" size="62">
                <v-icon large dark>mdi-account-plus</v-icon>
              </v-avatar>
              <h1 class="flex my-4 primary--text font-weight-light">
                EICM -
                <span class="font-weight-thin">Regoistar</span>
              </h1>
            </div>
            <v-form ref="form">
              <v-container grid-list-md ma-0 pa-0>
                <v-row>
                  <v-col cols="12" class="my-0 py-0">
                    <v-alert type="error" outlined :value="hasError">
                      <small>Erros resultantes do processamento, corrija-os e re-envie</small>
                    </v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.folk.name"
                      name="name"
                      label="Nome*"
                      type="text"
                      v-validate="'required|alpha'"
                      data-vv-name="name"
                      :error-messages="errors.collect('name')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.folk.lastname"
                      name="lastname"
                      label="Apelidos*"
                      type="text"
                      v-validate="'required|alpha_spaces'"
                      data-vv-name="lastname"
                      :error-messages="errors.collect('lastname')"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="py-0 my-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.email"
                      name="email"
                      label="Correio Eletrónico*"
                      type="text"
                      hint="exemplo@exemplo.cv"
                      v-validate="'required|email'"
                      data-vv-name="email"
                      :error-messages="errorMsg('email') || errors.collect('email')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.username"
                      name="username"
                      label="Nome de Utilizador*"
                      type="text"
                      v-validate="'required|alpha_dash'"
                      data-vv-name="username"
                      :error-messages="errorMsg('username') || errors.collect('username')"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="py-0 my-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.password"
                      name="password"
                      label="Palavra Passe*"
                      type="password"
                      ref="password"
                      v-validate="'required|min:8'"
                      data-vv-name="password"
                      :error-messages="errors.collect('password')"
                    ></v-text-field>
                  </v-col>

                  <!-- <v-col cols="12" md="6" class="py-0 my-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.password_confirmation"
                      name="password"
                      label="Confirmar Palavra Passe"
                      type="password"
                      v-validate="'required|confirmed:password'"
                      data-vv-name="password_confirmation"
                      :error-messages="errors.collect('password_confirmation')"
                    ></v-text-field>
                  </v-col>-->

                  <v-col cols="12" align="left" class="my-0 py-0">
                    <span class="grey--text text--darken-2">Escolha o Sexo (Opcional)</span>
                  </v-col>
                  <v-col cols="12" class="py-0 my-0">
                    <v-radio-group
                      dense
                      row
                      v-model="formData.folk.gender"
                      v-validate="'included:0,1,2'"
                      data-vv-name="gender"
                      :error-messages="errors.collect('gender')"
                    >
                      <v-radio label="Masculino" value="0"></v-radio>
                      <v-radio label="Feminino" value="1"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="my-0 py-0">
            <v-row>
              <v-col cols="12" class="py-0 my-0">
                <v-btn
                  class="text-none font-weight-light"
                  :to="{name: 'login_page'}"
                  small
                  text
                  dark
                  color="primary"
                >Fazer Login em vez disso</v-btn>
              </v-col>
              <!-- <v-col>
                <small>Regsitar conta utilizando:</small>
              </v-col>
              <v-col cols="12" class="py-0 my-0">
                <v-btn fab x-small color="facebook" dark>
                  <v-icon dark x-smal>mdi-facebook</v-icon>
                </v-btn>
                <v-btn x-small fab dark color="twitter">
                  <v-icon dark>mdi-twitter</v-icon>
                </v-btn>
                <v-btn x-small fab dark color="google">
                  <v-icon dark>mdi-google-plus</v-icon>
                </v-btn>
              </v-col>-->
              <v-col cols="12" align="center">
                <v-btn
                  tile
                  class="text-none ma-1"
                  @click="register()"
                  width="130"
                  :color="hasError?'error':'primary'"
                >{{hasError?'Re-Enviar':'Registar'}}</v-btn>
                <!-- <v-btn class="text-none ma-1" tile  @click="register()" outlined>Sair</v-btn> -->
              </v-col>

              <v-col cols="12" align="left">
                <small class="grey--text text--darken-2">(*) - Não pode faltar</small>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { flashAlert } from "@/mixins/AppAlerts";
import { clearForm } from "@/mixins/Form";
import { getBackEndError } from "@/mixins/SendForm";

export default {
  name: "register_page",
  mixins: [flashAlert, clearForm, getBackEndError],

  data() {
    return {
      formErrors: [],
      hasError: false,

      formData: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        folk: {
          name: "",
          lastname: ""
        }
      },
      sending: false,
      acoountCreated: false
    };
  },

  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal("Hello Vue world!!!");
    },
    register() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.sending = true;
          //eslint-disable-next-line
          axios
            .post("register", this.$data.formData)
            //eslint-disable-next-line
            .then(response => {
              this.hasError = false;
              this.formErrors = [];
              this.sending = false;
              this.acoountCreated = true;

              this.registerCreated(
                "info",
                "Conta Criada com Sucesso",
                "Os seus dados já foram registados, aguarde a sua ativação",
                "EICM-GDC aprecía muito pela sua colaboração"
              );

              this.clear();
              this.$router.push({ path: "/" });
            })
            .catch(err => {
              this.sending = false;
              this.acoountCreated = false;
              if (err.response) {
                this.hasError = true;
                this.formErrors = err.response.data.errors;
              }
            });
        }
      });
    }
  }
};
</script>

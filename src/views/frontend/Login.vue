<template>
  <div class="background-login">
    <v-app id="inspire">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-5 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    :src="require('../../assets/app/logo.png')"
                    alt="EICM-GDC"
                    width="120"
                    height="120"
                  />
                  <h1 class="flex my-4 primary--text font-weight-light">EICM-GDC</h1>
                  <small>Autenticar no sistema {{too_many_req}}</small>
                </div>

                <v-flex xs12>
                  <v-alert
                    :value="loginError"
                    color="error"
                    icon="mdi-alert"
                    outlined
                    dismissible
                    transition="scale-transition"
                  >{{loginError}}</v-alert>
                </v-flex>

                <v-form>
                  <v-container grid-list-sm ma-0 pa-0>
                    <v-row>
                      <v-col cols="12" class="py-0 my-0">
                        <v-text-field
                          v-model="formData.email"
                          append-icon="mdi-account-key"
                          name="login"
                          label="Email"
                          type="text"
                          @keyup.enter="authenticate()"
                          v-validate="'required|email'"
                          data-vv-name="email"
                          :error-messages="errors.collect('email')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="py-0 ma-y">
                        <v-text-field
                          v-model="formData.password"
                          :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="() => (passIcon = !passIcon)"
                          :type="passIcon ? 'password' : 'text'"
                          name="password"
                          label="Password"
                          @keyup.enter="authenticate()"
                          v-validate="'required'"
                          data-vv-name="password"
                          :error-messages="errors.collect('password')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col cols="12" class="py-0 my-0">
                    <v-btn
                      class="text-none font-weight-light no"
                      :to="{name: 'register_page'}"
                      small
                      text
                      dark
                      color="primary"
                    >Ainda não tenho conta registada, quero criar uma...</v-btn>
                  </v-col>

                  <v-col>
                    <small>Autenticar usando a minha conta de:</small>
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
                  </v-col>

                  <v-col cols="12" align="right" class="pr-5">
                    <v-btn
                      @click="authenticate()"
                      text
                      small
                      right
                      outlined
                      color="primary"
                    >Autenticar</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { login } from "@/helpers/auth";
import validateDictionary from "@/helpers/api/validateDictionary";
import { flashAlert } from "@/mixins/AppAlerts";

export default {
  mixins: [flashAlert],

  data() {
    return {
      sending: false,
      too_many_req: "",
      formData: {
        email: "",
        password: "",
        remember_token: false
      },
      passIcon: true,
      dictionary: validateDictionary
    };
  },

  computed: {
    loginError: function() {
      return this.$store.getters.authError;
    }
  },

  methods: {
    togglePassIcon() {
      this.passIcon = !this.passIcon;
    },
    authenticate() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.sending = true;
          this.$store.dispatch("login");
          login(this.$data.formData)
            .then(response => {
              this.feedback(
                "success",
                "Autenticação efetuada com sucesso. Obrigado!",
                5000,
                true,
                "bottom-left"
              );
              this.$store.commit("loginSuccess", response);
              this.$router.push({ path: "/" });
              this.sending = false;
            })
            .catch(error => {
              this.$store.commit("loginFailed", { error });
              this.sending = false;
              this.too_many_req = error;
            });
        }
      });
    }
  },
  mounted() {
    this.$validator.localize("pt", this.dictionary);
  }
};
</script>

<style lang="css">
.background-login {
  background-image: url("../../assets/app/statics/Slide2.gif?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
  background-size: cover;
}
#inspire {
  background: none;
}
</style>

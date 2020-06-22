<template>
  <div class="background-login">
    <!-- <v-app id="inspire"> -->
    <!-- <v-container fluid fill-height> -->
      <!-- ../../assets/app/statics/login_cover.gif -->

      <v-row justify="center" align="center">
        <v-col align="center" cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-10" width="350" tile>
            <v-card-text class="mb-0 pb-0">
              <div class="layout column align-center">
                <v-avatar color="primary" size="62">
                  <v-icon large dark>mdi-lock</v-icon>
                </v-avatar>
                <h1 class="flex my-4 primary--text font-weight-light">
                  EICM -
                  <span class="font-weight-thin">Login</span>
                </h1>
              </div>

              <v-flex xs12>
                <v-alert
                  dense
                  tile
                  :value="loginError"
                  color="error"
                  icon="mdi-lock-alert"
                  border="right"
                  colored-border
                  dismissible
                  elevation="3"
                  transition="scale-transition"
                >
                  <small>{{loginError}}</small>
                </v-alert>
              </v-flex>

              <v-form>
                <v-container grid-list-sm ma-0 pa-0>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        dense
                        outlined
                        v-model="formData.email"
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
                        dense
                        outlined
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
            <v-card-actions class="mt-0 pt-0">
              <v-row>
                <v-col cols="12" class="py-0 my-0">
                  <v-btn
                    class="text-none font-weight-light no"
                    :to="{name: 'register_page'}"
                    small
                    text
                    dark
                    color="primary"
                  >criar uma conta</v-btn>
                </v-col>

                <!-- <v-col>
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
                </v-col>-->

                <v-col cols="12" align="center">
                  <v-btn
                    @click="authenticate()"
                    tile
                    color="primary"
                    class="text-none"
                  >Autenticar</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    <!-- </v-container> -->
    <!-- </v-app> -->
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
  background-image: url("../../assets/app/statics/login_cover.gif");
  background-size: cover;
  min-height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -30px;
}
#inspire {
  background: none;
}
</style>

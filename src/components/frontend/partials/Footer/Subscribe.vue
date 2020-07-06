<template>
  <div>
    <v-form ref="form" data-vv-scope="form-subscribe">
      <v-col cols="12" class="px-0">
        <v-text-field
          dense
          v-model="formData.email"
          solo
          name="email"
          label="Insira o seu e-mail"
          id="id"
          v-validate="'required|email'"
          data-vv-name="form-subscribe.email"
          :error-messages="errorMsg('email') || errors.collect('form-subscribe.email')"
          hint="Por favor seja claro e direto com a sua mensagem..."
          @keyup.enter="subscribe('form-subscribe')"
        >
          <template v-slot:append>
            <v-btn @click="subscribe('form-subscribe')" icon>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-form>

    <v-col cols="12" class="pa-0">
      <v-dialog v-model="unsubscribe_dialog" persistent max-width="460px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            text
            color="grey lighten-1"
            class="text-none font-weight-light"
          >Retirar a subscrição</v-btn>
        </template>
        <!-- <v-card tile>
          <v-card-title class="center">
            <v-col align="center" class="pa-0 ma-0">
            <span class="headline primary--text text-center">Cancelar a minha subscrição</span>
            </v-col>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pb-0">
            <v-container pb-0>
              <v-row>
                <v-col cols="12" class="px-0 pb-0">
                  <v-text-field outlined label="Insira o email subscrito" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn small color="grey darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn small color="primary" text @click="dialog = false">Enviar</v-btn>
          </v-card-actions>
        </v-card>-->

        <v-card class="mx-auto" max-width="500">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-btn @click="closeDialog()" icon x-small color="error">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-window v-model="step">
            <v-form ref="form" data-vv-scope="form-unsubscribe">
              <v-window-item :value="1">
                <v-card-text class="my-0 py-0" v-if="err_msg">
                  <v-alert
                    dense
                    tile
                    color="error"
                    icon="mdi-email-alert"
                    border="right"
                    colored-border
                    dismissible
                    elevation="3"
                    transition="scale-transition"
                  >
                    <small>{{err_msg}}</small>
                  </v-alert>
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="cancel_email"
                    placeholder="exemplo@eicm.cv"
                    v-validate="'required|email'"
                    data-vv-name="form-unsubscribe.cancel_email"
                    :error-messages="errors.collect('form-unsubscribe.cancel_email')"
                    hint="Por favor seja claro e direto com a sua mensagem..."
                  ></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >Introduza o email que corresponde à respectiva subscrição</span>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-card-text class="my-0 py-0" v-if="unsub_err_msg">
                  <v-alert
                    v-model="unsubscribe_alert"
                    dense
                    tile
                    color="error"
                    icon="mdi-form-textbox-password"
                    border="right"
                    colored-border
                    dismissible
                    elevation="3"
                    transition="scale-transition"
                  >
                    <small>{{unsub_err_msg}}</small>
                  </v-alert>
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    v-model="code"
                    label="Código de confirmação"
                    name="code"
                    v-validate="'required'"
                    data-vv-name="form-unsubscribe.code"
                    :error-messages="errors.collect('form-unsubscribe.code')"
                  ></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >Copie o código que foi lhe enviado por email e cole-o aqui</span>
                </v-card-text>
              </v-window-item>
            </v-form>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <!-- <v-btn small :disabled="step === 1" text @click="step--">Anterior</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn
              small
              text
              v-if="step < 2"
              color="primary"
              depressed
              @click="nextStep('form-unsubscribe')"
              :loading="sending"
            >
              Seguinte
              <template v-slot:loader>
                <span>Verificando...</span>
              </template>
            </v-btn>
            <v-btn
              small
              text
              v-if="step === 2"
              color="primary"
              @click="unSubscribe('form-unsubscribe')"
              @keyup.enter="unSubscribe('form-unsubscribe')"
              depressed
            >Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { flashAlert } from "@/mixins/AppAlerts";
import { clearForm } from "@/mixins/Form";
import { getBackEndError } from "@/mixins/SendForm";
export default {
  mixins: [flashAlert, clearForm, getBackEndError],

  data() {
    return {
      formErrors: {},
      err_msg: "",
      unsub_err_msg: "",
      unsubscribe_dialog: false,
      unsubscribe_alert: false,
      step: 1,
      sending: false,

      email: "",
      code: "",

      formData: {
        email: ""
      },

      dictionary: validateDictionary
    };
  },

  mounted() {
    // Para utilizar mensagens de valida;\oes personalizadas
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Email subscrito";
        case 2:
          return "Verificação";
        default:
          return "Canselar subscrição";
      }
    }
  },

  methods: {
    closeDialog() {
      this.unsubscribe_dialog = false;
      this.unsubscribe_alert = false;
    },
    nextStep(scope) {
      this.err_msg = "";
      this.sending = false;
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          this.sending = true;
          // eslint-disable-next-line no-undef
          axios
            .get("verify_subscriber/" + this.$data.email)
            .then(response => {
              if (!response.data.exist) {
                this.sending = false;
                this.err_msg = response.data.msg;
                return;
              }
              this.sending = false;
              this.step++;
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log(err);
              this.sending = false;
              this.err_msg = "Ocorreu algum problema com a operação";
            });
        }
      });
    },
    subscribe(scope) {
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          //eslint-disable-next-line no-undef
          axios
            .post("subscribe", this.$data.formData)
            .then(response => {
              this.formErrors = {};
              this.clear();
              this.registerCreated(
                "success",
                "Subscrito",
                response.data.msg,
                "A equipa da EICM-GDC agradece a sua subscrição, de agora em diante receberás notificações das nossas publicações em primeira mão"
              );
            })
            .catch(err => {
              this.formErrors = err.response.data.errors;
            });
        }
      });
    },

    unSubscribe(scope) {
      (this.unsub_err_msg = ""),
        this.$validator.validateAll(scope).then(noErrorOnValidate => {
          if (noErrorOnValidate) {
            // eslint-disable-next-line no-undef
            axios
              .get("unsubscribe/" + this.$data.email + "/" + this.$data.code)
              .then(response => {
                if (response.data.success) {
                  this.unsubscribe_dialog = false;
                  this.feedback(
                    response.data.success ? "success" : "error",
                    response.data.msg,
                    3000,
                    true,
                    "top-end"
                  );
                  this.unsub_err_msg = "";
                  return;
                }
                this.unsub_err_msg = "Verifique o código";
              })
              .catch(err => {
                // eslint-disable-next-line no-console
                console.log(err);
                this.msg = "Ocorreu algum problema com a operação";
              });
          }
        });
    }
  }
};
</script>
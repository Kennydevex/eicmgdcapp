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
          :error-messages="errors.collect('form-subscribe.email')"
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
      <v-dialog v-model="dialog" persistent max-width="400px">
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
            <v-btn @click="dialog=false" icon x-small color="error">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-window v-model="step">
            <v-form ref="form" data-vv-scope="form-unsubscribe">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field
                    v-model="formData2.email"
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
                <v-card-text>
                  <v-text-field label="Código de confirmação" type="password"></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >Insira o código de confirmação que foi emviado pa o email</span>
                </v-card-text>
              </v-window-item>
            </v-form>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn small :disabled="step === 1" text @click="step--">Anterior</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              small
              text
              v-if="step < 2"
              color="primary"
              depressed
              @click="nextStep('form-unsubscribe')"
            >Seguinte</v-btn>
            <v-btn
              small
              text
              v-if="step === 2"
              color="primary"
              @click="subscribe()"
              @keyup.enter="subscribe()"
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
export default {
  mixins: [flashAlert, clearForm],

  data() {
    return {
      dialog: false,
      step: 1,

      formData: {
        email: ""
      },

      formData2: {
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
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  },

  methods: {
    nextStep(scope) {
      this.$validator.validateAll(scope).then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          this.step++;
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
              this.clear();
              this.registerCreated(
                "success",
                "Subscrito",
                response.data.msg,
                "A equipa da EICM-GDC agradece a sua subscrição, de agora em diante receberás notificações das nossas publicações em primeira mão"
              );
            })
            .catch(err => {
              //eslint-disable-next-line no-console
              console.log(err);
            });
        }
      });
    },

    unSubscribe() {}
  }
};
</script>
<template>
  <div>
    <v-form ref="form">
      <v-col cols="12" class="px-0">
        <v-text-field
          dense
          v-model="formData.email"
          solo
          name="email"
          label="Insira o seu e-mail"
          id="id"
          v-validate="'required|email'"
          data-vv-name="email"
          :error-messages="errors.collect('email')"
          hint="Por favor seja claro e direto com a sua mensagem..."
        >
          <template v-slot:append>
            <v-btn @click="subscribe()" icon>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-form>

    <v-col cols="12" class="px-0">
      <v-btn small text color="grey lighten-1" class="text-none">Retirar a minha subscrição</v-btn>
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

  methods: {
    subscribe() {
      this.$validator.validateAll().then(noErrorOnValidate => {
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
    }
  }
};
</script>
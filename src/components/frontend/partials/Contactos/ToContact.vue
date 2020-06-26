<template>
  <v-card flat color="transparent">
    <v-card-text class="mx-0 px-0">
      <v-form ref="form">
        <v-row>
          <v-col cols="12" class="my-0 py-0">
            <v-text-field
              :disabled="!!authUser"
              color="primary"
              label="Nome"
              v-model="formData.name"
              name="name"
              v-validate="'required'"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="my-0 py-0">
            <v-text-field
              :disabled="!!authUser"
              color="primary"
              label="Email"
              v-model="formData.from"
              name="email"
              v-validate="'required|email'"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="12" class="my-0 py-0">
            <v-radio-group class="my-0 py-0" v-model="formData.to" row>
              <span>Para:</span>
              <v-radio color="secundary" label="Direção" value="director@gmail.com"></v-radio>
              <v-radio color="secundary" label="Sub-Direção" value="subdiretor@gmail.com"></v-radio>
              <v-radio color="secundary" label="Secretaria" value="sec@gmail.com"></v-radio>
            </v-radio-group>
          </v-col>-->

          <v-col cols="12" class="my-0 py-0">
            <v-autocomplete
              v-model="formData.subject"
              ref="subject"
              color="primary"
              no-data-text="Este assunto não está disponível, escolha 'Outros' e especifique o seu assunto"
              label="Escolha um assunto"
              :items="subjects"
              v-validate="'required'"
              data-vv-name="subject"
              :error-messages="errors.collect('subject')"
              name="subject"
            ></v-autocomplete>
          </v-col>

          <template v-if="formData.subject=='Outros'">
            <v-col cols="12" class="my-0 py-0">
              <v-text-field
                color="primary"
                label="Assunto"
                v-model="formData.otherSubject"
                name="otherSubject"
                hint="Especifíque o seu assunto..."
                v-validate.immediate="'required_if:subject,Outros'"
                data-vv-name="otherSubject"
                :error-messages="errors.collect('otherSubject')"
              ></v-text-field>
            </v-col>
          </template>

          <v-col cols="12" class="my-0 py-0">
            <v-textarea
              color="primary"
              outlined
              rows="4"
              auto-grow
              label="Escreva aqui a sua mensagem"
              v-model="formData.content"
              name="message"
              v-validate="'required'"
              data-vv-name="message"
              :error-messages="errors.collect('message')"
              hint="Por favor seja claro e direto com a sua mensagem..."
            ></v-textarea>
          </v-col>

          <v-col
            v-if="formData.name && formData.from && formData.content && (formData.subject || formData.otherSubject)"
            cols="12"
            align="right"
            class="my-0 py-0"
          >
            <v-btn small color="primary" outlined @click="sendMessage()">Enviar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { flashAlert } from "@/mixins/AppAlerts";
import { clearForm } from "@/mixins/Form";

export default {
  mixins: [flashAlert, clearForm],

  data() {
    return {
      subjects: [
        "Reunião com os pais",
        "Matrículas/Propínas",
        "Vaga dos Cursos",
        "Formação Profossional",
        "Outros"
      ],
      formData: {
        name: "",
        from: "",
        to: "",
        subject: "",
        otherSubject: "",
        content: ""
      },
      dictionary: validateDictionary
    };
  },

  mounted() {
    // Para utilizar mensagens de valida;\oes personalizadas
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.setContactFields();
  },

  methods: {
    setContactFields() {
      if (this.authUser) {
        this.formData.name = this.authUser.username;
        this.formData.from = this.authUser.email;
      }
    },

    sendMessage() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          //eslint-disable-next-line no-undef
          axios
            .post("to_contact", this.$data.formData)
            .then(response => {
              this.clear();
              this.registerCreated(
                "success",
                "Mensagem Inviada",
                response.data.msg,
                "A equipa da EICM-GDC agradece o seu contacto, e promete retorna-lo em breve"
              );

              // this.feedback(
              //   "success",
              //   response.data.msg,
              //   3000,
              //   true,
              //   "top-end"
              // );
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

<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-xs fluid>
            <v-row>
              <v-col cols="12" class="my-0 py-0" sm="6">
                <v-text-field
                  :disabled="!!authUser"
                  color="primary"
                  label="Nome"
                  v-model="messageInfo.name"
                  name="name"
                  v-validate="'required'"
                  data-vv-name="name"
                  :error-messages="errors.collect('name')"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="my-0 py-0" sm="6">
                <v-text-field
                  :disabled="!!authUser"
                  color="primary"
                  label="Email"
                  v-model="messageInfo.from"
                  name="email"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  :error-messages="errors.collect('email')"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="my-0 py-0">
                <p>Para:</p>
                <v-radio-group v-model="messageInfo.to" row>
                  <v-radio color="secundary" label="Direção" value="director@gmail.com"></v-radio>
                  <v-radio color="secundary" label="Sub-Direção" value="subdiretor@gmail.com"></v-radio>
                  <v-radio color="secundary" label="Secretaria" value="sec@gmail.com"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" class="my-0 py-0">
                <v-select
                  color="primary"
                  ref="subject"
                  v-validate="'required'"
                  data-vv-name="subject"
                  :error-messages="errors.collect('subject')"
                  name="subject"
                  :items="subjects"
                  v-model="messageInfo.subject"
                  label="Escolha um assunto"
                  chips
                  deletable-chips
                ></v-select>
              </v-col>

              <template v-if="messageInfo.subject=='Outros'">
                <v-col cols="12" class="my-0 py-0">
                  <v-text-field
                    color="primary"
                    label="Assunto"
                    v-model="messageInfo.otherSubject"
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
                  outline
                  rows="2"
                  auto-grow
                  label="Escreva aqui a sua mensagem"
                  v-model="messageInfo.content"
                  name="message"
                  v-validate="'required'"
                  data-vv-name="message"
                  :error-messages="errors.collect('message')"
                  hint="Por favor seja claro e direto com a sua mensagem..."
                ></v-textarea>
              </v-col>

              <v-col cols="12" align="right" class="my-0 py-0">
                <v-btn small color="primary" outlined round @click="sendMessage()">Enviar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
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
        "Matricula",
        "Aulas",
        "Pautas",
        "Propínas",
        "Provas",
        "Cursos",
        "Formação Profossional",
        "Outros"
      ],
      messageInfo: {
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
        this.messageInfo.name = this.authUser.username;
        this.messageInfo.from = this.authUser.email;
      }
    },

    sendMessage() {
      this.$validator.validateAll().then(noErrorOnValidate => {
        if (noErrorOnValidate) {
          axios
            .post("services/to_contact", this.$data.messageInfo)
            .then(response => {
              this.clear();
              this.feedback("success", response.data.msg, 3000, true, "top");
            })
            .catch(err => {
              console.log();
            });
        }
      });
    }
  }
};
</script>

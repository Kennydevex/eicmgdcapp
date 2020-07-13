<template>
  <div>
    <v-form ref="form">
      <v-container grid-list-xs pa-0 ma-0>
        <v-row>
          <v-col cols="12" class="mb-5" align="center">
            <v-avatar
              class="photo-perfil"
              @click="onActivePerfilPhotoField"
              :color="formData.employee.perfil_photo?'white':'primary'"
              :size="formData.employee.perfil_photo?100:80"
            >
              <img v-if="formData.employee.perfil_photo" :src="perfilPhotoPath" />
              <v-icon v-else dark large>mdi-cloud-upload</v-icon>
            </v-avatar>
            <br />
            <small>{{formData.employee.perfil_photo?'Imagem de Perfil do Colaborador':'Carregar uma foto de perfil'}}</small>

            <input
              accept="image/png, image/jpeg"
              style="display:none"
              type="file"
              @change="onPerfilPhotoChange"
              name="perfil_photo"
              ref="upload_perfil_photo_form"
            />
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              dense
              label="Nome"
              name="name"
              v-model="formData.employee.folk.name"
              outlined
              v-validate="'required|alpha'"
              data-vv-name="name"
              :error-messages="errorMsg('employee.folk.name') || errors.collect('name')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              dense
              label="Apelido"
              name="lastname"
              v-model="formData.employee.folk.lastname"
              outlined
              v-validate="'required|alpha_spaces'"
              data-vv-lastname="lastname"
              :error-messages="errorMsg('employee.folk.lastname') || errors.collect('lastname')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              placeholder="000000"
              v-mask="'######'"
              dense
              label="BI"
              name="ic"
              v-model="formData.employee.ic"
              outlined
              v-validate="'required|numeric|max:6'"
              data-vv-name="ic"
              :error-messages="errorMsg('employee.ic') || errors.collect('ic')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <input
              style="display:none"
              name="birthdate_field_target"
              ref="valBirthdateRef"
              v-model="actual_date"
              type="text"
            />
            <v-menu
              v-model="birthdate_menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              ref="birth_date_menu"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  outlined
                  name="birthdate"
                  :value="formated(formData.employee.folk.birthdate)"
                  label="Nascimento"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  v-validate="'date_format:dd/MM/yyyy|before:valBirthdateRef'"
                  data-vv-as="birthdate"
                  :error-messages="errorMsg('employee.folk.birthdate') || errors.collect('birthdate')"
                ></v-text-field>
                <!-- error-messages="Teste" -->
              </template>
              <v-date-picker
                no-title
                ref="birth_date_picker"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                v-model="formData.employee.folk.birthdate"
                @input="birthdate_menu=false"
                locale="pt-pt"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-radio-group
              dense
              v-model="formData.employee.folk.gender"
              row
              v-validate="'included:0,1,2'"
              data-vv-name="gender"
              :error-messages="errors.collect('gender')"
            >
              <v-radio label="Masculino" value="0"></v-radio>
              <v-radio label="Feminino" value="1"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row class="mt-5">
          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              dense
              placeholder="(+238) 000-00-00"
              v-mask="'(+238) ###-##-##'"
              label="Telefone"
              name="phone"
              v-model="formData.employee.phone"
              outlined
              v-validate="'required|length:16'"
              data-vv-name="phone"
              :error-messages="errorMsg('employee.phone') || errors.collect('phone')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              dense
              label="Email Coorporativo"
              name="email"
              v-model="formData.employee.email"
              outlined
              v-validate="'email'"
              data-vv-name="email"
              @change="setAccountEmail"
              :error-messages="errorMsg('employee.email') || errors.collect('email')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="my-0 py-0">
            <v-subheader>Sessão de utilizador e autenticação</v-subheader>
          </v-col>

          <v-col cols="12" class="mb-0 py-0">
            <v-checkbox
              dense
              label="Vincular este colaborador a uma conta de utilizador"
              v-model="formData.sync_user_account"
              @change="setCoEmail"
            ></v-checkbox>
            <v-divider></v-divider>
          </v-col>

          <template v-if="formData.sync_user_account">
            <v-col cols="12" class="mb-0 py-0">
              <v-checkbox
                :disabled="formData.employee.email==''"
                @change="setAccountEmail"
                label="Utilizar o email coorporativo"
                v-model="formData.co_email"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" :md="update_form?'6':'12'" class="mb-0 py-0">
              <v-text-field
                dense
                :disabled="formData.co_email"
                label="Email de autenticação*"
                name="user_mail"
                v-model="formData.employee.folk.user.email"
                outlined
                :error-messages="errorMsg('employee.folk.user.email') || auth_errors.email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="mb-0 py-0">
              <v-text-field
                dense
                label="Nome de Utilizador*"
                name="username"
                v-model="formData.employee.folk.user.username"
                outlined
                :error-messages="errorMsg('employee.folk.user.username') || auth_errors.username"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
              class="mb-0 py-0"
              v-if="!update_form || !formData.employee.folk.user"
            >
              <v-text-field
                :disabled="default_password"
                dense
                outlined
                v-model="formData.employee.folk.user.password"
                :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_pass ? 'text' : 'password'"
                name="user_password"
                label="Palavra Passe"
                counter
                ref="col_password"
                @click:append="show_pass = !show_pass"
                hint="Caso não seja inserida uma Palavra Passe, o utilizador terá uma palavra passe predefenida"
                persistent-hint
                :error-messages="errorMsg('employee.folk.user.password')"
              ></v-text-field>
            </v-col>
          </template>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="mt-5 mb-0 pb-0">
            <small>(*) campos de preenchimento obrigatório</small>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getDatas, getBackEndError } from "@/mixins/SendForm";
import { dateFormat } from "@/mixins/DateTime";

export default {
  mixins: [
    clearForm,
    flashAlert,
    sendFormData,
    getDatas,
    getBackEndError,
    dateFormat
  ],
  props: ["formData", "update_form"],

  data() {
    return {
      auth_errors: { email: "", username: "", password: "" },
      default_password: false,
      show_pass: false,
      formErrors: [],
      birthdate_menu: false,
      activity_begin_menu: false,
      activity_end_menu: false
    };
  },

  watch: {
    birthdate_menu(val) {
      val &&
        setTimeout(() => (this.$refs.birth_date_picker.activePicker = "YEAR"));
    }
  },

  created() {
    window.getApp.$on("APP_ADD_TEACHER", add_new => {
      this.add(
        add_new,
        "teachers",
        this.$props.formData,
        "APP_UPDATE_ALL_TEACHERS_DATA",
        "APP_ADD_TEACHER_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_TEACHER", () => {
      this.update(
        "teachers/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_TEACHER_MODAL"
      );
    });
  },

  computed: {
    perfilPhotoPath() {
      return this.formData.employee.perfil_photo
        ? this.formData.employee.perfil_photo.length > 100
          ? this.formData.employee.perfil_photo
          : this.apiUrl +
            "/images/app/resources/employees/" +
            this.formData.employee.perfil_photo
        : this.apiUrl + "/images/app/resources/employees/default.svg";
    }
  },

  methods: {
    checkAuthForm: function() {
      this.auth_errors = { email: "", username: "", password: "" };

      if (this.formData.sync_user_account) {
        if (!this.formData.employee.folk.user.username)
          this.auth_errors.username =
            "Obrigatório introduzir um nome de utilizador";

        if (!this.formData.employee.folk.user.email)
          this.auth_errors.email = "Obrigatório introduzir email";
        else if (
          !this.validateAuthEmail(this.formData.employee.folk.user.email)
        )
          this.auth_errors.email = "O email introduzido não é válido";

        if (!this.auth_errors.length) return true;
      }
      return true;
    },

    validateAuthEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    setCoEmail() {
      if (!this.formData.sync_user_account) {
        this.formData.co_email = false;
      }
    },
    setAccountEmail() {
      if (this.formData.sync_user_account && this.formData.co_email)
        this.formData.employee.folk.user.email = this.formData.employee.email;
      else this.formData.employee.folk.user.email = "";
    },

    onActivePerfilPhotoField() {
      this.$refs.upload_perfil_photo_form.click();
    },

    onPerfilPhotoChange(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = event => {
        this.formData.employee.perfil_photo = event.target.result;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-perfil {
  cursor: pointer;
}
</style>
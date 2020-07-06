<template>
  <div>
    <v-form ref="form">
      <v-container grid-list-xs pa-0 ma-0>
        <v-row>
          <v-col cols="12" class="pb-5" align="center">
            <v-avatar
              class="photo-perfil"
              @click="onActivePerfilPhotoField"
              :color="formData.perfil_photo?'white':'primary'"
              :size="formData.perfil_photo?100:80"
            >
              <img v-if="formData.perfil_photo" :src="perfilPhotoPath" />
              <!-- <img v-if="formData.perfil_photo" :src="formData.perfil_photo" /> -->
              <v-icon v-else dark large>mdi-cloud-upload</v-icon>
            </v-avatar>
            <br />
            <small>{{formData.perfil_photo?'Imagem de Perfil do Colaborador':'Carregar uma foto de perfil'}}</small>

            <input
              accept="image/png, image/jpeg"
              style="display:none"
              type="file"
              @change="onPerfilPhotoChange"
              name="perfil_photo"
              ref="upload_perfil_photo_form"
            />
          </v-col>

          <v-col cols="12" class="my-0 py-0">
            <v-divider></v-divider>
            <v-subheader>Informações Básicas</v-subheader>
          </v-col>

          <!-- =============================================================== -->

          <v-col cols="12" md="5" class="mb-0 py-0">
            <v-text-field
              dense
              label="Nome"
              name="name"
              v-model="formData.folk.name"
              outlined
              v-validate="'required|alpha'"
              data-vv-name="name"
              :error-messages="errorMsg('folk.name') || errors.collect('name')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="5" class="mb-0 py-0">
            <v-text-field
              dense
              label="Apelido"
              name="lastname"
              v-model="formData.folk.lastname"
              outlined
              v-validate="'required|alpha_spaces'"
              data-vv-lastname="lastname"
              :error-messages="errorMsg('folk.lastname') || errors.collect('lastname')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2" class="mb-0 py-0">
            <v-text-field
              placeholder="000000"
              v-mask="'######'"
              dense
              label="BI"
              name="ic"
              v-model="formData.ic"
              outlined
              v-validate="'required|numeric|max:6'"
              data-vv-name="ic"
              :error-messages="errorMsg('ic') || errors.collect('ic')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="5" class="mb-0 py-0">
            <v-radio-group
              dense
              v-model="formData.folk.gender"
              row
              v-validate="'included:0,1,2'"
              data-vv-name="gender"
              :error-messages="errors.collect('gender')"
            >
              <v-radio label="Masculino" value="0"></v-radio>
              <v-radio label="Feminino" value="1"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" md="7" class="mb-0 py-0">
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
                  :value="formated(formData.folk.birthdate)"
                  label="Nascimento"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  v-validate="'date_format:dd/MM/yyyy|before:valBirthdateRef'"
                  data-vv-as="birthdate"
                  :error-messages="errorMsg('folk.birthdate') || errors.collect('birthdate')"
                ></v-text-field>
                <!-- error-messages="Teste" -->
              </template>
              <v-date-picker
                no-title
                ref="birth_date_picker"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                v-model="formData.folk.birthdate"
                @input="birthdate_menu=false"
                locale="pt-pt"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="my-0 py-0">
            <v-subheader>Informações de Contactos</v-subheader>
          </v-col>

          <!-- =============================================================== -->

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              dense
              placeholder="(+238) 000-00-00"
              v-mask="'(+238) ###-##-##'"
              label="Telefone"
              name="phone"
              v-model="formData.phone"
              outlined
              v-validate="'required|length:16'"
              data-vv-name="phone"
              :error-messages="errorMsg('phone') || errors.collect('phone')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-text-field
              dense
              label="Email Coorporativo"
              name="email"
              v-model="formData.email"
              outlined
              v-validate="'email'"
              data-vv-name="email"
              @change="setAccountEmail"
              :error-messages="errorMsg('email') || errors.collect('email')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="my-0 py-0">
            <v-subheader>Funções e responsabilidades</v-subheader>
          </v-col>

          <!-- =============================================================== -->
          <v-col cols="12" class="mb-0 py-0">
            <v-checkbox
              dense
              label="Este colaborador também leciona nesta escola"
              v-model="formData.is_teacher"
            ></v-checkbox>
          </v-col>

          <template v-for="(encumbrance,k) in formData.charges">
            <v-row :key="k+'encumbrance'" class="mx-1">
              <v-col cols="12" md="6" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  auto-select-first
                  v-model="formData.school_id"
                  name="schools"
                  outlined
                  no-data-text="Sem escola registado"
                  label="Instituição"
                  :items="schools"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-city"
                  v-validate="'required'"
                  data-vv-name="schools"
                  :error-messages="errors.collect('schools')"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  v-model="encumbrance.encumbrance.charge_id"
                  name="charges"
                  outlined
                  no-data-text="Sem cargos registados"
                  label="Função do colaborador"
                  :items="charges"
                  item-text="name"
                  item-value="id"
                  prepend-inner-icon="mdi-account-tie"
                  v-validate="'required'"
                  data-vv-name="charges"
                  :error-messages="errorMsg('charges.'+k+'.encumbrance.charge_id') || errors.collect('charges')"
                >
                  <template v-slot:append-outer>
                    <v-btn small icon color="primary" @click="addMoreCharges()">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="6" class="mb-0 py-0">
                <input
                  style="display:none"
                  name="activity_begin_field_target"
                  ref="valActivityBeginRef"
                  v-model="actual_date"
                  type="text"
                />
                <v-menu
                  v-model="activity_begin_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  ref="activity_begin_menu"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      dense
                      outlined
                      name="activity_begin"
                      :value="formated(encumbrance.encumbrance.activity_begin)"
                      label="Início de atividade"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-on="on"
                      v-validate="'required|date_format:dd/MM/yyyy|before:valActivityBeginRef'"
                      data-vv-as="activity_begin"
                      :error-messages="errorMsg('charges.'+k+'.encumbrance.activity_begin') || errors.collect('activity_begin')"
                    ></v-text-field>
                    <!-- error-messages="Teste" -->
                  </template>
                  <v-date-picker
                    no-title
                    ref="activity_begin_picker"
                    :max="new Date().toISOString().substr(0, 10)"
                    v-model="encumbrance.encumbrance.activity_begin"
                    @input="activity_begin_menu=false"
                    locale="pt-pt"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" class="mb-0 py-0">
                <input
                  style="display:none"
                  name="activity_begin_field_target"
                  ref="valActivityEndRef"
                  v-model="initialActivityEndDate"
                  type="text"
                />
                <v-menu
                  v-model="activity_end_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      dense
                      outlined
                      name="activity_end"
                      :value="formated(encumbrance.encumbrance.activity_end)"
                      label="Fim de atividade"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-on="on"
                      v-validate="'date_format:dd/MM/yyyy|after:valActivityEndRef|before:valActivityBeginRef'"
                      data-vv-as="activity_end"
                      :error-messages="errorMsg('charges.'+k+'.encumbrance.activity_end') || errors.collect('activity_end')"
                    ></v-text-field>
                    <!-- error-messages="Teste" -->
                  </template>
                  <v-date-picker
                    :max="new Date().toISOString().substr(0, 10)"
                    :min="encumbrance.encumbrance.activity_begin"
                    no-title
                    v-model="encumbrance.encumbrance.activity_end"
                    @input="activity_end_menu=false"
                    locale="pt-pt"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </template>
        </v-row>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="12" class="my-0 py-0">
            <v-subheader>Sessão de utilizador e autenticação</v-subheader>
          </v-col>

          <!-- =============================================================== -->

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
                :disabled="formData.email==''"
                @change="setAccountEmail"
                label="Utilizar o email coorporativo"
                v-model="formData.co_email"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="6" class="mb-0 py-0">
              <v-text-field
                dense
                :disabled="formData.co_email"
                label="Email de autenticação"
                name="user_mail"
                v-model="formData.folk.user.email"
                outlined
                v-validate="'required|email'"
                data-vv-name="user_mail"
                :error-messages="errorMsg('folk.user.email') || errors.collect('user_mail')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="mb-0 py-0">
              <v-text-field
                dense
                label="Nome de Utilizador"
                name="username"
                v-model="formData.folk.user.username"
                outlined
                v-validate="'required|alpha_dash'"
                data-vv-name="username"
                :error-messages="errorMsg('folk.user.username') || errors.collect('username')"
              ></v-text-field>
            </v-col>

            <template v-if="!update_form">
              <v-col cols="12" md="6" class="mb-0 py-0">
                <v-text-field
                  :disabled="default_password"
                  dense
                  outlined
                  v-model="formData.folk.user.password"
                  :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_pass ? 'text' : 'password'"
                  name="user_password"
                  label="Palavra Passe"
                  counter
                  ref="col_password"
                  @click:append="show_pass = !show_pass"
                  hint="Caso não seja inserida uma Palavra Passe, o utilizador terá uma palavra passe predefenida"
                  persistent-hint
                  v-validate="'min:8'"
                  data-vv-name="user_password"
                  :error-messages="errorMsg('folk.user.password')|| errors.collect('user_password')"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="mb-0 py-0">
                <v-text-field
                  :disabled="default_password"
                  dense
                  label="Confirmação da palavra passe"
                  name="password_confirmation"
                  type="password"
                  v-model="formData.password_confirmation"
                  outlined
                  v-validate="'confirmed:col_password'"
                  data-vv-name="password_confirmation"
                  :error-messages="errorMsg('password_confirmation')||errors.collect('password_confirmation')"
                ></v-text-field>
              </v-col>
            </template>
          </template>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-switch label="Destacar página principal" v-model="formData.featured"></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="mt-5 mb-0 pb-0">
            <small>(*) campos de preenchimento obrigatório</small>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <add-charge></add-charge>
  </div>
</template>

<script>
import AddCharge from "../components/backend/resources/charges/Create";
import moment from "moment";
import validateDictionary from "@/helpers/api/validateDictionary";
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
      default_password: false,
      show_pass: false,
      formErrors: [],
      birthdate_menu: false,
      activity_begin_menu: false,
      activity_end_menu: false,
      dictionary: validateDictionary
    };
  },

  watch: {
    birthdate_menu(val) {
      val &&
        setTimeout(() => (this.$refs.birth_date_picker.activePicker = "YEAR"));
    }

    // activity_begin_menu(val) {
    //   val &&
    //     setTimeout(
    //       () => (this.$refs.activity_begin_picker.activePicker = "YEAR")
    //     );
    // }
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    this.getAll(this.schools, "getSchools");
    this.getAll(this.charges, "getCharges");

    // window.getApp.$on("APP_CLEAR_EMPLOYEE_FORM", () => {
    //   this.clear();
    // });

    window.getApp.$on("APP_ADD_EMPLOYEE", add_new => {
      this.add(
        add_new,
        "employees",
        this.$props.formData,
        "APP_UPDATE_ALL_EMPLOYEES_DATA",
        "APP_ADD_EMPLOYEE_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_EMPLOYEE", () => {
      this.update(
        "employees/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_EMPLOYEE_MODAL"
      );
    });
  },

  computed: {
    charges: function() {
      return this.$store.getters.charges;
    },

    schools: function() {
      return this.$store.getters.schools;
    },

    initialActivityEndDate() {
      return moment(
        this.$props.formData.charges[0].encumbrance.activity_begin
      ).format("DD/MM/YYYY");
    },

    perfilPhotoPath() {
      return this.formData.perfil_photo
        ? this.formData.perfil_photo.length > 500
          ? this.formData.perfil_photo
          : this.apiUrl +
            "/images/app/resources/employees/" +
            this.formData.perfil_photo
        : this.apiUrl + "/images/app/resources/employees/default.svg";
    }
  },

  methods: {
    backendErrorMsg(obj_prop) {
      if (obj_prop in this.formErrors) {
        return this.formErrors[obj_prop][0];
      }
      return;
    },
    setCoEmail() {
      // let msg = this.formData.sync_user_account
      //   ? "Com esta ação irá permitir que este colaborador tenha uma conta de utilizador no sistema"
      //   : "Este colaborador não poderá autenticar como um utilizador";
      // let msg_type = this.formData.sync_user_account ? "info" : "warning";

      // if (this.$props.update_form) {
      //   this.$swal({
      //     title: "Conta de Utilizador",
      //     text: msg,
      //     type: msg_type,
      //     width: 400,
      //     confirmButtonText: "Aceito",
      //     confirmButtonColor: "#3085d6"
      //   });
      // }

      if (!this.formData.sync_user_account) {
        this.formData.co_email = false;
      }
    },
    setAccountEmail() {
      if (this.formData.sync_user_account && this.formData.co_email)
        this.formData.folk.user.email = this.formData.email;
      else this.formData.folk.user.email = "";
    },

    addMoreCharges() {
      window.getApp.$emit("APP_ADD_CHARGE_MODAL");
    },

    onActivePerfilPhotoField() {
      this.$refs.upload_perfil_photo_form.click();
    },

    onPerfilPhotoChange(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = event => {
        this.formData.perfil_photo = event.target.result;
      };
    }
  },

  components: {
    AddCharge
  }
};
</script>

<style lang="scss" scoped>
.photo-perfil {
  cursor: pointer;
}
</style>
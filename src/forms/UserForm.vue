<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <v-subheader>Dados de Pessoais</v-subheader>
        </v-col>
        <v-col cols="12" md="6" class="my-0 py-0">
          <v-text-field
            dense
            label="Nome*"
            name="name"
            v-model="formData.folk.name"
            outlined
            v-validate="'required|alpha'"
            data-vv-name="name"
            :error-messages="errors.collect('name')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-text-field
            dense
            label="Apelido*"
            name="lastname"
            v-model="formData.folk.lastname"
            outlined
            v-validate="'required|alpha_spaces'"
            data-vv-name="lastname"
            :error-messages="errors.collect('lastname')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-autocomplete
            dense
            outlined
            :items="genders"
            v-model="formData.folk.gender"
            item-text="name"
            item-value="key"
            label="Sexo"
          ></v-autocomplete>
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

        <v-col cols="12" class="my-0 py-0">
          <v-subheader>Dados de autenticação</v-subheader>
        </v-col>
        <v-col cols="12" md="6" class="my-0 py-0">
          <v-text-field
            dense
            label="Email*"
            name="email"
            v-model="formData.email"
            outlined
            v-validate="'required|email'"
            data-vv-name="email"
            :error-messages="errorMsg('email') || errors.collect('email')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-text-field
            dense
            label="Utilizador*"
            name="username"
            v-model="formData.username"
            outlined
            v-validate="'required|alpha_dash'"
            data-vv-name="username"
            :error-messages="errorMsg('username') || errors.collect('username')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="my-0 py-0" v-if="!disable_field">
          <v-checkbox label="Utilizar Palavra passe padrão" v-model="defautPassword"></v-checkbox>
        </v-col>

        <v-col cols="12" md="6" class="py-0 my-0" v-if="!disable_field">
          <v-text-field
            dense
            v-model="formData.password"
            name="password"
            label="Palavra Passe"
            type="password"
            ref="password"
            :disabled="defautPassword"
            outlined
            v-validate="'required|min:8'"
            data-vv-name="password"
            :error-messages="errors.collect('password')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="py-0 my-0" v-if="!disable_field">
          <v-text-field
            dense
            v-model="formData.password_confirmation"
            name="password"
            label="Confirmar Palavra Passe"
            type="password"
            :disabled="defautPassword"
            outlined
            v-validate="'required|confirmed:password'"
            data-vv-name="password_confirmation"
            :error-messages="errors.collect('password_confirmation')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-subheader>Autorizações e Acessos</v-subheader>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header color="grey lighten-2">Papeis/Funcções</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card flat height="300" class="overflow-y-auto pa-2">
                  <template v-for="(role, rol) in roles">
                    <v-checkbox
                      :key="'userrole_'+rol"
                      dense
                      hide-details
                      v-model="formData.roles"
                      :label="role.name"
                      :value="role.id"
                    ></v-checkbox>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- <v-autocomplete
            dense
            outlined
            chips
            multiple
            :items="roles"
            v-model="formData.roles"
            item-text="name"
            item-value="id"
            label="Função"
          ></v-autocomplete>-->
        </v-col>
        <v-col cols="12" md="6" class="my-0 py-0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header color="grey lighten-2">Permissções de acesso</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card flat height="300" class="overflow-y-auto pa-2">
                  <template v-for="(permission, per) in permissions">
                    <v-checkbox
                      :key="'userpermission_'+per"
                      dense
                      hide-details
                      v-model="formData.permissions"
                      :label="permission.name"
                      :value="permission.id"
                    ></v-checkbox>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- <v-autocomplete
            dense
            outlined
            chips
            multiple
            :items="permissions"
            v-model="formData.permissions"
            item-text="name"
            item-value="id"
            label="Permissão"
          ></v-autocomplete>-->
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-subheader>Ativação</v-subheader>
          <v-switch
            dense
            v-model="formData.status"
            :label="formData.status ? 'Ativo':'Inativo'"
            color="indigo"
            value
            input-value="true"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
    dateFormat,
    getBackEndError
  ],
  props: ["formData", "disable_field"],
  data() {
    return {
      selected: ["John"],
      birthdate_menu: false,

      formErrors: [],
      hasError: false,
      genders: [
        { key: "0", name: "Masculino" },
        { key: "1", name: "Feminino" }
      ],
      defautPassword: true
    };
  },

  watch: {
    birthdate_menu(val) {
      val &&
        setTimeout(() => (this.$refs.birth_date_picker.activePicker = "YEAR"));
    }
  },

  computed: {
    roles: function() {
      return this.$store.getters.roles;
    },
    permissions: function() {
      return this.$store.getters.permissions;
    }
  },

  created() {
    this.getAll(this.permissions, "getPermissions");
    this.getAll(this.roles, "getRoles");
    window.getApp.$on("APP_ADD_USER", add_new => {
      this.add(
        add_new,
        "users",
        this.$props.formData,
        "APP_UPDATE_ALL_USERS_DATA",
        "APP_ADD_USER_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_USER", () => {
      this.update(
        "users/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_USER_MODAL"
      );
    });
  }
};
</script>
<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <v-subheader>Dados de Pessoais</v-subheader>
        </v-col>
        <v-col cols="12" md="6" class="my-0 py-0">
          <v-text-field
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
            label="Apelido*"
            name="lastname"
            v-model="formData.folk.lastname"
            outlined
            v-validate="'required|alpha'"
            data-vv-name="lastname"
            :error-messages="errors.collect('lastname')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-select
            outlined
            :items="genders"
            v-model="formData.folk.gender"
            item-text="name"
            item-value="key"
            label="Sexo"
          ></v-select>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-subheader>Dados de autenticação</v-subheader>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <v-text-field
            label="Email*"
            name="email"
            v-model="formData.email"
            outlined
            v-validate="'required|email'"
            data-vv-name="email"
            :error-messages="(errors.has('email')) ? errors.collect('email'): formErrors.email"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-text-field
            label="Utilizador*"
            name="username"
            v-model="formData.username"
            outlined
            v-validate="'required|alpha'"
            data-vv-name="username"
            :error-messages="(errors.has('username')) ? errors.collect('username'): formErrors.username"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="my-0 py-0" v-if="!disable_field">
          <v-checkbox label="Utilizar Palavra passe padrão" v-model="defautPassword"></v-checkbox>
        </v-col>

        <v-col cols="12" md="6" class="py-0 my-0" v-if="!disable_field">
          <v-text-field
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
          <v-select
            outlined
            chips
            multiple
            :items="roles"
            v-model="formData.roles"
            item-text="name"
            item-value="id"
            label="Função"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="my-0 py-0">
          <v-select
            outlined
            chips
            multiple
            :items="permissions"
            v-model="formData.permissions"
            item-text="name"
            item-value="id"
            label="Permissão"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6" class="my-0 py-0">
          <v-subheader>Ativação</v-subheader>
          <v-switch
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
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData, getDatas } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData, getDatas],
  props: ["formData", "disable_field"],
  data() {
    return {
      formErrors: [],
      hasError: false,
      genders: [
        { key: "0", name: "Masculino" },
        { key: "1", name: "Feminino" }
      ],
      defautPassword: true,
      dictionary: validateDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  computed: {
    roles: function() {
      return this.$store.getters.roles;
    },
    permissions: function() {
      return this.$store.getters.permissions;
    },
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
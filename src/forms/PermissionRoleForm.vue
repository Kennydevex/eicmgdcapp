<template>
  <v-form ref="form">
    <v-container grid-list-xs pa-0 ma-0>
      <v-row>
        <v-col cols="12" class="mt-2 mb-0 py-0">
          <v-text-field
            label="Nome*"
            name="name"
            v-model="formData.name"
            outlined
            v-validate="'required'"
            data-vv-name="name"
            :error-messages="errors.collect('name')"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-subheader>{{type=="permission"?"Vincular a função":"Vincular a permissão"}}</v-subheader>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-select
            :disabled="roles.length==0"
            v-if="type=='permission'"
            v-model="formData.roles"
            outlined
            multiple
            chips
            :items="roles"
            item-text="name"
            item-value="id"
            label="Funções"
            :error-messages="roles.length==0?'Campo desativado porque não tem nenhuma função registada para vincular':''"
          ></v-select>
          <!-- <v-btn @click="addRoleModal()" text x-small class="text-none" color="warning">Criar Uma função</v-btn> -->

          <v-select
            :disabled="permissions.length==0"
            v-if="type=='role'"
            v-model="formData.permissions"
            outlined
            multiple
            chips
            :items="permissions"
            item-text="name"
            item-value="id"
            label="Permissões"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import validateDictionary from "@/helpers/api/validateDictionary";
import { clearForm } from "@/mixins/Form";
import { flashAlert } from "@/mixins/AppAlerts";
import { sendFormData } from "@/mixins/SendForm";

export default {
  mixins: [clearForm, flashAlert, sendFormData],
  props: ["formData", "type"],

  data() {
    return {
      genders: [
        { key: "0", name: "Masculino" },
        { key: "1", name: "Feminino" }
      ],
      dictionary: validateDictionary
    };
  },

  computed: {
    roles: function() {
      return this.$store.getters.roles;
    },
    permissions: function() {
      return this.$store.getters.permissions;
    }
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  },

  created() {
    window.getApp.$on("APP_ADD_PERMISSION", add_new => {
      this.add(
        add_new,
        "permissions",
        this.$props.formData,
        "APP_UPDATE_ALL_PERMISSIONS_DATA",
        "APP_ADD_PERMISSION_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_PERMISSION", () => {
      this.update(
        "permissions/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_PERMISSION_MODAL"
      );
    });

    window.getApp.$on("APP_ADD_ROLE", add_new => {
      this.add(
        add_new,
        "roles",
        this.$props.formData,
        "APP_UPDATE_ALL_ROLES_DATA",
        "APP_ADD_ROLE_MODAL"
      );
    });

    window.getApp.$on("APP_UPDATE_ROLE", () => {
      this.update(
        "roles/" + this.$props.formData.id,
        this.$props.formData,
        "APP_UPDATE_ROLE_MODAL"
      );
    });
  }

  // methods: {
  //   addRoleModal() {
  //     window.getApp.$emit("APP_ADD_ROLE_MODAL");
  //   },
  // },
};
</script>
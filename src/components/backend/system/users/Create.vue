<template>
  <v-dialog v-model="addUserModal" scrollable max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-plus</v-icon>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <user-form :formData="formData"></user-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleAddUser(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click="handleAddUser(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddUserModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import UserForm from "@/forms/UserForm";

export default {
  data() {
    return {
      addUserModal: false,
      defautPassWord: true,
      formData: {
        folk: {
          name: "",
          lastname: "",
          gender: "",
          birthdate: new Date().toISOString().substr(0, 10)
        },
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
        permissions: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_USER_MODAL", () => {
      this.handleAddUserModal();
    });
  },

  components: {
    UserForm
  },

  methods: {
    handleAddUserModal() {
      this.addUserModal = !this.addUserModal;
    },

    handleAddUser(add_new) {
      window.getApp.$emit("APP_ADD_USER", add_new);
    }
  }
};
</script>
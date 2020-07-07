<template>
  <v-dialog v-model="updateUserModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-pencil</v-icon>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <user-form :formData="formData" :disable_field="disable_field"></user-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleUpdateUser(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateUserModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import UserForm from "@/forms/UserForm";

export default {
  data() {
    return {
      disable_field: true,
      updateUserModal: false,
      defautPassWord: true,
      tempUser: [],
      formData: {
        folk: {
          name: "",
          lastname: "",
          gender: "",
          birthdate: new Date().toISOString().substr(0, 10)
        },
        id: "",
        username: "",
        email: "",
        status: "",
        password: "",
        password_confirmation: "",
        roles: [],
        permissions: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_USER_MODAL", user => {
      this.setUserUpdateForm(user);
      this.handleUpdateUserModal();
    });
  },

  components: {
    UserForm
  },

  methods: {
    setUserUpdateForm(user) {
      if (user) {
        this.formData.id = user.id;
        this.formData.username = user.username;
        this.formData.email = user.email;
        this.formData.status = user.status;
        // ================================================
        this.formData.folk.name = user.folk.name;
        this.formData.folk.lastname = user.folk.lastname;
        this.formData.folk.gender = user.folk.gender;
        this.formData.folk.birthdate = user.folk.birthdate;
        // ================================================
        this.formData.roles = [];
        this.formData.permissions = [];
        let mthis = this;
        if (user.roles) {
          user.roles.forEach(function(role) {
            mthis.formData.roles.push(role.id);
          });
        }
        if (user.permissions) {
          user.permissions.forEach(function(permission) {
            mthis.formData.permissions.push(permission.id);
          });
        }
        // ================================================
      }
    },

    handleUpdateUserModal() {
      window.getApp.$emit("APP_UPDATE_ALL_USERS_DATA");
      this.updateUserModal = !this.updateUserModal;
    },

    closeUpdateUserModel() {
      this.formData = {
        folk: {
          name: "",
          lastname: "",
          gender: "",
          birthdate: new Date().toISOString().substr(0, 10)
        },
        id: "",
        username: "",
        email: "",
        status: "",
        password: "",
        password_confirmation: "",
        roles: [],
        permissions: []
      };
      this.updateUserModal = !this.updateUserModal;
    },

    handleUpdateUser() {
      window.getApp.$emit("APP_UPDATE_USER");
    }
  }
};
</script>
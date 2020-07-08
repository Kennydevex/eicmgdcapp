<template>
  <v-dialog v-model="updateRoleModal" max-width="500px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-pencil</v-icon>Editar Função
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <role-form :formData="formData"></role-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleUpdateRole(true)">Guardar alterações</v-btn>
        <v-btn small text @click="handleUpdateRoleModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import RoleForm from "@/forms/RoleForm";

export default {
  data() {
    return {
      updateRoleModal: false,
      formData: {
        id: "",
        name: "",
        permissions: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_ROLE_MODAL", role => {
      this.setRoleUpdateForm(role);
      this.handleUpdateRoleModal();
    });
  },

  components: {
    RoleForm
  },

  methods: {
    // getRolesId() {
    //   let myroles = this.formData.roles
    //   if (this.formData.roles) {
    //     this.formData.roles.forEach(function(role) {
    //       mthis.authUserRoles.push(role.id);
    //     });
    //   }
    // },

    // setRoleUpdateForm(role) {
    //   this.formData= role;
    // },

    setRoleUpdateForm(role) {
      if (role) {
        this.formData.permissions = [];
        this.formData.id = role.id;
        this.formData.name = role.name;
        let mthis = this;
        if (role.permissions) {
          role.permissions.forEach(function(permission) {
            mthis.formData.permissions.push(permission.id);
          });
        }
      }
    },

    handleUpdateRoleModal() {
      window.getApp.$emit("APP_UPDATE_ALL_ROLES_DATA");
      this.updateRoleModal = !this.updateRoleModal;
    },

    handleUpdateRole() {
      window.getApp.$emit("APP_UPDATE_ROLE");
    }
  }
};
</script>
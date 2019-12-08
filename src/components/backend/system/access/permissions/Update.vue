<template>
  <v-dialog v-model="updatePermissionModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-pencil</v-icon>Etitar Permissão
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <permission-role-form :formData="formData" :type="'permission'"></permission-role-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleUpdatePermission(true)">Guardar alterações</v-btn>
        <v-btn small text @click="handleUpdatePermissionModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import PermissionRoleForm from "@/forms/PermissionRoleForm";

export default {
  data() {
    return {
      updatePermissionModal: false,
      formData: {
        id: "",
        name: "",
        roles: []
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_PERMISSION_MODAL", permission => {
      this.setPermissionUpdateForm(permission);
      this.handleUpdatePermissionModal();
    });
  },

  components: {
    PermissionRoleForm
  },

  methods: {
    setPermissionUpdateForm(permission) {
      if (permission) {
        this.formData.id = permission.id;
        this.formData.name = permission.name;
        let mthis = this;
        this.formData.roles = [];
        if (permission.roles) {
          permission.roles.forEach(function(role) {
            mthis.formData.roles.push(role.id);
          });
        }
      }
    },

    handleUpdatePermissionModal() {
      window.getApp.$emit("APP_UPDATE_ALL_PERMISSIONS_DATA");
      this.updatePermissionModal = !this.updatePermissionModal;
    },

    handleUpdatePermission() {
      window.getApp.$emit("APP_UPDATE_PERMISSION");
    }
  }
};
</script>
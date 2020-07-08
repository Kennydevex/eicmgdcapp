<template>
  <v-dialog v-model="addRoleModal" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-plus</v-icon> Criar Função
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <role-form :formData="formData"></role-form>
        
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleAddRole(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click="handleAddRole(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddRoleModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import RoleForm from "@/forms/RoleForm";


export default {
  data() {
    return {

      addRoleModal: false,
      formData: {
        name: '',
        permissions: [],
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_ROLE_MODAL", () => {
      this.handleAddRoleModal();
    });
  },

  components: {
    RoleForm
  },

  methods: {
    handleAddRoleModal() {
      this.addRoleModal = !this.addRoleModal;
    },

    handleAddRole(add_new) {
      window.getApp.$emit("APP_ADD_ROLE", add_new);
    }
  }
};
</script>
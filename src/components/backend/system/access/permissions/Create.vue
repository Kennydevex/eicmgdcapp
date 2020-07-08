<template>
  <v-dialog v-model="addPermissionModal" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-plus</v-icon> Criar Permissão
        </small> 
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <permission-form :formData="formData"></permission-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleAddPermission(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click="handleAddPermission(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddPermissionModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import PermissionForm from "@/forms/PermissionForm";

export default {
  data() {
    return {
      addPermissionModal: false,
      formData: {
        name: '',
        roles: [],
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_PERMISSION_MODAL", () => {
      this.handleAddPermissionModal();
    });
  },

  components: {
    PermissionForm
  },

  methods: {
    handleAddPermissionModal() {
      this.addPermissionModal = !this.addPermissionModal;
    },

    handleAddPermission(add_new) {
      window.getApp.$emit("APP_ADD_PERMISSION", add_new);
    }
  }
};
</script>
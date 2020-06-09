<template>
  <v-dialog v-model="updateDepartmentModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-tie</v-icon>
          <small>&emsp;Editar informações da disciplina</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <department-form :formData="formData"></department-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          small
          text
          @click.stop="handleUpdateDepartment(true)"
        >Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateDepartmentModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import DepartmentForm from "@/forms/DepartmentForm";

export default {
  data() {
    return {
      updateDepartmentModal: false,
      formData: {
        name: "",
        description: "",
        type: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_DEPARTMENT_MODAL", department => {
      if (department) {
        this.setDepartmentUpdateForm(department);
      }
      this.handleUpdateDepartmentModal();
    });
  },

  components: {
    DepartmentForm
  },

  methods: {
    setDepartmentUpdateForm(department) {
      this.formData = department;
    },

    handleUpdateDepartmentModal() {
      window.getApp.$emit("APP_UPDATE_ALL_DEPARTMENTS_DATA");
      this.updateDepartmentModal = !this.updateDepartmentModal;
    },

    closeUpdateDepartmentModel() {
      this.formData = {
        name: "",
        type: "",
        description: ""
      };
      this.updateDepartmentModal = !this.updateDepartmentModal;
    },

    handleUpdateDepartment() {
      window.getApp.$emit("APP_UPDATE_DEPARTMENT");
    }
  }
};
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="addDepartmentModal" scrollable max-width="640px" persistent>
      <v-card>
        <v-card-title primary-title>
          <small class="font-weight-light text-capitalize">
            <v-icon>mdi-account-tie</v-icon>
            <small>&emsp;Registo de nova disciplina</small>
          </small>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-3">
          <department-form :formData="formData"></department-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :to="{name: 'list_departments'}"
            class="text-none"
            color="primary"
            x-small
            text
            v-if="add_extra_department"
          >Gerir todas as disciplinas</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" small text @click.stop="handleAddDepartment(true)">Guardar</v-btn>
          <v-btn color="primary" small text @click.stop="handleAddDepartment(false)">Guardar e Sair</v-btn>
          <v-btn small text @click="handleAddDepartmentModal">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import DepartmentForm from "@/forms/DepartmentForm";
import { clearForm } from "@/mixins/Form";

export default {
  props: ["add_extra_department"],

  mixins: [clearForm],

  data() {
    return {
      addDepartmentModal: false,
      formData: {
        name: "",
        description: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_DEPARTMENT_MODAL", () => {
      this.handleAddDepartmentModal();
    });
  },

  components: {
    DepartmentForm
  },

  methods: {
    handleAddDepartmentModal() {
      this.addDepartmentModal = !this.addDepartmentModal;
    },

    handleAddDepartment(add_new) {
      window.getApp.$emit("APP_ADD_DEPARTMENT", add_new);
    }
  }
};
</script>
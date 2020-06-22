<template>
  <v-dialog v-model="addEmployeeModal" scrollable max-width="980px" persistent>
    <v-card>
      <v-card-title primary-title>
        <span class="font-weight-light text-capitalize">
          <v-icon>mdi-account-tie</v-icon>
          <small>&emsp;Criar Colaborador</small>
        </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <employee-form :formData="formData" :update_form="false"></employee-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddEmployee(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddEmployee(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddEmployeeModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import EmployeeForm from "@/forms/EmployeeForm";

export default {
  data() {
    return {
      addEmployeeModal: false,
      formData: {
        ic: "",
        phone: "",
        active: false,
        perfil_photo: "",
        email: "",
        folk_id: "",
        school_id: "",
        //=====================================================
        folk: {
          name: "",
          lastname: "",
          gender: "",
          birthdate: "",
          user: {
            username: "",
            email: "",
            password: "",
            status: "",
            type: "",
            folk_id: ""
          }
        },
        charges: [
          {
            encumbrance: {
              charge_id: "",
              employee_id: "",
              activity_begin: "",
              activity_end: ""
            }
          }
        ],
        //=====================================================
        is_teacher: false,
        co_email: false,
        sync_user_account: false,
        password_confirmation: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_EMPLOYEE_MODAL", () => {
      this.handleAddEmployeeModal();
    });
  },

  components: {
    EmployeeForm
  },

  methods: {
    handleAddEmployeeModal() {
      this.addEmployeeModal = !this.addEmployeeModal;

      // window.getApp.$emit("APP_CLEAR_EMPLOYEE_FORM");

    },

    handleAddEmployee(add_new) {
      window.getApp.$emit("APP_ADD_EMPLOYEE", add_new);
    }
  }
};
</script>
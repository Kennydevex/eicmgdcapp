<template>
  <v-dialog v-model="updateEmployeeModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-edit</v-icon>
          <small>&emsp;Editar Informações do Colaborador</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <employee-form :formData="formData" :update_form="true"></employee-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          small
          text
          @click.stop="handleUpdateEmployee(true)"
        >Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateEmployeeModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import EmployeeForm from "@/forms/EmployeeForm";

export default {
  data() {
    return {
      updateEmployeeModal: false,
      teste: null,
      formData: {
        id: "",
        ic: "",
        phone: "",
        active: false,
        featured: false,
        perfil_photo: "",
        email: "",
        folk_id: "",
        school_id: "",
        //=====================================================
        folk: {
          id: "",
          name: "",
          lastname: "",
          gender: "",
          birthdate: "",
          user: {
            id: "",
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
    window.getApp.$on("APP_UPDATE_EMPLOYEE_MODAL", employee => {
      if (employee) {
        this.setEmployeeUpdateForm(employee);
      }
      this.handleUpdateEmployeeModal();
    });
  },

  components: {
    EmployeeForm
  },

  methods: {
    setEmployeeUpdateForm(employee) {
      this.teste=employee;
      this.formData.id = employee.id;
      this.formData.ic = employee.ic;
      this.formData.phone = employee.phone;
      this.formData.active = employee.active;
      this.formData.featured = employee.featured;
      this.formData.perfil_photo = employee.perfil_photo;
      this.formData.email = employee.email;
      this.formData.folk_id = employee.folk_id;
      this.formData.school_id = employee.school_id;

      this.formData.folk.id = employee.folk.id;
      this.formData.folk.name = employee.folk.name;
      this.formData.folk.lastname = employee.folk.lastname;
      this.formData.folk.gender = employee.folk.gender;
      this.formData.folk.birthdate = employee.folk.birthdate;

      if (employee.folk.user) {
        this.formData.sync_user_account = true;
        if (employee.email == employee.folk.user.email) {
          this.formData.co_email = true;
        }
        this.formData.folk.user.id = employee.folk.user.id;
        this.formData.folk.user.username = employee.folk.user.username;
        this.formData.folk.user.email = employee.folk.user.email;
      }

      if (employee.charges.length != 0) {
        this.formData.charges = employee.charges;
      }

      if (employee.teacher) {
        this.formData.is_teacher = true;
      }
    },

    handleUpdateEmployeeModal() {
      window.getApp.$emit("APP_UPDATE_ALL_EMPLOYEES_DATA");
      this.updateEmployeeModal = !this.updateEmployeeModal;
    },

    closeUpdateEmployeeModel() {
      this.formData = {
        ic: "",
        id: "",
        phone: "",
        active: false,
        perfil_photo: "",
        email: "",
        folk_id: "",
        school_id: "",
        //=====================================================
        folk: {
          id: "",
          name: "",
          lastname: "",
          gender: "0",
          birthdate: "",
          user: {
            id: "",
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
      };
      this.updateEmployeeModal = !this.updateEmployeeModal;
    },

    handleUpdateEmployee() {
      window.getApp.$emit("APP_UPDATE_EMPLOYEE");
    }
  }
};
</script>
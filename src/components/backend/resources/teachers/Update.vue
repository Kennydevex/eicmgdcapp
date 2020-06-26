<template>
  <v-dialog v-model="updateTeacherModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-regular">
          <v-icon>mdi-folder-edit-outline</v-icon>
          <span>&emsp;Editar informações do professor</span>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <teacher-form :formData="formData" :update_form="true"></teacher-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleUpdateTeacher(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateMaskModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import TeacherForm from "@/forms/TeacherForm";

export default {
  data() {
    return {
      updateTeacherModal: false,
      formData: {
        id: "",
        employee_id: "",
        employee: {
          id: "",
          ic: "",
          phone: "",
          active: false,
          featured: false,
          perfil_photo: null,
          email: "",
          folk: {
            id: "",
            name: "",
            lastname: "",
            gender: "",
            birthdate: ""
            // user: {
            //   id: "",
            //   username: "",
            //   email: "",
            //   password: "",
            //   status: "",
            //   type: ""
            // }
          }
        },
        co_email: false,
        sync_user_account: false,
        password_confirmation: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_TEACHER_MODAL", teacher => {
      if (teacher) {
        this.setTeacherUpdateForm(teacher);
      }
      this.handleUpdateTeacherModal();
    });
  },

  components: {
    TeacherForm
  },

  methods: {
    setTeacherUpdateForm(teacher) {
      this.formData.id = teacher.id;
      this.formData.employee_id = teacher.employee_id;
      this.formData.employee.id = teacher.employee.id;
      this.formData.employee.ic = teacher.employee.ic;
      this.formData.employee.phone = teacher.employee.phone;
      this.formData.employee.active = teacher.employee.active;
      this.formData.employee.perfil_photo = teacher.employee.perfil_photo;
      this.formData.employee.email = teacher.employee.email;

      this.formData.employee.folk.id = teacher.employee.folk.id;
      this.formData.employee.folk.name = teacher.employee.folk.name;
      this.formData.employee.folk.lastname = teacher.employee.folk.lastname;
      this.formData.employee.folk.gender = teacher.employee.folk.gender;
      this.formData.employee.folk.birthdate = teacher.employee.folk.birthdate;

      // if (teacher.employee.folk.user) {
      //   this.formData.sync_user_account = true;
      //   if (teacher.employee.email == teacher.employee.folk.user.email) {
      //     this.formData.co_email = true;
      //   }
      //   this.formData.employee.folk.user.id = teacher.employee.folk.user.id;
      //   this.formData.employee.folk.user.username =
      //     teacher.employee.folk.user.username;
      //   this.formData.employee.folk.user.email =
      //     teacher.employee.folk.user.email;
      // }
    },

    handleUpdateTeacherModal() {
      window.getApp.$emit("APP_UPDATE_ALL_TEACHERS_DATA");
      this.updateTeacherModal = !this.updateTeacherModal;
    },

    closeUpdateMaskModel() {
      this.formData = {
        id: "",
        employee_id: "",
        employee: {
          ic: "",
          id: "",
          phone: "",
          active: false,
          featured: false,
          perfil_photo: null,
          email: "",
          folk: {
            id: "",
            name: "",
            lastname: "",
            gender: "",
            birthdate: ""
            // user: {
            //   id: "",
            //   username: "",
            //   email: "",
            //   password: "",
            //   status: "",
            //   type: ""
            // }
          }
        },
        co_email: false,
        sync_user_account: false,
        password_confirmation: ""
      };
      this.updateTeacherModal = !this.updateTeacherModal;
    },

    handleUpdateTeacher() {
      window.getApp.$emit("APP_UPDATE_TEACHER");
    }
  }
};
</script>
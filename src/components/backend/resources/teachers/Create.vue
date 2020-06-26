<template>
  <v-dialog v-model="addTeacherModal" scrollable max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-regular">
          <v-icon>mdi-teach</v-icon>
          <span>&emsp;Regsito de professor</span>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <teacher-form :formData="formData"></teacher-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddTeacher(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddTeacher(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddTeacherModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import TeacherForm from "@/forms/TeacherForm";

export default {
  data() {
    return {
      addTeacherModal: false,
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
            // id: "",
            //   username: "",
            //   email: "",
            //   password: "",
            //   status: "",
            //   type: "",
            //   folk_id: ""
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
    window.getApp.$on("APP_ADD_TEACHER_MODAL", () => {
      this.handleAddTeacherModal();
    });
  },

  components: {
    TeacherForm
  },

  methods: {
    handleAddTeacherModal() {
      this.addTeacherModal = !this.addTeacherModal;
    },

    handleAddTeacher(add_new) {
      window.getApp.$emit("APP_ADD_TEACHER", add_new);
    }
  }
};
</script>
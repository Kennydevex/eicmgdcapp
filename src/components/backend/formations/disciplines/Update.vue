<template>
  <v-dialog v-model="updateDisciplineModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-tie</v-icon>
          <small>&emsp;Editar informações da disciplina</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <discipline-form :formData="formData"></discipline-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          small
          text
          @click.stop="handleUpdateDiscipline(true)"
        >Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateDisciplineModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import DisciplineForm from "@/forms/DisciplineForm";

export default {
  data() {
    return {
      updateDisciplineModal: false,
      formData: {
        name: "",
        description: "",
        type: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_DISCIPLINE_MODAL", discipline => {
      if (discipline) {
        this.setDisciplineUpdateForm(discipline);
      }
      this.handleUpdateDisciplineModal();
    });
  },

  components: {
    DisciplineForm
  },

  methods: {
    setDisciplineUpdateForm(discipline) {
      this.formData = discipline;
    },

    handleUpdateDisciplineModal() {
      window.getApp.$emit("APP_UPDATE_ALL_DISCIPLINES_DATA");
      this.updateDisciplineModal = !this.updateDisciplineModal;
    },

    closeUpdateDisciplineModel() {
      this.formData = {
        name: "",
        type: "",
        description: ""
      };
      this.updateDisciplineModal = !this.updateDisciplineModal;
    },

    handleUpdateDiscipline() {
      window.getApp.$emit("APP_UPDATE_DISCIPLINE");
    }
  }
};
</script>
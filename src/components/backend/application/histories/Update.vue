<template>
  <v-dialog v-model="updateHistoryModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-folder-edit-outline</v-icon>
          <small>&emsp;Editar História</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <history-form :formData="formData"></history-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleUpdateHistory(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateHistoryModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import HistoryForm from "@/forms/HistoryForm";

export default {
  data() {
    return {
      updateHistoryModal: false,
      formData: {
        id: "",
        title: "",
        content: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_HISTORY_MODAL", history => {
      if (history) {
        this.setHistoryUpdateForm(history);
      }
      this.handleUpdateHistoryModal();
    });
  },

  components: {
    HistoryForm
  },

  methods: {
    setHistoryUpdateForm(history) {
      this.formData = history;
    },

    handleUpdateHistoryModal() {
      window.getApp.$emit("APP_UPDATE_ALL_HISTORIES_DATA");
      this.updateHistoryModal = !this.updateHistoryModal;
    },

    closeUpdateHistoryModel() {
      this.formData = {
        title: "",
        content: ""
      };
      this.updateHistoryModal = !this.updateHistoryModal;
    },

    handleUpdateHistory() {
      window.getApp.$emit("APP_UPDATE_HISTORY");
    }
  }
};
</script>
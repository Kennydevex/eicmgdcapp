<template>
  <v-dialog v-model="addHistoryModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-tag-plus</v-icon>
          <small>&emsp;Criar História</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <history-form :formData="formData"></history-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click="handleAddHistory(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click="handleAddHistory(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddHistoryModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import HistoryForm from "@/forms/HistoryForm";

export default {
  data() {
    return {
      addHistoryModal: false,
      formData: {
        title: "",
        content: "",
        school_id: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_HISTORY_MODAL", () => {
      this.handleAddHistoryModal();
    });
  },

  components: {
    HistoryForm
  },

  methods: {
    handleAddHistoryModal() {
      this.addHistoryModal = !this.addHistoryModal;
    },

    handleAddHistory(add_new) {
      window.getApp.$emit("APP_ADD_HISTORY", add_new);
    }
  }
};
</script>
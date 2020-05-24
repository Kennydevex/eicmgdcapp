<template>
  <v-dialog v-model="updateMarkModal" max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-folder-edit-outline</v-icon>
          <small>&emsp;Editar Marco Histórico</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <mark-form :formData="formData"></mark-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleUpdateMark(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateMaskModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import MarkForm from "@/forms/MarkForm";

export default {
  data() {
    return {
      updateMarkModal: false,
      formData: {
        title: "",
        end: "",
        begin: "",
        description: "",
        school_id: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_MARK_MODAL", mark => {
      if (mark) {
        this.setMarkUpdateForm(mark);
      }
      this.handleUpdateMarkModal();
    });
  },

  components: {
    MarkForm
  },

  methods: {
    setMarkUpdateForm(mark) {
      this.formData = mark;
    },

    handleUpdateMarkModal() {
      window.getApp.$emit("APP_UPDATE_ALL_MARKS_DATA");
      this.updateMarkModal = !this.updateMarkModal;
    },

    closeUpdateMaskModel() {
      this.formData = {
       title: "",
        end: "",
        begin: "",
        description: "",
        school_id: ""
      };
      this.updateMarkModal = !this.updateMarkModal;
    },

    handleUpdateMark() {
      window.getApp.$emit("APP_UPDATE_MARK");
    }
  }
};
</script>
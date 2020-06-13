<template>
  <v-dialog v-model="addMarkModal" scrollable max-width="940px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-tag-plus</v-icon>
          <small>&emsp;Criar Marco Histórico</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <mark-form :formData="formData"></mark-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddMark(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddMark(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddMarkModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import MarkForm from "@/forms/MarkForm";

export default {
  data() {
    return {
      addMarkModal: false,
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
    window.getApp.$on("APP_ADD_MARK_MODAL", () => {
      this.handleAddMarkModal();
    });
  },

  components: {
    MarkForm
  },

  methods: {
    handleAddMarkModal() {
      this.addMarkModal = !this.addMarkModal;
    },

    handleAddMark(add_new) {
      window.getApp.$emit("APP_ADD_MARK", add_new);
    }
  }
};
</script>
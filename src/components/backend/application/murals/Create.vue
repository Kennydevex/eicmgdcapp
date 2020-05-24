<template>
  <v-dialog v-model="addMuralModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-tag-plus</v-icon>
          <small>&emsp;Criar Marco Histórico</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <mural-form :formData="formData"></mural-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddMural(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddMural(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddMuralModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import MuralForm from "@/forms/MuralForm";
import { clearForm } from "@/mixins/Form";

export default {
  mixins: [clearForm],

  data() {
    return {
      addMuralModal: false,
      formData: {
        title: "",
        icon: "",
        description: "",
        school_id: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_MURAL_MODAL", () => {
      this.handleAddMuralModal();
    });
  },

  components: {
    MuralForm
  },

  methods: {
    handleAddMuralModal() {
      this.addMuralModal = !this.addMuralModal;
    },

    handleAddMural(add_new) {
      window.getApp.$emit("APP_ADD_MURAL", add_new);
    }
  }
};
</script>
<template>
  <v-dialog v-model="updateMuralModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-heart</v-icon>
          <small>&emsp;Editar Marco Histórico</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <mural-form :formData="formData"></mural-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleUpdateMural(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateMuralModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import MuralForm from "@/forms/MuralForm";

export default {
  data() {
    return {
      updateMuralModal: false,
      formData: {
        title: "",
        icon: "",
        description: "",
        school_id: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_MURAL_MODAL", mural => {
      if (mural) {
        this.setMuralUpdateForm(mural);
      }
      this.handleUpdateMuralModal();
    });
  },

  components: {
    MuralForm
  },

  methods: {
    setMuralUpdateForm(mural) {
      this.formData = mural;
    },

    handleUpdateMuralModal() {
      window.getApp.$emit("APP_UPDATE_ALL_MURALS_DATA");
      this.updateMuralModal = !this.updateMuralModal;
    },

    closeUpdateMuralModel() {
      this.formData = {
        title: "",
        icon: "mdi-user",
        description: "",
        school_id: ""
      };
      this.updateMuralModal = !this.updateMuralModal;
    },

    handleUpdateMural() {
      window.getApp.$emit("APP_UPDATE_MURAL");
    }
  }
};
</script>
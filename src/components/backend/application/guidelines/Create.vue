<template>
  <v-dialog v-model="addGuidelineModal" scrollable max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-tag-plus</v-icon>
          <small>&emsp;Criar Missão/Visão/Valores</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <guideline-form :formData="formData"></guideline-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddGuideline(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddGuideline(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddGuidelineModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import GuidelineForm from "@/forms/GuidelineForm";

export default {
  data() {
    return {
      addGuidelineModal: false,
      formData: {
        name: "",
        description: "",
        school_id: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_GUIDELINE_MODAL", () => {
      this.handleAddGuidelineModal();
    });
  },

  components: {
    GuidelineForm
  },

  methods: {
    handleAddGuidelineModal() {
      this.addGuidelineModal = !this.addGuidelineModal;
    },

    handleAddGuideline(add_new) {
      window.getApp.$emit("APP_ADD_GUIDELINE", add_new);
    }
  }
};
</script>
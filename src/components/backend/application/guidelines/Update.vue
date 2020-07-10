<template>
  <v-dialog v-model="updateGuidelineModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-folder-edit-outline</v-icon>
          <small>&emsp;Editar Informações</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <guideline-form :formData="formData"></guideline-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          small
          text
          @click.stop="handleUpdateGuideline(true)"
        >Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateGuidelineModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import GuidelineForm from "@/forms/GuidelineForm";

export default {
  data() {
    return {
      updateGuidelineModal: false,
      formData: {
        id: "",
        name: "",
        description: "",
        school_id: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_GUIDELINE_MODAL", guideline => {
      if (guideline) {
        this.setGuidelineUpdateForm(guideline);
      }
      this.handleUpdateGuidelineModal();
    });
  },

  components: {
    GuidelineForm
  },

  methods: {
    setGuidelineUpdateForm(guideline) {
      this.formData = guideline;
    },

    handleUpdateGuidelineModal() {
      window.getApp.$emit("APP_UPDATE_ALL_GUIDELINES_DATA");
      this.updateGuidelineModal = !this.updateGuidelineModal;
    },

    closeUpdateGuidelineModel() {
      this.formData = {
        name: "",
        description: "",
        school_id: ""
      };
      this.updateGuidelineModal = !this.updateGuidelineModal;
    },

    handleUpdateGuideline() {
      window.getApp.$emit("APP_UPDATE_GUIDELINE");
    }
  }
};
</script>
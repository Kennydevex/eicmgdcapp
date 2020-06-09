<template>
  <v-dialog v-model="updateOutcomeModal" max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-tie</v-icon>
          <small>&emsp;Editar Marco Histórico</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <outcome-form :formData="formData"></outcome-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleUpdateOutcome(true)">Guardar alterações</v-btn>
        <v-btn small text @click="closeUpdateOutcomeModel">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import OutcomeForm from "@/forms/OutcomeForm";

export default {
  data() {
    return {
      updateOutcomeModal: false,
      formData: {
        name: "",
        type: "",
        description: ""
      }
    };
  },

  created() {
    window.getApp.$on("APP_UPDATE_OUTCOME_MODAL", outcome => {
      if (outcome) {
        this.setOutcomeUpdateForm(outcome);
      }
      this.handleUpdateOutcomeModal();
    });
  },

  components: {
    OutcomeForm
  },

  methods: {
    setOutcomeUpdateForm(outcome) {
      this.formData = outcome;
    },

    handleUpdateOutcomeModal() {
      window.getApp.$emit("APP_UPDATE_ALL_OUTCOMES_DATA");
      this.updateOutcomeModal = !this.updateOutcomeModal;
    },

    closeUpdateOutcomeModel() {
      this.formData = {
        name: "",
        type: "",
        description: ""
      };
      this.updateOutcomeModal = !this.updateOutcomeModal;
    },

    handleUpdateOutcome() {
      window.getApp.$emit("APP_UPDATE_OUTCOME");
    }
  }
};
</script>
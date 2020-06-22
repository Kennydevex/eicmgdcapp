<template>
  <v-dialog v-model="addOutcomeModal" scrollable max-width="640px" persistent>
    <v-card>
      <v-card-title primary-title>
        <small class="font-weight-light text-capitalize">
          <v-icon>mdi-account-tie</v-icon>
          <small>&emsp;Criar nova saída do curso</small>
        </small>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3">
        <outcome-form :formData="formData"></outcome-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions>
        <v-btn v-if="add_extra_outcome" :to="{name: 'list_outcomes'}" class="text-none" color="primary" x-small text>Gerir as saídas dos cursos</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text @click.stop="handleAddOutcome(true)">Guardar</v-btn>
        <v-btn color="primary" small text @click.stop="handleAddOutcome(false)">Guardar e Sair</v-btn>
        <v-btn small text @click="handleAddOutcomeModal">Sair</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import OutcomeForm from "@/forms/OutcomeForm";
import { clearForm } from "@/mixins/Form";

export default {
  props: ["add_extra_outcome"],

  mixins: [clearForm],

  data() {
    return {
      addOutcomeModal: false,
      formData: {
        name: "",
        description: "",
        type: "1"
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_OUTCOME_MODAL", () => {
      this.handleAddOutcomeModal();
    });
  },

  components: {
    OutcomeForm
  },

  methods: {
    handleAddOutcomeModal() {
      this.addOutcomeModal = !this.addOutcomeModal;
    },

    handleAddOutcome(add_new) {
      window.getApp.$emit("APP_ADD_OUTCOME", add_new);
    }
  }
};
</script>
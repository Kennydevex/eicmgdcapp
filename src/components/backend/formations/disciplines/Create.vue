<template>
  <v-row justify="center">
    <v-dialog v-model="addDisciplineModal" scrollable max-width="640px" persistent>
      <v-card>
        <v-card-title primary-title>
          <small class="font-weight-light text-capitalize">
            <v-icon>mdi-account-tie</v-icon>
            <small>&emsp;Registo de nova disciplina</small>
          </small>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-3">
          <discipline-form :formData="formData"></discipline-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :to="{name: 'list_disciplines'}"
            class="text-none"
            color="primary"
            x-small
            text
            v-if="add_extra_discipline"
          >Gerir todas as disciplinas</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" small text @click.stop="handleAddDiscipline(true)">Guardar</v-btn>
          <v-btn color="primary" small text @click.stop="handleAddDiscipline(false)">Guardar e Sair</v-btn>
          <v-btn small text @click="handleAddDisciplineModal">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import DisciplineForm from "@/forms/DisciplineForm";
import { clearForm } from "@/mixins/Form";

export default {
  props: ["add_extra_discipline"],

  mixins: [clearForm],

  data() {
    return {
      addDisciplineModal: false,
      formData: {
        name: "",
        description: "",
        type: "1"
      }
    };
  },

  created() {
    window.getApp.$on("APP_ADD_DISCIPLINE_MODAL", () => {
      this.handleAddDisciplineModal();
    });
  },

  components: {
    DisciplineForm
  },

  methods: {
    handleAddDisciplineModal() {
      this.addDisciplineModal = !this.addDisciplineModal;
    },

    handleAddDiscipline(add_new) {
      window.getApp.$emit("APP_ADD_DISCIPLINE", add_new);
    }
  }
};
</script>